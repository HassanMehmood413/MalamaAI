import React from 'react';

interface LLMResponseDisplayProps {
    response: string;
    chatHistory: { role: string; content: string }[];
}

const LLMResponseDisplay: React.FC<LLMResponseDisplayProps> = ({ response, chatHistory }) => {
    // Function to format sections with headings and bullet points
    const formatResponse = (text: string) => {
        const sections = text.split('**').filter(Boolean);
        return sections.map((section, index) => {
            const [title, ...content] = section.split(':');
            if (content.length === 0) {
                return (
                    <p key={index} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        {title}
                    </p>
                );
            }
            return (
                <div key={index} className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-emerald-700 dark:text-emerald-500">
                        {title}
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                        {content[0].split('*').filter(Boolean).map((item, i) => (
                            <li key={i} className="text-gray-600 dark:text-gray-400">
                                {item.trim()}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        });
    };

    return (
        <div className="llm-response-display bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mt-8 max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
                <div className="w-2 h-8 bg-emerald-500 rounded-full mr-4"></div>
                <h2 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">AI Analysis</h2>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
                {formatResponse(response)}
            </div>
            
            <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
                <div className="flex items-center mb-6">
                    <div className="w-2 h-8 bg-blue-500 rounded-full mr-4"></div>
                    <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Conversation History</h3>
                </div>
                <div className="space-y-4">
                    {chatHistory.map((chat, index) => (
                        <div key={index} 
                            className={`p-6 rounded-lg border-l-4 ${
                                chat.role === 'user' 
                                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500' 
                                    : 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500'
                            }`}>
                            <span className="font-semibold capitalize text-gray-700 dark:text-gray-300">
                                {chat.role}:
                            </span>
                            <div className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
                                {chat.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LLMResponseDisplay;
