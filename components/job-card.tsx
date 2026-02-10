import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OneClickApplyDrawer } from "./one-click-apply-drawer";
import { MapPin, DollarSign, Building } from "lucide-react";
import React from "react";

interface JobCardProps {
    title: string;
    company: string;
    location: string;
    distance: string;
    payRange: string;
    matchScore: number;
    tags: string[];
    onClick?: () => void;
    actionLabel?: string;
    isApplied?: boolean;
}

export function JobCard({
    title,
    company,
    location,
    distance,
    payRange,
    matchScore,
    tags,
    onClick,
    actionLabel,
    isApplied
}: JobCardProps) {
    return (
        <Card
            className="group hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 hover:border-primary/50 cursor-pointer relative overflow-hidden p-5"
            onClick={onClick}
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 leading-tight mb-1">
                        {title}
                    </h3>
                    <div className="flex items-center text-brand-grey dark:text-slate-400 text-sm font-medium">
                        <Building className="w-3.5 h-3.5 mr-1 text-brand-emerald" />
                        {company}
                    </div>
                </div>
                <div className="text-right">
                    <div className="inline-flex items-center justify-center px-2 py-1 bg-brand-pale/20 dark:bg-brand-emerald/10 text-brand-emerald dark:text-emerald-400 text-xs font-bold rounded-lg mb-1 border border-brand-emerald/10 shadow-sm">
                        {matchScore}% Match
                    </div>
                    <p className="text-xs text-slate-400">{distance} away</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-slate-100 dark:bg-slate-700 font-normal text-slate-600 dark:text-slate-300">
                        {tag}
                    </Badge>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <div className="flex flex-col">
                    <span className="text-xs text-slate-400 uppercase font-semibold">Pay Range</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200 flex items-center">
                        <DollarSign className="w-3.5 h-3.5 mr-0.5 text-slate-400" />
                        {payRange}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-slate-400 uppercase font-semibold">Location</span>
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-200 flex items-center truncate">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {location}
                    </div>
                </div>
            </div>

            {isApplied ? (
                <Button
                    className="w-full mt-4 bg-brand-emerald hover:bg-emerald-700 text-white border-none shadow-lg shadow-brand-emerald/10"
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        onClick?.();
                    }}
                >
                    View Job Details
                </Button>
            ) : (
                <OneClickApplyDrawer
                    jobTitle={title}
                    companyName={company}
                    matchScore={matchScore}
                    triggerText={actionLabel}
                />
            )}
        </Card>
    );
}
