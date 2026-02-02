"use client";


import { cn } from "@/lib/utils";

interface SettingsSectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
}

export function SettingsSection({ title, description, children, action, className }: SettingsSectionProps) {
    return (
        <div className={cn("space-y-6 py-6 border-b border-slate-100 dark:border-slate-800 last:border-0", className)}>
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                    {description && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>
                    )}
                </div>
                {action && (
                    <div className="ml-4 shrink-0">
                        {action}
                    </div>
                )}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
                {children}
            </div>
        </div>
    );
}
