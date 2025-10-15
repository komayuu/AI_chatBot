
import { GoogleGenAI } from "@google/genai";
import { TEXTBOOK_CONTENT } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const NOT_IN_TEXTBOOK_FLAG = "NOT_IN_TEXTBOOK";

export async function getAiResponse(question: string): Promise<{ text: string; source: '教材より' | 'Webより' }> {
    try {
        // Step 1: Try to answer using only the textbook content
        const textbookPrompt = `
あなたはReactを学ぶ学生のためのAI家庭教師です。提供された教材の内容「のみ」を使って、以下の質問に答えてください。
教材内に答えが見つからない場合は、他の知識を使わずに「${NOT_IN_TEXTBOOK_FLAG}」とだけ返答してください。

--- 教材ここから ---
${TEXTBOOK_CONTENT}
--- 教材ここまで ---

質問: ${question}
`;

        const textbookResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: textbookPrompt,
        });
        
        const textbookAnswer = textbookResponse.text.trim();

        if (!textbookAnswer.includes(NOT_IN_TEXTBOOK_FLAG) && textbookAnswer.length > 0) {
            return { text: textbookAnswer, source: '教材より' };
        }

        // Step 2: If not in textbook, use general knowledge
        const webPrompt = `
あなたはReactを学ぶ学生のための親切なAI家庭教師です。以下の質問について、初心者にも分かりやすく簡潔に説明してください。

質問: ${question}
`;
        const webResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: webPrompt,
        });

        return { text: webResponse.text, source: 'Webより' };

    } catch (error) {
        console.error("Error getting AI response:", error);
        return { text: "申し訳ありません、エラーが発生しました。もう一度お試しください。", source: 'Webより' };
    }
}

export async function generateChatTitle(firstQuestion: string): Promise<string> {
    try {
        const prompt = `以下の質問内容を要約して、非常に短いチャットのタイトルを生成してください（最大5単語程度）。
質問: "${firstQuestion}"`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text.trim().replace(/["']/g, ""); // Remove quotes
    } catch (error) {
        console.error("Error generating title:", error);
        return "新しいチャット";
    }
}
