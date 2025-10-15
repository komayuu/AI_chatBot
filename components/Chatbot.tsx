import React, { useState, useEffect, useRef } from 'react';
import { ChatSession, Message } from '../types';
import { getAiResponse, generateChatTitle } from '../services/geminiService';
import ChatWindow from './ChatWindow';
import ChatHistory from './ChatHistory';
import { ChatIcon, CloseIcon } from './icons/Icons';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState<'chat' | 'history'>('chat');
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const activeSession = sessions.find(s => s.id === activeSessionId) || null;

    useEffect(() => {
        try {
            const savedSessions = localStorage.getItem('chatSessions');
            if (savedSessions) {
                setSessions(JSON.parse(savedSessions));
            }
        } catch (error) {
            console.error("Failed to parse chat sessions from localStorage", error);
            localStorage.removeItem('chatSessions');
        }
    }, []);

    useEffect(() => {
        if (sessions.length > 0) {
            localStorage.setItem('chatSessions', JSON.stringify(sessions));
        }
    }, [sessions]);
    
    const startNewChat = () => {
        setActiveSessionId(null);
        setView('chat');
    };

    const selectChat = (sessionId: string) => {
        setActiveSessionId(sessionId);
        setView('chat');
    };
    
    const deleteChat = (sessionId: string) => {
        setSessions(prev => prev.filter(s => s.id !== sessionId));
        if (activeSessionId === sessionId) {
            setActiveSessionId(null);
        }
    };

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;
        
        setIsLoading(true);
        const userMessage: Message = { id: Date.now().toString(), text, sender: 'user' };
        
        let currentSessionId = activeSessionId;
        let newSession: ChatSession | null = null;
        
        if (!currentSessionId) {
            const newId = `session-${Date.now()}`;
            const title = await generateChatTitle(text);
            newSession = {
                id: newId,
                title: title,
                messages: [userMessage],
                createdAt: Date.now(),
            };
            setSessions(prev => [newSession!, ...prev]);
            setActiveSessionId(newId);
            currentSessionId = newId;
        } else {
            setSessions(prev => prev.map(s => 
                s.id === currentSessionId ? { ...s, messages: [...s.messages, userMessage] } : s
            ));
        }
        
        const aiResponse = await getAiResponse(text);
        const aiMessage: Message = { 
            id: (Date.now() + 1).toString(), 
            text: aiResponse.text, 
            sender: 'ai', 
            source: aiResponse.source 
        };
        
        setSessions(prev => prev.map(s => 
            s.id === currentSessionId ? { ...s, messages: [...s.messages, aiMessage] } : s
        ));
        setIsLoading(false);
    };

    return (
        <>
            <div className={`fixed bottom-20 right-5 z-20 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="w-80 h-[450px] md:w-96 md:h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex flex-col animate-slide-in-up">
                    {view === 'chat' && (
                        <ChatWindow 
                            session={activeSession} 
                            onSendMessage={sendMessage} 
                            isLoading={isLoading}
                            onShowHistory={() => setView('history')}
                        />
                    )}
                    {view === 'history' && (
                        <ChatHistory 
                            sessions={sessions}
                            onSelectChat={selectChat}
                            onDeleteChat={deleteChat}
                            onNewChat={startNewChat}
                            onBack={() => setView('chat')}
                        />
                    )}
                </div>
            </div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-5 right-5 w-14 h-14 bg-teal-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-teal-600 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 z-30"
                aria-label={isOpen ? 'Close Chat' : 'Open Chat'}
            >
                {isOpen ? <CloseIcon /> : <ChatIcon />}
            </button>
        </>
    );
};

export default Chatbot;