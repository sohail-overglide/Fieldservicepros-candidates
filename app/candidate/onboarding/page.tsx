import { ResumeUploader } from "@/components/resume-uploader";
import { Button } from "@/components/ui/button";
import { SkipButton } from "@/components/skip-button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function OnboardingPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
            {/* Header */}
            <header className="p-4 flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild className=" -ml-2">
                    <Link href="/candidate/login">
                        <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                    </Link>
                </Button>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-1/6" /> {/* 1/6 progress bar */}
                </div>
                <span className="text-sm font-medium text-slate-500 whitespace-nowrap">
                    Step 1/6
                </span>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 -mt-10">
                <div className="w-full max-w-md space-y-8 text-center">
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-brand-pale dark:bg-brand-emerald/20 rounded-2xl flex items-center justify-center mx-auto text-primary text-3xl shadow-sm border border-brand-emerald/10">
                            👋
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                            Let&apos;s build your profile
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Upload your resume and our AI will extract your skills, licenses, and experience in seconds.
                        </p>
                    </div>

                    <div className="pt-4">
                        <ResumeUploader />
                    </div>

                    <p className="text-sm text-slate-400">
                        Supports PDF, DOCX (Max 10MB)
                    </p>
                    <div className="flex justify-center">
                        <SkipButton />
                    </div>
                </div>
            </main>
        </div>
    );
}
