"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Building2, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Job {
    title: string;
    company: string;
    location: string;
    distance: string;
    payRange: string;
    matchScore: number;
    tags: string[];
    description?: string;
    requirements?: string[];
    benefits?: string[];
    postedAt?: string;
    type?: string;
}

interface JobDetailsSheetProps {
    job: Job | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onApply: () => void;
    isApplied?: boolean;
}

export function JobDetailsSheet({ job, open, onOpenChange, onApply, isApplied }: JobDetailsSheetProps) {
    if (!job) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-xl md:max-w-2xl overflow-y-auto p-0 gap-0">
                {/* Sticky Header */}
                <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-6">
                    <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                                    {job.title}
                                </h2>
                                <div className="flex items-center gap-2 text-slate-500 mt-1">
                                    <Building2 className="w-4 h-4" />
                                    <span className="font-medium">{job.company}</span>
                                    <span>•</span>
                                    <span className="text-sm">{job.postedAt || "Posted 2 days ago"}</span>
                                </div>
                            </div>
                            <Badge variant="outline" className="bg-brand-pale/20 text-brand-emerald border-brand-emerald/10 dark:bg-brand-emerald/10 dark:text-emerald-400 dark:border-brand-emerald/20 shrink-0 font-bold">
                                {job.matchScore}% Match
                            </Badge>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                                <MapPin className="w-4 h-4" />
                                {job.location} ({job.distance})
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                                <DollarSign className="w-4 h-4" />
                                {job.payRange}
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                                <Clock className="w-4 h-4" />
                                {job.type || "Full-time"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <ScrollArea className="h-[calc(100vh-200px)]">
                    <div className="p-6 space-y-8">

                        {/* About the Role */}
                        <section className="space-y-3">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">About the Role</h3>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                {job.description || "As a Senior Biomedical Technician, you will be responsible for the repair, calibration, and maintenance of medical equipment. You will work closely with clinical staff to ensure patient safety and equipment reliability. This role requires strong technical skills and a commitment to excellence in healthcare technology management."}
                            </p>
                        </section>

                        {/* Key Responsibilities */}
                        <section className="space-y-3">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Key Responsibilities</h3>
                            <ul className="space-y-2">
                                {(job.requirements?.slice(0, 3) || [
                                    "Perform preventive maintenance on critical care equipment",
                                    "Troubleshoot and repair complex medical systems",
                                    "Document all service activities in CMMS"
                                ]).map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                                        <CheckCircle2 className="w-5 h-5 text-brand-emerald shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Requirements */}
                        <section className="space-y-3">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Requirements</h3>
                            <div className="flex flex-wrap gap-2">
                                {job.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                        {tag}
                                    </Badge>
                                ))}
                                <Badge variant="secondary" className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                    Valid Driver&apos;s License
                                </Badge>
                            </div>
                        </section>

                        {/* Benefits */}
                        <section className="space-y-3">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Benefits</h3>
                            <ul className="grid grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-300">
                                {job.benefits ? job.benefits.map((b, i) => <li key={i}>• {b}</li>) : (
                                    <>
                                        <li>• 401(k) Matching</li>
                                        <li>• Health, Dental, Vision</li>
                                        <li>• Company Vehicle</li>
                                        <li>• Paid Training</li>
                                    </>
                                )}
                            </ul>
                        </section>
                    </div>
                </ScrollArea>

                {/* Footer Actions */}
                <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                    <Button
                        size="lg"
                        className={`w-full text-lg border-none shadow-xl transition-all duration-300 ${isApplied
                            ? "bg-green-600 hover:bg-green-600 text-white cursor-default"
                            : "bg-brand-emerald hover:bg-emerald-700 text-white shadow-brand-emerald/20"
                            }`}
                        onClick={isApplied ? undefined : onApply}
                        disabled={isApplied}
                    >
                        {isApplied ? (
                            <>
                                <CheckCircle2 className="mr-2 w-5 h-5" /> Successfully Applied
                            </>
                        ) : (
                            <>
                                Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                            </>
                        )}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
