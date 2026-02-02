import { SkillVerificationChat } from "@/components/skill-verification-chat";
import { SkipButton } from "@/components/skip-button";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function VerifyPage() {
    return (
        <div className="fixed inset-0 bg-slate-50 dark:bg-slate-900 flex flex-col">
            {/* Simple Header */}
            <header className="px-4 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 z-10">
                <Button variant="ghost" size="icon" asChild className="-ml-2">
                    <Link href="/candidate/review">
                        <ChevronLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-base font-semibold text-slate-900 dark:text-slate-100">Skill verification</h1>
                    <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        Live Assistant
                    </p>
                </div>
            </header>

            {/* Main Chat Area */}
            <main className="flex-1 overflow-hidden">
                <SkillVerificationChat />
                <div className="absolute bottom-4 right-4 z-20">
                    <SkipButton />
                </div>
            </main>
        </div>
    );
}
