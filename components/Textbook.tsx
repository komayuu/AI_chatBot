import React from 'react';
import { TEXTBOOK_CONTENT } from '../constants';

const Textbook: React.FC = () => {
    const renderContent = () => {
        return TEXTBOOK_CONTENT.split('\n').map((line, index) => {
            if (line.startsWith('```')) {
                return null; // Handled separately
            }
            if (line.startsWith('# ')) {
                return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 border-b-2 border-teal-500 pb-2">{line.substring(2)}</h2>;
            }
            if (line.startsWith('## ')) {
                return <h3 key={index} className="text-xl font-semibold mt-6 mb-3">{line.substring(3)}</h3>;
            }
            if (line.startsWith('- ')) {
                return <li key={index} className="ml-6 list-disc">{line.substring(2)}</li>;
            }
             if (/^\d+\. /.test(line)) {
                return <li key={index} className="ml-6 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
            }
            if (line.trim() === '') {
                return <br key={index} />;
            }
            return <p key={index} className="my-2 leading-relaxed">{line}</p>;
        // FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
        }).reduce((acc: (React.ReactElement | null)[], el, index, arr) => {
            const line = TEXTBOOK_CONTENT.split('\n')[index];
            if (line.startsWith('```')) {
                if (!acc.some(e => e?.key === `code-block-start-${index}`)) {
                    let codeBlockContent = '';
                    let lang = line.substring(3);
                    let j = index + 1;
                    while (j < arr.length && !TEXTBOOK_CONTENT.split('\n')[j].startsWith('```')) {
                        codeBlockContent += TEXTBOOK_CONTENT.split('\n')[j] + '\n';
                        j++;
                    }
                    acc.push(
                        <div key={`code-block-start-${index}`} className="bg-gray-800 dark:bg-gray-900 rounded-lg my-4 overflow-hidden">
                             <div className="bg-gray-700 dark:bg-gray-800 text-white text-xs px-4 py-1 font-mono">{lang}</div>
                             <pre className="text-white p-4 text-sm overflow-x-auto">
                                <code>{codeBlockContent.trim()}</code>
                            </pre>
                        </div>
                    );
                }
            } else {
                acc.push(el);
            }
            return acc;
        }, []);
    };

    return (
        <article className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg">
            {renderContent()}
        </article>
    );
};

export default Textbook;