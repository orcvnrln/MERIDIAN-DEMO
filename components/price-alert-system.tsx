"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Bell,
    BellOff,
    Plus,
    Trash2,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Check,
    X,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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

type AlertCondition = "above" | "below" | "crossover" | "crossunder";
type AlertType = "price" | "rsi" | "macd" | "volume";

interface Alert {
    id: string;
    type: AlertType;
    condition: AlertCondition;
    value: number;
    isActive: boolean;
    triggered: boolean;
    createdAt: Date;
    label: string;
}

interface PriceAlertSystemProps {
    currentPrice: number;
    rsi: number;
    macd: number;
    volume: number;
}

export function PriceAlertSystem({
    currentPrice,
    rsi,
    macd,
    volume,
}: PriceAlertSystemProps) {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [newAlert, setNewAlert] = useState({
        type: "price" as AlertType,
        condition: "above" as AlertCondition,
        value: currentPrice,
        label: "",
    });
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    // Request notification permission
    useEffect(() => {
        if ("Notification" in window) {
            Notification.requestPermission().then((permission) => {
                setNotificationsEnabled(permission === "granted");
            });
        }
    }, []);

    // Check alerts
    useEffect(() => {
        const checkAlerts = () => {
            setAlerts((prevAlerts) =>
                prevAlerts.map((alert) => {
                    if (!alert.isActive || alert.triggered) return alert;

                    let shouldTrigger = false;
                    let currentValue = 0;

                    switch (alert.type) {
                        case "price":
                            currentValue = currentPrice;
                            break;
                        case "rsi":
                            currentValue = rsi;
                            break;
                        case "macd":
                            currentValue = macd;
                            break;
                        case "volume":
                            currentValue = volume;
                            break;
                    }

                    switch (alert.condition) {
                        case "above":
                            shouldTrigger = currentValue > alert.value;
                            break;
                        case "below":
                            shouldTrigger = currentValue < alert.value;
                            break;
                        case "crossover":
                            shouldTrigger = currentValue > alert.value;
                            break;
                        case "crossunder":
                            shouldTrigger = currentValue < alert.value;
                            break;
                    }

                    if (shouldTrigger) {
                        triggerNotification(alert, currentValue);
                        return { ...alert, triggered: true };
                    }

                    return alert;
                })
            );
        };

        const interval = setInterval(checkAlerts, 1000);
        return () => clearInterval(interval);
    }, [currentPrice, rsi, macd, volume]);

    const triggerNotification = (alert: Alert, value: number) => {
        if (notificationsEnabled) {
            new Notification("Price Alert Triggered! 🔔", {
                body: `${alert.label || alert.type.toUpperCase()}: ${alert.condition} ${alert.value} (Current: ${value.toFixed(2)})`,
                icon: "/icon.png",
            });
        }

        // Play sound
        const audio = new Audio("/notification.mp3");
        audio.play().catch(console.error);
    };

    const addAlert = () => {
        const alert: Alert = {
            id: `alert-${Date.now()}`,
            type: newAlert.type,
            condition: newAlert.condition,
            value: newAlert.value,
            isActive: true,
            triggered: false,
            createdAt: new Date(),
            label: newAlert.label || `${newAlert.type.toUpperCase()} ${newAlert.condition} ${newAlert.value}`,
        };

        setAlerts([...alerts, alert]);
        setIsOpen(false);
        setNewAlert({
            type: "price",
            condition: "above",
            value: currentPrice,
            label: "",
        });
    };

    const deleteAlert = (id: string) => {
        setAlerts(alerts.filter((a) => a.id !== id));
    };

    const toggleAlert = (id: string) => {
        setAlerts(
            alerts.map((a) =>
                a.id === id ? { ...a, isActive: !a.isActive, triggered: false } : a
            )
        );
    };

    const resetAlert = (id: string) => {
        setAlerts(
            alerts.map((a) => (a.id === id ? { ...a, triggered: false } : a))
        );
    };

    const activeAlerts = alerts.filter((a) => a.isActive && !a.triggered);
    const triggeredAlerts = alerts.filter((a) => a.triggered);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Bell size={20} style={{ color: palette.info }} />
                    <h3 className="text-lg font-semibold" style={{ color: palette.text }}>
                        Price Alerts
                    </h3>
                    <Badge
                        className="border-0"
                        style={{
                            backgroundColor: `${palette.info}22`,
                            color: palette.text,
                        }}
                    >
                        {activeAlerts.length} Active
                    </Badge>
                    {triggeredAlerts.length > 0 && (
                        <Badge
                            className="border-0 animate-pulse"
                            style={{
                                backgroundColor: `${palette.success}22`,
                                color: palette.text,
                            }}
                        >
                            {triggeredAlerts.length} Triggered
                        </Badge>
                    )}
                </div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button
                            size="sm"
                            className="gap-2"
                            style={{
                                backgroundColor: palette.info,
                                color: "#fff",
                            }}
                        >
                            <Plus size={16} />
                            New Alert
                        </Button>
                    </DialogTrigger>

                    <DialogContent
                        className="border-0"
                        style={{
                            background: `linear-gradient(145deg, ${palette.card}, ${palette.elevated})`,
                            color: palette.text,
                            border: `1px solid ${palette.border}`,
                        }}
                    >
                        <DialogHeader>
                            <DialogTitle style={{ color: palette.text }}>
                                Create New Alert
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4 mt-4">
                            <div>
                                <label className="text-sm mb-2 block" style={{ color: palette.muted }}>
                                    Alert Type
                                </label>
                                <Select
                                    value={newAlert.type}
                                    onValueChange={(value) =>
                                        setNewAlert({ ...newAlert, type: value as AlertType })
                                    }
                                >
                                    <SelectTrigger
                                        style={{
                                            backgroundColor: palette.elevated,
                                            borderColor: palette.border,
                                            color: palette.text,
                                        }}
                                    >
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent
                                        style={{
                                            backgroundColor: palette.elevated,
                                            borderColor: palette.border,
                                        }}
                                    >
                                        <SelectItem value="price">Price</SelectItem>
                                        <SelectItem value="rsi">RSI</SelectItem>
                                        <SelectItem value="macd">MACD</SelectItem>
                                        <SelectItem value="volume">Volume</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm mb-2 block" style={{ color: palette.muted }}>
                                    Condition
                                </label>
                                <Select
                                    value={newAlert.condition}
                                    onValueChange={(value) =>
                                        setNewAlert({ ...newAlert, condition: value as AlertCondition })
                                    }
                                >
                                    <SelectTrigger
                                        style={{
                                            backgroundColor: palette.elevated,
                                            borderColor: palette.border,
                                            color: palette.text,
                                        }}
                                    >
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent
                                        style={{
                                            backgroundColor: palette.elevated,
                                            borderColor: palette.border,
                                        }}
                                    >
                                        <SelectItem value="above">Above</SelectItem>
                                        <SelectItem value="below">Below</SelectItem>
                                        <SelectItem value="crossover">Crossover</SelectItem>
                                        <SelectItem value="crossunder">Crossunder</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm mb-2 block" style={{ color: palette.muted }}>
                                    Value
                                </label>
                                <Input
                                    type="number"
                                    value={newAlert.value}
                                    onChange={(e) =>
                                        setNewAlert({ ...newAlert, value: parseFloat(e.target.value) })
                                    }
                                    style={{
                                        backgroundColor: palette.elevated,
                                        borderColor: palette.border,
                                        color: palette.text,
                                    }}
                                />
                            </div>

                            <div>
                                <label className="text-sm mb-2 block" style={{ color: palette.muted }}>
                                    Label (optional)
                                </label>
                                <Input
                                    type="text"
                                    value={newAlert.label}
                                    onChange={(e) =>
                                        setNewAlert({ ...newAlert, label: e.target.value })
                                    }
                                    placeholder="e.g., Breakout level"
                                    style={{
                                        backgroundColor: palette.elevated,
                                        borderColor: palette.border,
                                        color: palette.text,
                                    }}
                                />
                            </div>

                            <Button
                                onClick={addAlert}
                                className="w-full"
                                style={{
                                    backgroundColor: palette.info,
                                    color: "#fff",
                                }}
                            >
                                Create Alert
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Notifications Status */}
            {!notificationsEnabled && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg border flex items-center justify-between"
                    style={{
                        backgroundColor: `${palette.warning}11`,
                        borderColor: `${palette.warning}33`,
                    }}
                >
                    <div className="flex items-center gap-2">
                        <AlertTriangle size={16} style={{ color: palette.warning }} />
                        <span className="text-sm" style={{ color: palette.text }}>
                            Browser notifications are disabled
                        </span>
                    </div>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                            Notification.requestPermission().then((permission) => {
                                setNotificationsEnabled(permission === "granted");
                            });
                        }}
                        style={{
                            borderColor: palette.warning,
                            color: palette.warning,
                        }}
                    >
                        Enable
                    </Button>
                </motion.div>
            )}

            {/* Active Alerts */}
            {activeAlerts.length > 0 && (
                <div className="space-y-2">
                    <h4 className="text-sm font-semibold" style={{ color: palette.muted }}>
                        Active Alerts
                    </h4>
                    <AnimatePresence>
                        {activeAlerts.map((alert) => (
                            <motion.div
                                key={alert.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="p-3 rounded-lg border flex items-center justify-between"
                                style={{
                                    backgroundColor: palette.card,
                                    borderColor: palette.border,
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    {alert.condition === "above" || alert.condition === "crossover" ? (
                                        <TrendingUp size={16} style={{ color: palette.success }} />
                                    ) : (
                                        <TrendingDown size={16} style={{ color: palette.danger }} />
                                    )}
                                    <div>
                                        <p className="text-sm font-semibold" style={{ color: palette.text }}>
                                            {alert.label}
                                        </p>
                                        <p className="text-xs" style={{ color: palette.muted }}>
                                            {alert.type.toUpperCase()} {alert.condition} {alert.value}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => toggleAlert(alert.id)}
                                    >
                                        {alert.isActive ? (
                                            <BellOff size={16} style={{ color: palette.muted }} />
                                        ) : (
                                            <Bell size={16} style={{ color: palette.info }} />
                                        )}
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => deleteAlert(alert.id)}
                                    >
                                        <Trash2 size={16} style={{ color: palette.danger }} />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Triggered Alerts */}
            {triggeredAlerts.length > 0 && (
                <div className="space-y-2">
                    <h4 className="text-sm font-semibold" style={{ color: palette.muted }}>
                        Triggered Alerts
                    </h4>
                    <AnimatePresence>
                        {triggeredAlerts.map((alert) => (
                            <motion.div
                                key={alert.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="p-3 rounded-lg border flex items-center justify-between animate-pulse"
                                style={{
                                    backgroundColor: `${palette.success}11`,
                                    borderColor: `${palette.success}33`,
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <Check size={16} style={{ color: palette.success }} />
                                    <div>
                                        <p className="text-sm font-semibold" style={{ color: palette.text }}>
                                            {alert.label}
                                        </p>
                                        <p className="text-xs" style={{ color: palette.muted }}>
                                            Triggered! {alert.type.toUpperCase()} {alert.condition} {alert.value}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => resetAlert(alert.id)}
                                        style={{
                                            borderColor: palette.success,
                                            color: palette.success,
                                        }}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => deleteAlert(alert.id)}
                                    >
                                        <X size={16} style={{ color: palette.danger }} />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Empty State */}
            {alerts.length === 0 && (
                <div
                    className="p-8 rounded-lg border text-center"
                    style={{
                        backgroundColor: palette.card,
                        borderColor: palette.border,
                    }}
                >
                    <Bell size={48} className="mx-auto mb-3" style={{ color: palette.muted }} />
                    <p className="text-sm" style={{ color: palette.muted }}>
                        No alerts created yet. Click &quot;New Alert&quot; to get started.
                    </p>
                </div>
            )}
        </div>
    );
}
