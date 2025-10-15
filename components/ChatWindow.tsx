import React, { useState, useRef, useEffect } from 'react';
import { Message, ChatSession } from '../types';
import { SendIcon, HistoryIcon, MailIcon, AiAvatarIcon } from './icons/Icons';

interface ChatWindowProps {
    session: ChatSession | null;
    onSendMessage: (text: string) => void;
    isLoading: boolean;
    onShowHistory: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ session, onSendMessage, isLoading, onShowHistory }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [session?.messages, isLoading]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSendMessage(input);
        setInput('');
    };
    
    const instructorEmail = "instructor@example.com";
    const emailSubject = "質問：Reactの学習について";
    const emailBody = `講師の方へ、\n\nReactの学習で以下の点について質問があります：\n\n[ここに質問を記入してください]\n\nよろしくお願いします。`;
    const mailtoLink = `mailto:${instructorEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    const renderMessageContent = (msg: Message) => (
        <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-teal-500 text-white rounded-br-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-lg'}`}>
            <p className="whitespace-pre-wrap">{msg.text}</p>
            {msg.source && <p className="text-xs mt-2 opacity-70 text-right">{msg.source}</p>}
        </div>
    );

    return (
        <div className="flex flex-col h-full">
            <header className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{session?.title || "AI家庭教師"}</h2>
                <div className="flex items-center space-x-2">
                    <a href={mailtoLink} title="講師に質問する" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                        <MailIcon />
                    </a>
                    <button onClick={onShowHistory} title="チャット履歴" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                        <HistoryIcon />
                    </button>
                </div>
            </header>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {!session && (
                     <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 flex-shrink-0">
                           <AiAvatarIcon />
                        </div>
                        <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-lg">
                           <p>こんにちは！Reactのことで分からないことがあれば、なんでも聞いてくださいね！</p>
                        </div>
                    </div>
                )}
                {session?.messages.map((msg) => (
                    <div key={msg.id} className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                       {msg.sender === 'ai' && <div className="w-8 h-8 flex-shrink-0"><AiAvatarIcon /></div>}
                       {renderMessageContent(msg)}
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 flex-shrink-0">
                           <AiAvatarIcon />
                        </div>
                        <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-gray-200 dark:bg-gray-700">
                            <div className="flex items-center space-x-2">
                                <span className="h-2 w-2 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-teal-500 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center bg-white dark:bg-gray-800">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="メッセージを入力..."
                    className="flex-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !input.trim()} className="ml-3 p-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 disabled:bg-teal-300 disabled:cursor-not-allowed transition-colors">
                    <SendIcon />
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;