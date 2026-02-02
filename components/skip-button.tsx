import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function SkipButton() {
    return (
        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" asChild>
            <Link href="/candidate/dashboard">
                Skip Onboarding <ChevronRight className="w-4 h-4 ml-1 opacity-50" />
            </Link>
        </Button>
    );
}
