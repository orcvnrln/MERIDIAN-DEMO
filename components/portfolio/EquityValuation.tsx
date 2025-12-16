"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export function EquityValuation() {
    return (
        <Card className="bg-[#1e1b4b] border-none text-white h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex space-x-4">
                    <div className="flex items-center space-x-2 border-b-2 border-primary pb-1">
                        <CardTitle className="text-sm font-medium">Equity (?) </CardTitle>
                    </div>
                    <div className="text-sm text-muted-foreground pb-1">Fixed Income</div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center">
                    <div className="text-xs text-muted-foreground mb-2">Valuation</div>

                    <div className="flex">
                        {/* Y-Axis Label */}
                        <div className="flex flex-col justify-between mr-2 py-4 h-[200px] text-[10px] text-muted-foreground">
                            <span className="-rotate-90">Large</span>
                            <span className="-rotate-90">Medium</span>
                            <span className="-rotate-90">Small</span>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-3 gap-1 w-full max-w-[300px]">
                            {/* Row 1 */}
                            <div className="bg-[#2d2a5d] h-16 w-20 flex items-center justify-center text-xs rounded-sm relative group cursor-pointer hover:bg-[#3d3a7d] transition-colors">
                                29.00%
                                <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100"></div>
                            </div>
                            <div className="bg-[#2d2a5d] h-16 w-20 flex items-center justify-center text-xs rounded-sm hover:bg-[#3d3a7d] transition-colors">
                                20.00%
                            </div>
                            <div className="bg-[#2d2a5d] h-16 w-20 flex items-center justify-center text-xs rounded-sm hover:bg-[#3d3a7d] transition-colors">
                                27.00%
                            </div>

                            {/* Row 2 */}
                            <div className="bg-[#2d2a5d] h-16 w-20 flex items-center justify-center text-xs rounded-sm hover:bg-[#3d3a7d] transition-colors">
                                5.00%
                            </div>
                            <div className="bg-[#2d2a5d] h-16 w-20 flex items-center justify-center text-xs rounded-sm hover:bg-[#3d3a7d] transition-colors">
                                4.00%
                            </div>
                            <div className="bg-[#2d2a5d] h-16 w-20 flex items-center justify-center text-xs rounded-sm hover:bg-[#3d3a7d] transition-colors">
                                3.00%
                            </div>

                            {/* Row 3 */}
                            <div className="bg-[#2d2a5d] h-16 w-20 flex items-center justify-center text-xs rounded-sm hover:bg-[#3d3a7d] transition-colors">
                                1.00%
                            </div>
                            <div className="bg-[#2d2a5d] h-16 w-20 flex items-center justify-center text-xs rounded-sm hover:bg-[#3d3a7d] transition-colors">
                                1.00%
                            </div>
                            <div className="bg-[#2d2a5d] h-16 w-20 flex items-center justify-center text-xs rounded-sm hover:bg-[#3d3a7d] transition-colors">
                                0.00%
                            </div>
                        </div>

                        {/* Right Axis Label */}
                        <div className="flex flex-col justify-center ml-2 h-[200px] text-[10px] text-muted-foreground">
                            <span className="rotate-90 whitespace-nowrap">Market Cap</span>
                        </div>
                    </div>

                    {/* X-Axis Label */}
                    <div className="flex justify-between w-full max-w-[240px] mt-2 text-[10px] text-muted-foreground px-4">
                        <span>Value</span>
                        <span>Blend</span>
                        <span>Growth</span>
                    </div>

                    {/* Legend */}
                    <div className="mt-6 flex flex-col space-y-2 w-full max-w-[300px]">
                        <div className="flex items-center text-xs">
                            <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                            <span>Your selected accounts</span>
                        </div>
                        <div className="flex items-center text-xs">
                            <div className="w-3 h-3 bg-[#fb7185] rounded-full mr-2"></div>
                            <span>Dow Jones U.S. Total Market Index</span>
                        </div>
                    </div>

                    {/* Risk Level */}
                    <div className="mt-4 w-full max-w-[300px]">
                        <div className="text-xs text-muted-foreground mb-1">Level of risk</div>
                        <div className="flex items-center space-x-2">
                            <div className="h-2 w-8 bg-[#2d2a5d] rounded"></div>
                            <span className="text-xs text-muted-foreground">High</span>
                            <div className="h-2 w-8 bg-[#2d2a5d] rounded"></div>
                            <span className="text-xs text-muted-foreground">Moderate</span>
                            <div className="h-2 w-8 bg-[#3d3a7d] rounded"></div>
                            <span className="text-xs text-muted-foreground">Low</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
