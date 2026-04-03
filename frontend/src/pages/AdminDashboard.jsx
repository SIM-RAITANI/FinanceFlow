import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Users, AlertCircle, TrendingDown, ArrowUpRight } from 'lucide-react';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b'];

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/admin/stats');
                setStats(data);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchStats();
    }, []);

    if (loading || !stats) return <div className="p-10">Calculating Global Analytics...</div>;

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <header>
                <h1 className="text-3xl font-bold text-slate-900">Organizational Insights</h1>
                <p className="text-slate-500">Consolidated financial data across all employees.</p>
            </header>

            {/* Global Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase">Total Revenue</p>
                    <p className="text-3xl font-black text-emerald-600">₹{stats.summary.totalIncome.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase">Total Burn (Expenses)</p>
                    <p className="text-3xl font-black text-rose-600">₹{stats.summary.totalExpense.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase">Active Transactions</p>
                    <p className="text-3xl font-black text-slate-900">{stats.summary.count}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* TOP SPENDERS PIE CHART */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                        <Users className="text-indigo-600" size={20} /> User-wise Expense Distribution
                    </h3>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={stats.userSpendStats} 
                                    dataKey="totalSpent" 
                                    nameKey="username" 
                                    innerRadius={80} 
                                    outerRadius={120} 
                                    paddingAngle={5}
                                >
                                    {stats.userSpendStats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* HIGHEST SPENDING CATEGORIES */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                        <TrendingDown className="text-rose-600" size={20} /> Top Spending Categories
                    </h3>
                    <div className="space-y-4">
                        {stats.categoryStats.slice(0, 5).map((cat, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                <span className="font-bold text-slate-700">{cat._id}</span>
                                <span className="text-rose-600 font-black">₹{cat.total.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;