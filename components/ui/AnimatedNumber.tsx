"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedNumberProps {
    value: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
    duration?: number;
    colorFlash?: boolean;
}

export function AnimatedNumber({
    value,
    decimals = 0,
    prefix = "",
    suffix = "",
    className = "",
    duration = 0.5,
    colorFlash = false
}: AnimatedNumberProps) {
    const [flash, setFlash] = useState<"up" | "down" | null>(null);
    const prevValue = useRef(value);

    const spring = useSpring(value, {
        duration: duration * 1000,
        bounce: 0
    });

    const display = useTransform(spring, (latest) => {
        return `${prefix}${latest.toFixed(decimals)}${suffix}`;
    });

    useEffect(() => {
        spring.set(value);

        if (colorFlash && prevValue.current !== value) {
            setFlash(value > prevValue.current ? "up" : "down");
            const timer = setTimeout(() => setFlash(null), 600);
            prevValue.current = value;
            return () => clearTimeout(timer);
        }
    }, [value, spring, colorFlash]);

    return (
        <motion.span
            className={className}
            animate={{
                color: flash === "up"
                    ? ["inherit", "#10b981", "inherit"]
                    : flash === "down"
                        ? ["inherit", "#ef4444", "inherit"]
                        : "inherit"
            }}
            transition={{ duration: 0.6 }}
        >
            <motion.span>{display}</motion.span>
        </motion.span>
    );
}
