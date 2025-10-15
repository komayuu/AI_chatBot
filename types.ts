
export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    source?: '教材より' | 'Webより';
}

export interface ChatSession {
    id: string;
    title: string;
    messages: Message[];
    createdAt: number;
}
