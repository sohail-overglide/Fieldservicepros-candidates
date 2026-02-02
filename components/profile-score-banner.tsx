"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileScoreBanner() {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">

            {/* Left: Circular Progress with Avatar */}
            <div className="relative w-32 h-32 flex-shrink-0">
                {/* Gradient Ring Background */}
                <svg
                    viewBox="0 0 128 128"
                    className="absolute inset-0 w-full h-full transform -rotate-90"
                >
                    <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-slate-100 dark:text-slate-800"
                    />
                    <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="url(#score-gradient)"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={365}
                        strokeDashoffset={50} // 86% approx
                        strokeLinecap="round"
                    />
                    <defs>
                        <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#d8b4fe" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Avatar Centered */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92px] h-[92px] rounded-full overflow-hidden p-1 bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center">
                    <Avatar className="w-full h-full">
                        <AvatarImage src="/avatar.jpg" alt="User Avatar" className="object-cover" />
                        <AvatarFallback className="text-2xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">JD</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            {/* Middle: Content */}
            <div className="flex-1 text-center md:text-left space-y-1">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Discovery score</h2>
                <div className="flex items-baseline justify-center md:justify-start gap-1">
                    <span className="text-5xl font-bold text-slate-900 dark:text-slate-100">86</span>
                    <span className="text-sm font-medium text-slate-400">pts</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                    View how you rank and get detailed insights on how to boost your score.
                </p>
            </div>
        </div>
    );
}
