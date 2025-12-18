import React from "react";
import { Button } from "@/components/ui/button";
import { Bell, Download } from "lucide-react";

export const InstitutionalHeader: React.FC = () => (
    <div className="flex items-center justify-between mb-4">
        <div>
            <h1 className="text-3xl font-bold text-white mb-2">🏦 Institutional Intelligence</h1>
            <p className="text-slate-400">
                {`Track "Smart Money" movements – Warren Buffett, Ray Dalio, and legendary investors`}
            </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" /> Set Alert
            </Button>
            <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" /> Export PDF
            </Button>
        </div>
    </div>
);
