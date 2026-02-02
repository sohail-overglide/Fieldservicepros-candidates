"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type StatusType = "available" | "open" | "busy" | "offline";

interface StatusOption {
    value: StatusType;
    label: string;
    color: string;
}

const statuses: StatusOption[] = [
    { value: "available", label: "Available", color: "bg-green-500" },
    { value: "open", label: "Open to Offers", color: "bg-blue-500" },
    { value: "busy", label: "Busy", color: "bg-yellow-500" },
    { value: "offline", label: "Offline", color: "bg-slate-400" },
];

export function AvailabilityStatus({ className }: { className?: string }) {
    const [status, setStatus] = useState<StatusType>("available");
    const [open, setOpen] = useState(false);

    const currentStatus = statuses.find(s => s.value === status) || statuses[0];

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer group",
                        className
                    )}
                >
                    <span className={cn("w-2 h-2 rounded-full", currentStatus.color)} />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {currentStatus.label}
                    </span>
                    <ChevronRight className={cn("w-3.5 h-3.5 text-slate-400 transition-transform duration-200", open && "rotate-90")} />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-1" align="start">
                {statuses.map((s) => (
                    <button
                        key={s.value}
                        onClick={() => {
                            setStatus(s.value);
                            setOpen(false);
                        }}
                        className={cn(
                            "w-full flex items-center justify-between px-2 py-1.5 rounded-md text-sm transition-colors",
                            status === s.value
                                ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                        )}
                    >
                        <div className="flex items-center gap-2">
                            <span className={cn("w-2 h-2 rounded-full", s.color)} />
                            <span>{s.label}</span>
                        </div>
                        {status === s.value && <Check className="w-3.5 h-3.5 opacity-70" />}
                    </button>
                ))}
            </PopoverContent>
        </Popover>
    );
}
