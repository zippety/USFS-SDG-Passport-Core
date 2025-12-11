import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Image, Shield, CheckCircle, Clock, Circle, Layout, TrendingUp, DollarSign, Users } from 'lucide-react';
import { mockTeamRoles, mockRoadmap, strategyLinks, mockImpactStats } from '../data/mockTeamData';

export default function TeamDashboard() {
    const navigate = useNavigate();

    const getIcon = (name) => {
        switch (name) {
            case 'Brain': return <Brain className="w-5 h-5" />;
            case 'Image': return <Image className="w-5 h-5" />;
            case 'Shield': return <Shield className="w-5 h-5" />;
            case 'Users': return <Users className="w-5 h-5" />;
            case 'CheckCircle': return <CheckCircle className="w-5 h-5" />;
            case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
            case 'DollarSign': return <DollarSign className="w-5 h-5" />;
            default: return <Layout className="w-5 h-5" />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-8 transition-colors duration-300">

            {/* Header */}
            <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/')}
                            className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                            USFS Command Center
                        </h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="bg-seneca-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                            PHASE 1: BOOTSTRAP
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

                {/* Section 0: Live Impact Overview (For Research Director) */}
                <section>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-slate-300 mb-4 flex items-center">
                        <TrendingUp className="w-6 h-6 mr-2 text-usfs-green" />
                        Live Impact Overview
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {mockImpactStats && mockImpactStats.map((stat, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">{stat.label}</span>
                                    <div className="text-usfs-green bg-usfs-green/10 dark:bg-green-900/20 p-1.5 rounded-lg">
                                        {getIcon(stat.icon)}
                                    </div>
                                </div>
                                <div className="text-2xl font-black text-slate-800 dark:text-white">
                                    {stat.value}
                                </div>
                                <div className="text-xs font-medium text-green-600 dark:text-green-400 mt-1">
                                    {stat.change}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 1: Strategy Vault */}
                <section>
                    <h2 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Strategy Vault
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {strategyLinks.map(link => (
                            <a
                                key={link.id}
                                href={link.url}
                                className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow flex items-center space-x-3 group"
                            >
                                <div className="bg-indigo-50 dark:bg-indigo-900/50 p-2 rounded-lg text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900 transition-colors">
                                    {getIcon(link.icon)}
                                </div>
                                <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {link.title}
                                </span>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Section 2: Roles & Focus */}
                <section>
                    <h2 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center">
                        <Layout className="w-5 h-5 mr-2" />
                        Roles & Focus
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {mockTeamRoles.map(role => (
                            <div key={role.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                                <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 p-4 border-b border-slate-200 dark:border-slate-600">
                                    <h3 className="font-bold text-slate-800 dark:text-white">{role.title}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{role.assignee}</p>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 font-medium">
                                        🎯 {role.focus}
                                    </p>
                                    <ul className="space-y-2">
                                        {role.tasks.map((task, i) => (
                                            <li key={i} className="text-xs text-slate-500 dark:text-slate-400 flex items-start">
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 mr-2 flex-shrink-0"></span>
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 3: Roadmap (Kanban) */}
                <section>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-slate-700 dark:text-slate-300 flex items-center">
                            <Clock className="w-5 h-5 mr-2" />
                            Live Roadmap (Kanban)
                        </h2>

                        {/* Legend */}
                        <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
                            <div className="flex items-center space-x-1">
                                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Presidents</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Creative</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Events</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Socials</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Marketing</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Research</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {/* TODO */}
                        <div className="bg-slate-100 dark:bg-slate-800/50 rounded-lg p-4">
                            <h3 className="font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider mb-3 flex items-center">
                                <Circle className="w-3 h-3 mr-2" /> To Do
                            </h3>
                            <div className="space-y-3">
                                {mockRoadmap.todo.map(item => (
                                    <div key={item.id} className="bg-white dark:bg-slate-800 p-3 rounded shadow-sm border border-slate-200 dark:border-slate-700">
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.title}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className={`inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded ${item.color || 'bg-slate-100 text-slate-400'}`}>
                                                {item.tag}
                                            </span>
                                            {item.date && (
                                                <span className="text-[10px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                                                    {item.date}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* IN PROGRESS */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-xs uppercase tracking-wider mb-3 flex items-center">
                                <Clock className="w-3 h-3 mr-2" /> In Progress
                            </h3>
                            <div className="space-y-3">
                                {mockRoadmap.inProgress.map(item => (
                                    <div key={item.id} className="bg-white dark:bg-slate-800 p-3 rounded shadow-sm border border-blue-100 dark:border-blue-900">
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.title}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className={`inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded ${item.color || 'bg-blue-50 text-blue-500'}`}>
                                                {item.tag}
                                            </span>
                                            {item.date && (
                                                <span className="text-[10px] font-mono text-slate-400">
                                                    {item.date}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* DONE */}
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                            <h3 className="font-bold text-green-600 dark:text-green-400 text-xs uppercase tracking-wider mb-3 flex items-center">
                                <CheckCircle className="w-3 h-3 mr-2" /> Done
                            </h3>
                            <div className="space-y-3">
                                {mockRoadmap.done.map(item => (
                                    <div key={item.id} className="bg-white dark:bg-slate-800 p-3 rounded shadow-sm border border-green-100 dark:border-green-900 opacity-75">
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200 line-through">{item.title}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className={`inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded ${item.color || 'bg-green-50 text-green-500'}`}>
                                                {item.tag}
                                            </span>
                                            {item.date && (
                                                <span className="text-[10px] font-mono text-slate-400">
                                                    {item.date}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </div>
    );
}
