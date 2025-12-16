"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Minus,
    TrendingUp,
    Square,
    Type,
    Trash2,
    Download,
    Upload,
} from "lucide-react";

const palette = {
    bg: "#0D0D14",
    card: "#1A1A25",
    elevated: "#252532",
    text: "#E2E2F0",
    muted: "#A0A0B8",
    success: "#00F5A8",
    warning: "#FFA500",
    danger: "#FF4D8D",
    info: "#4A55E0",
    border: "rgba(74,85,224,0.2)",
};

type DrawingType = "line" | "trendline" | "fibonacci" | "rectangle" | "text";

interface Drawing {
    id: string;
    type: DrawingType;
    points: { x: number; y: number }[];
    color: string;
    text?: string;
}

interface DrawingToolsProps {
    width: number;
    height: number;
    priceRange: { min: number; max: number };
    timeRange: { start: number; end: number };
}

export function DrawingTools({
    width,
    height,
    priceRange,
    timeRange,
}: DrawingToolsProps) {
    const [selectedTool, setSelectedTool] = useState<DrawingType | null>(null);
    const [drawings, setDrawings] = useState<Drawing[]>([]);
    const [currentDrawing, setCurrentDrawing] = useState<Drawing | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const svgRef = useRef<SVGSVGElement>(null);

    const tools = [
        { type: "line" as DrawingType, icon: Minus, label: "Horizontal Line" },
        { type: "trendline" as DrawingType, icon: TrendingUp, label: "Trendline" },
        { type: "fibonacci" as DrawingType, icon: TrendingUp, label: "Fibonacci" },
        { type: "rectangle" as DrawingType, icon: Square, label: "Rectangle" },
        { type: "text" as DrawingType, icon: Type, label: "Text" },
    ];

    const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
        if (!selectedTool) return;

        const rect = svgRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newDrawing: Drawing = {
            id: `drawing-${Date.now()}`,
            type: selectedTool,
            points: [{ x, y }],
            color: palette.info,
        };

        setCurrentDrawing(newDrawing);
        setIsDrawing(true);
    };

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
        if (!isDrawing || !currentDrawing) return;

        const rect = svgRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setCurrentDrawing({
            ...currentDrawing,
            points: [currentDrawing.points[0]!, { x, y }],
        });
    };

    const handleMouseUp = () => {
        if (!isDrawing || !currentDrawing) return;

        if (currentDrawing.points.length >= 2) {
            setDrawings([...drawings, currentDrawing]);
        }

        setCurrentDrawing(null);
        setIsDrawing(false);
        setSelectedTool(null);
    };

    const clearDrawings = () => {
        setDrawings([]);
        setCurrentDrawing(null);
    };

    const saveDrawings = () => {
        const data = JSON.stringify(drawings);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "chart-drawings.json";
        a.click();
    };

    const loadDrawings = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target?.result as string);
                setDrawings(data);
            } catch (error) {
                console.error("Failed to load drawings:", error);
            }
        };
        reader.readAsText(file);
    };

    const renderFibonacci = (drawing: Drawing) => {
        if (drawing.points.length < 2) return null;

        const [start, end] = drawing.points;
        const levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
        const yDiff = end!.y - start!.y;

        return (
            <g key={drawing.id}>
                {levels.map((level) => {
                    const y = start!.y + yDiff * level;
                    return (
                        <g key={level}>
                            <line
                                x1={start!.x}
                                y1={y}
                                x2={end!.x}
                                y2={y}
                                stroke={drawing.color}
                                strokeWidth="1"
                                strokeDasharray="4 2"
                                opacity="0.6"
                            />
                            <text
                                x={end!.x + 5}
                                y={y}
                                fill={drawing.color}
                                fontSize="11"
                                fontWeight="600"
                            >
                                {(level * 100).toFixed(1)}%
                            </text>
                        </g>
                    );
                })}
            </g>
        );
    };

    const renderDrawing = (drawing: Drawing) => {
        if (drawing.points.length < 2) return null;

        const [start, end] = drawing.points;

        switch (drawing.type) {
            case "line":
                return (
                    <line
                        key={drawing.id}
                        x1={0}
                        y1={start!.y}
                        x2={width}
                        y2={start!.y}
                        stroke={drawing.color}
                        strokeWidth="2"
                        strokeDasharray="4 2"
                    />
                );

            case "trendline":
                return (
                    <line
                        key={drawing.id}
                        x1={start!.x}
                        y1={start!.y}
                        x2={end!.x}
                        y2={end!.y}
                        stroke={drawing.color}
                        strokeWidth="2"
                    />
                );

            case "fibonacci":
                return renderFibonacci(drawing);

            case "rectangle":
                return (
                    <rect
                        key={drawing.id}
                        x={Math.min(start!.x, end!.x)}
                        y={Math.min(start!.y, end!.y)}
                        width={Math.abs(end!.x - start!.x)}
                        height={Math.abs(end!.y - start!.y)}
                        fill={drawing.color}
                        fillOpacity="0.1"
                        stroke={drawing.color}
                        strokeWidth="2"
                    />
                );

            case "text":
                return (
                    <text
                        key={drawing.id}
                        x={start!.x}
                        y={start!.y}
                        fill={drawing.color}
                        fontSize="14"
                        fontWeight="600"
                    >
                        {drawing.text || "Text"}
                    </text>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div
                className="flex items-center gap-2 p-3 rounded-lg border"
                style={{
                    backgroundColor: palette.card,
                    borderColor: palette.border,
                }}
            >
                <span className="text-sm font-semibold mr-2" style={{ color: palette.text }}>
                    Drawing Tools:
                </span>

                {tools.map(({ type, icon: Icon, label }) => (
                    <Button
                        key={type}
                        variant={selectedTool === type ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTool(type)}
                        className="gap-2"
                        style={{
                            backgroundColor: selectedTool === type ? palette.info : "transparent",
                            borderColor: palette.border,
                            color: selectedTool === type ? "#fff" : palette.text,
                        }}
                    >
                        <Icon size={16} />
                        {label}
                    </Button>
                ))}

                <div className="flex-1" />

                <Button
                    variant="outline"
                    size="sm"
                    onClick={saveDrawings}
                    disabled={drawings.length === 0}
                    className="gap-2"
                    style={{
                        borderColor: palette.border,
                        color: palette.text,
                    }}
                >
                    <Download size={16} />
                    Save
                </Button>

                <label>
                    <input
                        type="file"
                        accept=".json"
                        onChange={loadDrawings}
                        className="hidden"
                    />
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        style={{
                            borderColor: palette.border,
                            color: palette.text,
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            (e.currentTarget.previousSibling as HTMLInputElement)?.click();
                        }}
                    >
                        <Upload size={16} />
                        Load
                    </Button>
                </label>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={clearDrawings}
                    disabled={drawings.length === 0}
                    className="gap-2"
                    style={{
                        borderColor: palette.border,
                        color: palette.danger,
                    }}
                >
                    <Trash2 size={16} />
                    Clear
                </Button>
            </div>

            {/* Drawing Canvas */}
            <div className="relative">
                <svg
                    ref={svgRef}
                    width={width}
                    height={height}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    style={{
                        cursor: selectedTool ? "crosshair" : "default",
                    }}
                >
                    {/* Existing drawings */}
                    {drawings.map(renderDrawing)}

                    {/* Current drawing */}
                    {currentDrawing && renderDrawing(currentDrawing)}
                </svg>
            </div>

            {/* Instructions */}
            {selectedTool && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg border"
                    style={{
                        backgroundColor: `${palette.info}11`,
                        borderColor: `${palette.info}33`,
                    }}
                >
                    <p className="text-sm" style={{ color: palette.text }}>
                        <strong>Instructions:</strong>{" "}
                        {selectedTool === "line" && "Click anywhere to draw a horizontal line"}
                        {selectedTool === "trendline" && "Click and drag to draw a trendline"}
                        {selectedTool === "fibonacci" && "Click and drag to draw Fibonacci retracement levels"}
                        {selectedTool === "rectangle" && "Click and drag to draw a rectangle zone"}
                        {selectedTool === "text" && "Click to add text annotation"}
                    </p>
                </motion.div>
            )}
        </div>
    );
}
