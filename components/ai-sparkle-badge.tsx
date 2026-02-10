import { Sparkles } from "lucide-react";

export function AiSparkleBadge({ label = "AI Generated" }: { label?: string }) {
    return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-pale/20 dark:bg-brand-emerald/20 text-brand-emerald dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-brand-emerald/10">
            <Sparkles className="w-3 h-3" />
            <span>{label}</span>
        </div>
    );
}
