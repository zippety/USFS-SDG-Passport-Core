import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Hash, Send, MoreVertical, Search, Lock } from 'lucide-react';
import { mockChannels, mockMessages } from '../data/mockChatData';

export default function CommunityHub() {
    const navigate = useNavigate();
    const [activeChannel, setActiveChannel] = useState(mockChannels[2]); // Default to SDG-13
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState(mockMessages);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageInput.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            channelId: activeChannel.id,
            user: "You",
            avatar: "👤",
            text: messageInput,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true
        };

        setMessages([...messages, newMessage]);
        setMessageInput('');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row transition-colors duration-300">

            {/* Mobile Header (Only visible on small screens) */}
            <div className="md:hidden bg-white dark:bg-gray-800 p-4 border-b dark:border-gray-700 flex items-center justify-between shadow-sm z-10">
                <button onClick={() => navigate('/')} className="p-2 -ml-2 text-gray-600 dark:text-gray-300">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="font-bold text-gray-800 dark:text-gray-100">#{activeChannel.name}</span>
                <button className="p-2 -mr-2 text-gray-600 dark:text-gray-300">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>

            {/* Sidebar - Channel List */}
            <div className="hidden md:flex flex-col w-64 bg-gray-100 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900 sticky top-0">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="font-semibold">Exit Hub</span>
                    </button>
                </div>

                <div className="p-4">
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Find groups..."
                            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm border-none focus:ring-1 focus:ring-green-500 text-gray-800 dark:text-gray-200"
                        />
                    </div>

                    <h3 className="text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2 px-2">
                        My Channels
                    </h3>
                    <div className="space-y-1">
                        {mockChannels.map(channel => (
                            <button
                                key={channel.id}
                                onClick={() => setActiveChannel(channel)}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeChannel.id === channel.id
                                        ? 'bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 shadow-sm'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-900'
                                    }`}
                            >
                                <div className="flex items-center space-x-2 min-w-0">
                                    {channel.type === 'private' ? (
                                        <Lock className="w-4 h-4 flex-shrink-0 opacity-70" />
                                    ) : (
                                        <Hash className="w-4 h-4 flex-shrink-0 opacity-70" />
                                    )}
                                    <span className="truncate">{channel.name}</span>
                                </div>
                                {channel.unread > 0 && (
                                    <span className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                        {channel.unread}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-[calc(100vh-60px)] md:h-screen">
                {/* Desktop Header */}
                <div className="hidden md:flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center space-x-2">
                        <Hash className="w-5 h-5 text-gray-400" />
                        <div>
                            <h2 className="text-lg font-bold text-gray-800 dark:text-white">{activeChannel.name}</h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400">124 members • 5 online</p>
                        </div>
                    </div>
                    {/* Mobile Exit Button (if screen resized) */}
                    <button onClick={() => navigate('/')} className="md:hidden">
                        <ArrowLeft />
                    </button>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-white dark:bg-gray-900">
                    {messages
                        .filter(m => m.channelId === activeChannel.id)
                        .map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex items-start space-x-3 ${msg.isMe ? 'flex-row-reverse space-x-reverse' : ''}`}
                            >
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-lg shadow-sm border border-gray-100 flex-shrink-0">
                                    {msg.avatar}
                                </div>
                                <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} max-w-[80%]`}>
                                    <div className="flex items-baseline space-x-2 mb-1">
                                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{msg.user}</span>
                                        <span className="text-xs text-gray-400">{msg.timestamp}</span>
                                    </div>
                                    <div
                                        className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${msg.isMe
                                                ? 'bg-green-600 text-white rounded-tr-none'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-gray-700'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleSendMessage} className="relative max-w-4xl mx-auto">
                        <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder={`Message #${activeChannel.name}`}
                            className="w-full pl-4 pr-12 py-3 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 border-none shadow-inner"
                        />
                        <button
                            type="submit"
                            className={`absolute right-2 top-2 p-1.5 rounded-full transition-colors ${messageInput.trim()
                                    ? 'bg-green-500 text-white hover:bg-green-600'
                                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-default'
                                }`}
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
