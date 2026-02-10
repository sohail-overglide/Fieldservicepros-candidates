import { VideoRecorder } from "@/components/video-recorder";
import { SkipButton } from "@/components/skip-button";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Video as VideoIcon } from "lucide-react";
import Link from "next/link";

export default function VideoIntroPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12">
            <header className="p-4 flex items-center justify-between">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/candidate/verify">
                        <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                    </Link>
                </Button>
                <Link
                    href="/candidate/preferences"
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                    Skip for now
                </Link>
            </header>

            <main className="max-w-md mx-auto px-6 space-y-6">
                <div className="text-center space-y-3">
                    <div className="w-14 h-14 bg-brand-pale dark:bg-brand-emerald/20 rounded-2xl flex items-center justify-center mx-auto text-brand-emerald shadow-sm border border-brand-emerald/10">
                        <VideoIcon className="w-7 h-7" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                        Stand Out from the Crowd
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Record a short 30-60s intro. Tell employers about your toughest repair or your favorite tool.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <VideoRecorder />
                </div>

                <div className="flex items-start gap-3 p-4 bg-brand-pale/20 dark:bg-brand-emerald/10 rounded-xl text-sm text-brand-emerald dark:text-emerald-300 border border-brand-emerald/10">
                    <span className="text-xl">💡</span>
                    <p>
                        <strong>Pro Tip:</strong> Ensure you have good lighting and minimal background noise.
                    </p>
                </div>
                <div className="flex justify-center pb-6">
                    <SkipButton />
                </div>
            </main>
        </div>
    );
}
