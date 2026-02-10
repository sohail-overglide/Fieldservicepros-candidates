"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    MessageSquare,
    User,
    Settings,
    LogOut,
    Search,
    ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Dashboard", href: "/candidate/dashboard", icon: LayoutDashboard },
    { name: "Eligible Jobs", href: "/candidate/eligible-jobs", icon: Search },
    { name: "My Jobs", href: "/candidate/my-jobs", icon: Briefcase },
    { name: "Messages", href: "/candidate/messages", icon: MessageSquare },
    { name: "Profile", href: "/candidate/profile", icon: User },
    { name: "Settings", href: "/candidate/settings", icon: Settings },
];

export function CandidateSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col hidden md:flex">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
                <img src="/logo.png" alt="FieldService Pros" className="h-14 w-auto object-contain" />
            </div>

            {/* Navigation */}
            <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center px-3 py-2.5 text-sm font-bold rounded-xl transition-all",
                                isActive
                                    ? "bg-brand-pale/20 dark:bg-brand-emerald/10 text-brand-emerald font-bold border-r-4 border-brand-emerald shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                                    isActive
                                        ? "text-brand-emerald"
                                        : "text-slate-400 group-hover:text-brand-emerald dark:group-hover:text-brand-emerald/80"
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            {/* User Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 shadow-sm">
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="flex items-center gap-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                                <Avatar className="h-9 w-9 border border-slate-200 dark:border-slate-800">
                                    <AvatarImage src="/avatar.jpg" alt="User Avatar" className="object-cover" />
                                    <AvatarFallback className="text-slate-700 dark:text-slate-300">JD</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0 text-left space-y-0.5">
                                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-brand-emerald transition-colors">
                                        John Doe
                                    </p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-56 p-2" align="start" side="top">
                            <Link href="/candidate/onboarding" className="flex items-center gap-2 w-full p-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md transition-colors">
                                <LogOut className="w-4 h-4" />
                                Restart Prototype
                            </Link>
                        </PopoverContent>
                    </Popover>

                    <div className="my-3 border-t border-slate-100 dark:border-slate-800"></div>

                    <div className="flex items-center gap-3 pl-1">
                        <div className="relative w-9 h-9 flex items-center justify-center">
                            {/* Circular Progress Background */}
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="18"
                                    cy="18"
                                    r="16"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    fill="transparent"
                                    className="text-slate-100 dark:text-slate-800"
                                />
                                {/* Circular Progress Foreground - 86% */}
                                <circle
                                    cx="18"
                                    cy="18"
                                    r="16"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    fill="transparent"
                                    strokeDasharray={100}
                                    strokeDashoffset={14}
                                    className="text-brand-emerald"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200">86</span>
                            </div>
                        </div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Profile Score</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
