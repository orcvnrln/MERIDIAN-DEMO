"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, Calendar } from "lucide-react";

const data = [
    { date: 'Dec 01', mining: 30, financial: 20, oil: 25, construction: 25 },
    { date: 'Dec 03', mining: 28, financial: 22, oil: 26, construction: 24 },
    { date: 'Dec 05', mining: 25, financial: 25, oil: 28, construction: 22 },
    { date: 'Dec 07', mining: 22, financial: 28, oil: 30, construction: 20 },
    { date: 'Dec 09', mining: 20, financial: 30, oil: 32, construction: 18 },
    { date: 'Dec 11', mining: 18, financial: 32, oil: 33, construction: 17 },
    { date: 'Dec 13', mining: 16, financial: 34, oil: 34, construction: 16 },
    { date: 'Dec 15', mining: 15, financial: 35, oil: 35, construction: 15 },
    { date: 'Dec 17', mining: 14, financial: 36, oil: 36, construction: 14 },
    { date: 'Dec 19', mining: 13, financial: 37, oil: 37, construction: 13 },
    { date: 'Dec 21', mining: 12, financial: 38, oil: 38, construction: 12 },
    { date: 'Dec 23', mining: 12, financial: 38, oil: 38, construction: 12 },
    { date: 'Dec 25', mining: 12, financial: 38, oil: 38, construction: 12 },
    { date: 'Dec 27', mining: 12, financial: 38, oil: 38, construction: 12 },
    { date: 'Dec 29', mining: 12, financial: 38, oil: 38, construction: 12 },
    { date: 'Dec 31', mining: 12, financial: 38, oil: 38, construction: 12 },
];

export function HistoricalOverview() {
    return (
        <Card className="bg-[#1e1b4b] border-none text-white h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex space-x-4">
                    <div className="flex items-center space-x-2 border-b-2 border-primary pb-1">
                        <CardTitle className="text-sm font-medium">Historical Overview</CardTitle>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-sm text-muted-foreground pb-1">Historical Asset Class</div>
                    <div className="text-sm text-muted-foreground pb-1">Historical Portfolios</div>
                </div>
                <Button variant="outline" size="sm" className="bg-[#2d2a5d] border-none text-xs h-7">
                    <Calendar className="mr-2 h-3 w-3" />
                    Dec, 2021 - Dec, 2021
                </Button>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} barSize={12}>
                            <XAxis
                                dataKey="date"
                                stroke="#6b7280"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#6b7280"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e1b4b', border: 'none', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                            <Bar dataKey="mining" stackId="a" fill="#c084fc" name="Mining" radius={[0, 0, 4, 4]} />
                            <Bar dataKey="general" stackId="a" fill="#818cf8" name="General Financial" />
                            <Bar dataKey="oil" stackId="a" fill="#fb7185" name="Oil & Gas Producers" />
                            <Bar dataKey="construction" stackId="a" fill="#f472b6" name="Construction & Materials" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
