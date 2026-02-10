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
        <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border hidden md:flex flex-col">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
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
                                "group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all",
                                isActive
                                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                                    isActive
                                        ? "text-sidebar-primary"
                                        : "text-sidebar-foreground/70 group-hover:text-sidebar-primary"
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            {/* User Footer */}
            <div className="p-4 border-t border-sidebar-border">
                <div className="border border-sidebar-border rounded-xl p-3 bg-sidebar shadow-sm">
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="flex items-center gap-3 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer group p-1">
                                <Avatar className="h-9 w-9 border border-sidebar-border">
                                    <AvatarImage src="/avatar.jpg" alt="User Avatar" className="object-cover" />
                                    <AvatarFallback className="text-sidebar-foreground">JD</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0 text-left space-y-0.5">
                                    <p className="text-sm font-semibold text-sidebar-foreground truncate group-hover:text-sidebar-primary transition-colors">
                                        John Doe
                                    </p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-sidebar-foreground/50 group-hover:text-sidebar-foreground" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-56 p-2" align="start" side="top">
                            <Link href="/candidate/onboarding" className="flex items-center gap-2 w-full p-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                                <LogOut className="w-4 h-4" />
                                Restart Prototype
                            </Link>
                        </PopoverContent>
                    </Popover>

                    <div className="my-3 border-t border-sidebar-border"></div>

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
                                    className="text-sidebar-border"
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
                                    className="text-sidebar-primary"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[10px] font-bold text-sidebar-foreground">86</span>
                            </div>
                        </div>
                        <span className="text-sm font-medium text-sidebar-foreground">Profile Score</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
