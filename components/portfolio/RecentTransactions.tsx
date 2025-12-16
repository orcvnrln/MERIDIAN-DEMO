"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, File } from "lucide-react";

const transactions = [
    {
        date: "06/30/2021",
        time: "23:00:40",
        type: "Buy",
        description: "Bought 0.002\nAAPL @ 455.2715",
        price: "$ 100.00",
        amount: "0.01",
        fees: "$ 0.00",
    },
    {
        date: "05/30/2021",
        time: "19:00:24",
        type: "Sell",
        description: "Qualified Dividend\n(AAPL)",
        price: "$ 100.00",
        amount: "-6.69",
        fees: "$ -0.12",
    },
    {
        date: "04/30/2021",
        time: "16:00:10",
        type: "Sell",
        description: "Bought 1 IBM\n@ 124.99",
        price: "$ 100.00",
        amount: "0.82",
        fees: "$ 0.00",
    },
    {
        date: "03/30/2021",
        time: "10:03:21",
        type: "Buy",
        description: "Microsoft Corporation\nCommon Stock",
        price: "$ 100.00",
        amount: "-0.82",
        fees: "$ -0.05",
    },
    {
        date: "02/30/2021",
        time: "11:32:42",
        type: "Buy",
        description: "Free Balance Interest\nAdjustment",
        price: "$ 100.00",
        amount: "-124.99",
        fees: "$ 0.00",
    },
];

export function RecentTransactions() {
    return (
        <Card className="bg-[#12121a] border border-gray-800/50 rounded-xl text-white">
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <div className="border-b-2 border-primary pb-1">
                    <CardTitle className="text-sm font-medium">Recent transactions</CardTitle>
                </div>
                <div className="text-sm text-muted-foreground pb-1">Pending Orders</div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-[#2d2a5d] hover:bg-transparent">
                            <TableHead className="text-[#fbbf24] font-medium">Date / Time</TableHead>
                            <TableHead className="text-[#fbbf24] font-medium">Type</TableHead>
                            <TableHead className="text-[#fbbf24] font-medium">Description</TableHead>
                            <TableHead className="text-[#fbbf24] font-medium text-right">Price</TableHead>
                            <TableHead className="text-[#fbbf24] font-medium text-right">Amount</TableHead>
                            <TableHead className="text-[#fbbf24] font-medium text-right">Fees & Commissions</TableHead>
                            <TableHead className="text-[#fbbf24] font-medium text-center">Details</TableHead>
                            <TableHead className="text-[#fbbf24] font-medium text-center">PDF</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((tx, i) => (
                            <TableRow key={i} className="border-b border-[#2d2a5d] hover:bg-[#2d2a5d]/50">
                                <TableCell className="text-xs text-muted-foreground">
                                    <div>{tx.date}</div>
                                    <div>{tx.time}</div>
                                </TableCell>
                                <TableCell className="text-xs">{tx.type}</TableCell>
                                <TableCell className="text-xs whitespace-pre-line">{tx.description}</TableCell>
                                <TableCell className="text-right text-xs text-muted-foreground">{tx.price}</TableCell>
                                <TableCell className={`text-right text-xs ${parseFloat(tx.amount) > 0 ? 'text-green-400' : 'text-blue-400'}`}>
                                    {tx.amount}
                                </TableCell>
                                <TableCell className="text-right text-xs text-muted-foreground">{tx.fees}</TableCell>
                                <TableCell className="text-center">
                                    <div className="flex justify-center">
                                        <div className="bg-[#2d2a5d] p-1 rounded cursor-pointer hover:bg-[#3d3a7d]">
                                            <FileText className="h-4 w-4 text-gray-400" />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="flex justify-center">
                                        <div className="bg-[#2d2a5d] p-1 rounded cursor-pointer hover:bg-[#3d3a7d]">
                                            <File className="h-4 w-4 text-red-400" />
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
