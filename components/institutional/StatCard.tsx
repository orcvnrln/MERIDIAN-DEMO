import React from "react";

interface StatCardProps {
    label: string;
    value: string;
    bg: string; // Tailwind background class e.g. "bg-blue-950/30"
    text: string; // Tailwind text color class e.g. "text-blue-400"
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, bg, text }) => (
    <div className={`rounded-xl p-4 ${bg} border ${bg.replace('/30', '/50')}`}>
        <div className="text-sm text-slate-400">{label}</div>
        <div className={`text-2xl font-bold ${text}`}>{value}</div>
    </div>
);
