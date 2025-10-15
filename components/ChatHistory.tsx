
import React from 'react';
import { ChatSession } from '../types';
import { BackIcon, PlusIcon, TrashIcon } from './icons/Icons';

interface ChatHistoryProps {
    sessions: ChatSession[];
    onSelectChat: (sessionId: string) => void;
    onDeleteChat: (sessionId: string) => void;
    onNewChat: () => void;
    onBack: () => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ sessions, onSelectChat, onDeleteChat, onNewChat, onBack }) => {
    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800">
            <header className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
                 <button onClick={onBack} title="戻る" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                    <BackIcon />
                </button>
                <h2 className="text-lg font-semibold">チャット履歴</h2>
                <button onClick={onNewChat} title="新しいチャット" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                    <PlusIcon />
                </button>
            </header>
            <div className="flex-1 overflow-y-auto">
                {sessions.length === 0 ? (
                    <p className="text-center text-gray-500 p-4">履歴はありません。</p>
                ) : (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {sessions.map(session => (
                            <li key={session.id} className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer group">
                                <div onClick={() => onSelectChat(session.id)} className="flex-1 truncate">
                                    <p className="font-medium truncate">{session.title}</p>
                                    <p className="text-xs text-gray-500">{new Date(session.createdAt).toLocaleString()}</p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteChat(session.id);
                                    }}
                                    className="p-2 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900 opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="削除"
                                >
                                    <TrashIcon />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ChatHistory;
