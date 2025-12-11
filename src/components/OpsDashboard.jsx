import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Activity,
    Leaf,
    DollarSign,
    Zap,
    Trash2,
    Users,
    AlertTriangle,
    CheckCircle,
    TrendingUp,
    MapPin
} from 'lucide-react';

const OpsDashboard = () => {
    const [activeMission, setActiveMission] = useState('Newnham Cafeteria');

    // Mock Data for "Live Flow"
    const [metrics, setMetrics] = useState({
        auditsToday: 142,
        savingsToday: 450,
        complianceRate: 94
    });

    useEffect(() => {
        // Simulate live data ticking
        const interval = setInterval(() => {
            setMetrics(prev => ({
                auditsToday: prev.auditsToday + 1,
                savingsToday: prev.savingsToday + (Math.random() * 5),
                complianceRate: Math.min(100, Math.max(90, prev.complianceRate + (Math.random() - 0.5)))
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6 font-sans">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-3">
                        <span className="bg-usfs-green p-2 rounded-lg"><Activity size={24} /></span>
                        SDG Passport: <span className="text-slate-400">Operations Command</span>
                    </h1>
                    <p className="text-slate-400 text-sm mt-1 ml-14">Real-time Campus Sustainability Audits</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-xs text-slate-400 uppercase tracking-widest">Calculated ROI</p>
                        <p className="text-xl font-mono text-emerald-400 font-bold">Infinite</p>
                    </div>
                    <div className="h-10 w-[1px] bg-slate-700"></div>
                    <div className="text-right">
                        <p className="text-xs text-slate-400 uppercase tracking-widest">Net Zero Status</p>
                        <p className="text-xl font-mono text-white font-bold">On Track</p>
                    </div>
                </div>
            </div>

            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                <StatCard
                    icon={<Users className="text-blue-400" />}
                    label="Active Student Auditors"
                    value="1,240"
                    sub="+12% this week"
                />
                <StatCard
                    icon={<CheckCircle className="text-purple-400" />}
                    label="Audits Verified (AI)"
                    value={metrics.auditsToday}
                    sub="Today's Volume"
                    isLive
                />
                <StatCard
                    icon={<DollarSign className="text-emerald-400" />}
                    label="Est. Daily Savings"
                    value={`$${metrics.savingsToday.toFixed(2)}`}
                    sub="Waste & Energy"
                    isLive
                />
                <StatCard
                    icon={<Leaf className="text-usfs-green" />}
                    label="Biodiversity Score"
                    value="98.2"
                    sub="SDG 14 & 15 Health"
                />
                <StatCard
                    icon={<Activity className="text-usfs-teal" />}
                    label="AASHE Data Gap"
                    value="98.2%"
                    sub="Audit Completeness"
                />
            </div>

            {/* MAIN CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT: LIVE MAP (Newnham) */}
                <div className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <MapPin className="text-slate-400" size={20} />
                            Live Audit Feed: Newnham Campus
                        </h3>
                        <span className="flex items-center gap-2 text-xs font-mono text-red-400 animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            LIVE
                        </span>
                    </div>

                    {/* Simulated Map Visual */}
                    <div className="relative h-[300px] w-full bg-slate-900 rounded-lg overflow-hidden mb-6 border border-slate-700/50">
                        {/* Simple Map Layout */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.senecapolytechnic.ca/content/dam/seneca/about/campuses/newnham-map.jpg')] bg-cover bg-center grayscale"></div>

                        {/* Hotspots */}
                        <Hotspot top="30%" left="40%" label="Cafeteria" status="audit" />
                        <Hotspot top="60%" left="70%" label="CITE Building" status="active" />
                        <Hotspot top="20%" left="80%" label="Residence" status="idle" />
                    </div>

                    {/* Recent Logs Table */}
                    <div className="overflow-hidden rounded-lg border border-slate-700">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-900 text-slate-400 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3">Time</th>
                                    <th className="px-4 py-3">Location</th>
                                    <th className="px-4 py-3">Mission</th>
                                    <th className="px-4 py-3">Result</th>
                                    <th className="px-4 py-3">Savings</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 bg-slate-800/50">
                                <LogRow time="Now" loc="Cafeteria" mission="Waste Sorter Audit" result="Correction Made" save="$4.50" isNew />
                                <LogRow time="2m ago" loc="CITE Lab 402" mission="Lights Off Check" result="Verified Off" save="$0.00" />
                                <LogRow time="5m ago" loc="Gymnasium" mission="HVAC Vent Check" result="Reported Issue" save="Potential" />
                                <LogRow time="12m ago" loc="Library" mission="Recycling Bin" result="Contamination" save="-$2.00" />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* RIGHT: ALERTS & CAMPAIGNS */}
                <div className="space-y-6">

                    {/* Active Campaign */}
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Current Campaign</h3>
                        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-lg p-5 border border-indigo-500/30">
                            <div className="flex justify-between items-start mb-2">
                                <div className="bg-indigo-500/20 p-2 rounded text-indigo-400"><Trash2 size={24} /></div>
                                <span className="text-xs font-bold bg-indigo-500 text-white px-2 py-1 rounded">PRIORITY</span>
                            </div>
                            <h4 className="font-bold text-xl mb-1">Project: Zero Waste</h4>
                            <p className="text-xs text-slate-400 mb-4">Target: Reduce contamination in cafeteria bins by 50%.</p>
                            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-indigo-500 w-[65%] h-full"></div>
                            </div>
                            <div className="flex justify-between text-xs mt-2 text-slate-400">
                                <span>Progress: 65%</span>
                                <span>Goal: 1000 Audits</span>
                            </div>
                        </div>
                    </div>

                    {/* Operational Alerts */}
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Operational Alerts</h3>
                        <div className="space-y-3">
                            <AlertItem type="critical" msg="CITE Level 3: HVAC Efficiency drop detected." />
                            <AlertItem type="warning" msg="Residence: Recycling contamination spike (80%)." />
                            <AlertItem type="success" msg="Oasis: Energy Usage -15% vs Baseline." />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// --- Subcomponents for Clean Code ---

const StatCard = ({ icon, label, value, sub, isLive }) => (
    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-slate-900 rounded-lg border border-slate-700">{icon}</div>
            {isLive && <span className="animate-pulse w-2 h-2 rounded-full bg-green-500"></span>}
        </div>
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</div>
        <div className="text-[10px] text-slate-500 mt-1">{sub}</div>
    </div>
);

const Hotspot = ({ top, left, label, status }) => {
    const colors = {
        audit: 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.6)]',
        active: 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]',
        idle: 'bg-slate-500'
    };

    return (
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer" style={{ top, left }}>
            <div className={`w-4 h-4 rounded-full border-2 border-white ${colors[status]} relative`}>
                <div className={`absolute -inset-1 rounded-full opacity-50 ${status === 'audit' ? 'animate-ping bg-indigo-400' : ''}`}></div>
            </div>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-slate-900 text-xs px-2 py-1 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {label}
            </div>
        </div>
    );
};

const LogRow = ({ time, loc, mission, result, save, isNew }) => (
    <tr className={`border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors ${isNew ? 'bg-indigo-900/10' : ''}`}>
        <td className="px-4 py-3 font-mono text-xs text-slate-400">{time}</td>
        <td className="px-4 py-3 font-medium">{loc}</td>
        <td className="px-4 py-3 text-slate-300">{mission}</td>
        <td className="px-4 py-3">
            <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${result.includes('Issue') ? 'bg-red-500/20 text-red-400' :
                result.includes('Contamination') ? 'bg-orange-500/20 text-orange-400' :
                    'bg-emerald-500/20 text-emerald-400'
                }`}>
                {result}
            </span>
        </td>
        <td className="px-4 py-3 font-mono text-emerald-400">{save}</td>
    </tr>
);

const AlertItem = ({ type, msg }) => {
    const icons = {
        critical: <AlertTriangle size={16} className="text-red-400" />,
        warning: <Zap size={16} className="text-orange-400" />,
        success: <CheckCircle size={16} className="text-emerald-400" />
    };
    return (
        <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded border border-slate-700/50">
            <div className="mt-0.5">{icons[type]}</div>
            <p className="text-sm text-slate-300 leading-tight">{msg}</p>
        </div>
    );
};

export default OpsDashboard;
