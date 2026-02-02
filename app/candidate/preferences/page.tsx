import { PreferencesForm } from "@/components/preferences-form";
import { SkipButton } from "@/components/skip-button";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PreferencesPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <header className="p-4 flex items-center gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
                <Button variant="ghost" size="icon" asChild className="-ml-2">
                    <Link href="/candidate/video-intro">
                        <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                    </Link>
                </Button>
                <div className="flex-1">
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1">
                        <div className="bg-primary h-full w-5/6" /> {/* 5/6 progress bar */}
                    </div>
                    <p className="text-xs text-slate-500 font-medium">Almost done! Set your preferences.</p>
                </div>
            </header>

            <main className="max-w-md mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Job Preferences</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Help us match you with the right work.</p>
                </div>

                <PreferencesForm />
                <div className="flex justify-center mt-6">
                    <SkipButton />
                </div>
            </main>
        </div>
    );
}
