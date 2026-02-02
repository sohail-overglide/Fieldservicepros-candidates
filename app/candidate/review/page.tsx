import { AiSparkleBadge } from "@/components/ai-sparkle-badge";
import { EditableField } from "@/components/editable-field";
import { Button } from "@/components/ui/button";
import { SkipButton } from "@/components/skip-button";
import { ArrowRight, BadgeCheck, MapPin, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function ReviewPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-24 relative">
            {/* Header */}
            <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 px-6 py-4 flex items-center justify-between shadow-sm">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Profile Review</h1>
                    <p className="text-xs text-slate-500">Extracted from Resume.pdf</p>
                </div>
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-primary/20 bg-slate-100 flex items-center justify-center">
                    <img src="/avatar.jpg" alt="Avatar" className="w-full h-full object-cover" />
                </div>
            </div>

            <main className="p-6 space-y-6 max-w-lg mx-auto">

                {/* Basic Info */}
                <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <BadgeCheck className="w-5 h-5 text-primary" />
                            Identity
                        </h2>
                        <AiSparkleBadge />
                    </div>

                    <EditableField label="Full Name" initialValue="John Doe" />
                    <EditableField label="Job Title" initialValue="Senior Biomedical Technician" />

                    <div className="grid grid-cols-2 gap-4">
                        <EditableField label="Experience" initialValue="7 Years" />
                        <div className="space-y-1 p-2 -ml-2">
                            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Location</label>
                            <div className="flex items-center gap-1.5 text-slate-900 dark:text-slate-100">
                                <MapPin className="w-4 h-4 text-slate-400" />
                                <span>Austin, TX</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Professional Summary */}
                <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-primary" />
                            Summary
                        </h2>
                        <AiSparkleBadge label="AI Enhanced" />
                    </div>
                    <p className="text-sm text-slate-500 italic mb-2">
                        We polished this to highlight your medical equipment experience.
                    </p>
                    <EditableField
                        label="Bio"
                        initialValue="Certified BMET with 7 years of experience maintaining critical care equipment. Specialized in patient monitoring systems and diagnostic imaging support. Passionate about healthcare technology and patient safety."
                        multiline
                    />
                </section>

                {/* Skills */}
                <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-primary" />
                            Top Skills
                        </h2>
                        <AiSparkleBadge label="Extracted" />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {["Patient Monitoring", "Defibrillators", "Infusion Pumps", "Ventilators", "Preventive Maintenance", "Electrical Safety", "Troubleshooting"].map((skill) => (
                            <Badge key={skill} variant="secondary" className="px-3 py-1.5 text-sm font-normal bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200">
                                {skill}
                            </Badge>
                        ))}
                        <button className="px-3 py-1.5 text-sm font-medium text-primary border border-dashed border-primary/30 rounded-full hover:bg-primary/5">
                            + Add Skill
                        </button>
                    </div>
                </section>

            </main>

            {/* Floating Action Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-50">
                <div className="max-w-lg mx-auto">
                    <Button size="lg" className="w-full text-base font-semibold shadow-lg shadow-primary/20" asChild>
                        <Link href="/candidate/verify">
                            Next: Verify Skills <ArrowRight className="ml-2 w-5 h-5 opacity-90" />
                        </Link>
                    </Button>
                    <div className="flex justify-center mt-2">
                        <SkipButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
