import React from 'react';
import Textbook from './components/Textbook';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
    return (
        <div className="min-h-screen font-sans">
            <header className="bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-10">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold text-teal-600 dark:text-teal-400">電子教科書: React入門</h1>
                </div>
            </header>
            <main className="container mx-auto p-4 md:p-8">
                <Textbook />
            </main>
            <Chatbot />
            <footer className="text-center p-4 text-gray-500 text-sm">
                <p>&copy; 2024 React AI Tutor. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;