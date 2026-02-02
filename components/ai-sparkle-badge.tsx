import { Sparkles } from "lucide-react";

export function AiSparkleBadge({ label = "AI Generated" }: { label?: string }) {
    return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wide">
            <Sparkles className="w-3 h-3" />
            <span>{label}</span>
        </div>
    );
}
