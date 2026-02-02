"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Clock, MapPin, DollarSign, Globe } from "lucide-react";

export interface JobListItemProps {
    title: string;
    type: string;
    rate: string;
    location: string;
    postedAt: string;
    description: string;
    skills: string[];
    isNew?: boolean;
    overlap?: string;
    timezone?: string;
    onClick?: () => void;
}

export function JobListItem({
    title,
    type,
    rate,
    location,
    postedAt,
    description,
    skills,
    isNew,
    overlap,
    timezone,
    onClick,
}: JobListItemProps) {
    return (
        <div
            onClick={onClick}
            className="group bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer relative"
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    {isNew && (
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    )}
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                        Accepting Applications
                    </span>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                        <Bookmark className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{rate}</span>
                    <span className="text-slate-300 mx-1">|</span>
                    <span>{type}</span>
                </div>
                <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{location}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{postedAt}</span>
                </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 line-clamp-2">
                {description}
            </p>

            {/* Footer: Skills & Timezone */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-700 pt-4">
                <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-semibold text-slate-400 mr-1 py-1">Required Skills:</span>
                    {skills.map((skill) => (
                        <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 font-normal"
                        >
                            {skill}
                        </Badge>
                    ))}
                </div>

                {(timezone || overlap) && (
                    <div className="flex flex-col gap-1 text-xs text-slate-500 dark:text-slate-400 min-w-fit">
                        {timezone && (
                            <div className="flex items-center gap-1.5">
                                <Globe className="w-3.5 h-3.5" />
                                <span>{timezone}</span>
                            </div>
                        )}
                        {overlap && (
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Min. Overlap: {overlap}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
