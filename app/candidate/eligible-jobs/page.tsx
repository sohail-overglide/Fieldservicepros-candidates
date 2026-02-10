"use client";

import { CandidateSidebar } from "@/components/candidate-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Bell, Search, X, Bookmark } from "lucide-react";
import { JobListItem } from "@/components/job-list-item";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobDetailsSheet } from "@/components/job-details-sheet";
import { useState, useMemo } from "react";

const mockJobs = [
    {
        id: "1",
        title: "Senior Field Service Technician - HVAC",
        type: "Hourly (10 hrs/wk)",
        rate: "$45 - $60/hr",
        location: "Remote / On-site (Dallas, TX)",
        postedAt: "27 minutes ago",
        description: "We are seeking a highly skilled Senior Field Technician with expertise in commercial HVAC systems. This role involves diagnosing complex issues, performing preventative maintenance, and providing top-tier customer service for our enterprise clients.",
        skills: ["HVAC", "Troubleshooting", "Commercial Systems", "Electrical"],
        isNew: true,
        overlap: "2 hours",
        timezone: "Dallas, 1 hr behind",
        company: "ClimatePros Inc.",
        requirements: ["5+ years experience", "EPA Certification", "Clean driving record"],
        benefits: ["Health Insurance", "401k", "Company Vehicle"],
        distance: "5 miles",
        payRange: "$45 - $60/hr",
        matchScore: 98,
        tags: ["HVAC", "Troubleshooting", "Commercial Systems", "Electrical"]
    },
    {
        id: "2",
        title: "Medical Equipment Repair Specialist",
        type: "Hourly (5 hrs/wk)",
        rate: "$50 - $70/hr",
        location: "Remote / On-site (Chicago, IL)",
        postedAt: "1 hour ago",
        description: "Looking for a certified technician to service and repair diagnostic imaging equipment. Experience with MRI and CT scanners is required. Must be available for emergency calls during weekends.",
        skills: ["Medical Equipment", "MRI Repair", "Electronics", "Calibration"],
        isNew: true,
        overlap: "2 hours",
        timezone: "Chicago, Same time",
        company: "MedTech Solutions",
        requirements: ["BMET Certification", "OEM Training", "Hospital experience"],
        benefits: ["Flexible schedule", "Performance bonuses"],
        distance: "Remote",
        payRange: "$50 - $70/hr",
        matchScore: 92,
        tags: ["Medical Equipment", "MRI Repair", "Electronics", "Calibration"]
    },
    {
        id: "3",
        title: "Commercial Refrigeration Tech",
        type: "Scanning...",
        rate: "$35 - $45/hr",
        location: "On-site (Miami, FL)",
        postedAt: "3 hours ago",
        description: "Join our team of refrigeration experts. We handle installation and service for large-scale grocery chains and cold storage facilities. Rapid response times and attention to detail are critical.",
        skills: ["Refrigeration", "EPA Universal", "Soldering", "Schematics"],
        isNew: false,
        timezone: "Miami, 1 hr ahead",
        company: "CoolSys",
        requirements: ["3+ years experience", "Tools provided", "Night shift availability"],
        benefits: ["Paid time off", "Tool allowance", "Training"],
        distance: "12 miles",
        payRange: "$35 - $45/hr",
        matchScore: 85,
        tags: ["Refrigeration", "EPA Universal", "Soldering", "Schematics"]
    }
];

type SortOption = "newest" | "match" | "pay";

export default function EligibleJobsPage() {
    const [selectedJob, setSelectedJob] = useState<typeof mockJobs[0] | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("newest");
    const [specializations, setSpecializations] = useState<string[]>(["Field Tech"]);
    const [readJobIds, setReadJobIds] = useState<Set<string>>(new Set());
    const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());
    const [isApplied, setIsApplied] = useState(false);

    // Filtered jobs based on search query
    const filteredJobs = useMemo(() => {
        let jobs = [...mockJobs];

        // Search filter
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            jobs = jobs.filter(job =>
                job.title.toLowerCase().includes(q) ||
                job.skills.some(s => s.toLowerCase().includes(q)) ||
                job.description.toLowerCase().includes(q)
            );
        }

        // Sort
        if (sortBy === "match") {
            jobs.sort((a, b) => b.matchScore - a.matchScore);
        } else if (sortBy === "pay") {
            // Simple sort by extracting first dollar amount
            jobs.sort((a, b) => {
                const aRate = parseInt(a.rate.replace(/[^0-9]/g, ""));
                const bRate = parseInt(b.rate.replace(/[^0-9]/g, ""));
                return bRate - aRate;
            });
        }
        // "newest" is default order

        return jobs;
    }, [searchQuery, sortBy]);

    const newUnreadCount = mockJobs.filter(j => j.isNew && !readJobIds.has(j.id)).length;
    const oldUnreadCount = mockJobs.filter(j => !j.isNew && !readJobIds.has(j.id)).length;
    const savedJobs = mockJobs.filter(j => savedJobIds.has(j.id));

    const handleMarkAllRead = () => {
        setReadJobIds(new Set(mockJobs.map(j => j.id)));
    };

    const handleClearSpecializations = () => {
        setSpecializations([]);
    };

    const handleRemoveSpecialization = (spec: string) => {
        setSpecializations(prev => prev.filter(s => s !== spec));
    };

    const cycleSortBy = () => {
        setSortBy(prev => {
            if (prev === "newest") return "match";
            if (prev === "match") return "pay";
            return "newest";
        });
    };

    const sortLabel = sortBy === "newest" ? "Newest first" : sortBy === "match" ? "Best match" : "Highest pay";

    const toggleBookmark = (jobId: string) => {
        setSavedJobIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(jobId)) {
                newSet.delete(jobId);
            } else {
                newSet.add(jobId);
            }
            return newSet;
        });
    };

    const handleJobClick = (job: typeof mockJobs[0]) => {
        setReadJobIds(prev => new Set(prev).add(job.id));
        setSelectedJob(job);
        setIsApplied(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Desktop Sidebar */}
            <CandidateSidebar />

            <div className="md:pl-64 flex flex-col min-h-screen transition-all duration-300 ease-in-out">
                {/* Header */}
                <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 w-72">
                                <CandidateSidebar />
                            </SheetContent>
                        </Sheet>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 hidden md:block">Eligible Jobs</h1>
                        <span className="md:hidden font-semibold text-slate-900 dark:text-slate-100">Eligible Jobs</span>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                            {filteredJobs.length} Jobs
                        </Badge>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                            <Bell className="w-5 h-5" />
                        </Button>
                        <Avatar className="h-9 w-9 md:hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                            <AvatarImage src="/avatar.jpg" alt="User Avatar" className="object-cover" />
                            <AvatarFallback className="text-slate-700 dark:text-slate-300">JD</AvatarFallback>
                        </Avatar>
                    </div>
                </header>

                <main className="flex-1 p-6 max-w-6xl mx-auto w-full space-y-6">

                    <Tabs defaultValue="all" className="w-full">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <TabsList className="bg-transparent p-0 h-auto justify-start border-b border-transparent w-full md:w-auto">
                                <TabsTrigger
                                    value="all"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2 font-medium text-slate-500 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100 transition-none"
                                >
                                    All Jobs ({filteredJobs.length})
                                </TabsTrigger>
                                <TabsTrigger
                                    value="recommended"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2 font-medium text-slate-500 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100 transition-none"
                                >
                                    Recommended ({filteredJobs.filter(j => j.matchScore >= 90).length})
                                </TabsTrigger>
                                <TabsTrigger
                                    value="saved"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2 font-medium text-slate-500 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100 transition-none"
                                >
                                    Saved Jobs ({savedJobIds.size})
                                </TabsTrigger>
                            </TabsList>

                            <div className="flex items-center gap-2 text-sm">
                                {(newUnreadCount > 0 || oldUnreadCount > 0) && (
                                    <>
                                        <span className="text-brand-emerald dark:text-emerald-400 font-bold">
                                            {newUnreadCount} new not read jobs / {oldUnreadCount} old not read jobs
                                        </span>
                                        <span className="text-slate-400 dark:text-slate-600 px-1">|</span>
                                        <button
                                            onClick={handleMarkAllRead}
                                            className="text-brand-emerald dark:text-emerald-400 font-bold hover:underline cursor-pointer"
                                        >
                                            Mark all as read
                                        </button>
                                    </>
                                )}
                                {newUnreadCount === 0 && oldUnreadCount === 0 && (
                                    <span className="text-slate-400 font-medium">All caught up ✓</span>
                                )}
                            </div>
                        </div>

                        {/* Search & Filters */}
                        <div className="space-y-4 mb-8">
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        placeholder="Type a skill you are searching for... (e.g. HVAC, MRI, Electrical)"
                                        className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                <Button variant="outline" className="gap-2 bg-white dark:bg-slate-800" onClick={cycleSortBy}>
                                    Sort: {sortLabel}
                                </Button>
                            </div>

                            {specializations.length > 0 && (
                                <div className="bg-brand-pale/30 dark:bg-brand-emerald/5 p-3 rounded-lg flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 border border-brand-emerald/10">
                                    <span className="font-bold mr-2 text-brand-emerald">Specializations:</span>
                                    {specializations.map(spec => (
                                        <Badge key={spec} variant="secondary" className="bg-white dark:bg-slate-700 shadow-sm gap-1 hover:bg-slate-50 border border-slate-200">
                                            {spec} <X className="w-3 h-3 cursor-pointer text-slate-400 hover:text-red-500" onClick={() => handleRemoveSpecialization(spec)} />
                                        </Badge>
                                    ))}
                                    <button onClick={handleClearSpecializations} className="text-brand-emerald font-bold cursor-pointer hover:underline text-xs ml-auto">
                                        Clear All
                                    </button>
                                </div>
                            )}
                        </div>

                        <TabsContent value="all" className="space-y-4">
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map(job => (
                                    <JobListItem
                                        key={job.id}
                                        title={job.title}
                                        type={job.type}
                                        rate={job.rate}
                                        location={job.location}
                                        postedAt={job.postedAt}
                                        description={job.description}
                                        skills={job.skills}
                                        isNew={job.isNew && !readJobIds.has(job.id)}
                                        overlap={job.overlap}
                                        timezone={job.timezone}
                                        isSaved={savedJobIds.has(job.id)}
                                        onSave={() => toggleBookmark(job.id)}
                                        onClick={() => handleJobClick(job)}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-16 text-slate-400">
                                    <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                                    <p className="text-lg font-medium">No jobs match &ldquo;{searchQuery}&rdquo;</p>
                                    <p className="text-sm mt-1">Try a different search term or clear your filters.</p>
                                    <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                                        Clear Search
                                    </Button>
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent value="recommended" className="space-y-4">
                            {filteredJobs.filter(j => j.matchScore >= 90).length > 0 ? (
                                filteredJobs.filter(j => j.matchScore >= 90).map(job => (
                                    <JobListItem
                                        key={job.id}
                                        title={job.title}
                                        type={job.type}
                                        rate={job.rate}
                                        location={job.location}
                                        postedAt={job.postedAt}
                                        description={job.description}
                                        skills={job.skills}
                                        isNew={job.isNew && !readJobIds.has(job.id)}
                                        overlap={job.overlap}
                                        timezone={job.timezone}
                                        isSaved={savedJobIds.has(job.id)}
                                        onSave={() => toggleBookmark(job.id)}
                                        onClick={() => handleJobClick(job)}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-16 text-slate-400">
                                    <p className="text-lg font-medium">No recommended jobs found</p>
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent value="saved" className="space-y-4">
                            {savedJobs.length > 0 ? (
                                savedJobs.map(job => (
                                    <JobListItem
                                        key={job.id}
                                        title={job.title}
                                        type={job.type}
                                        rate={job.rate}
                                        location={job.location}
                                        postedAt={job.postedAt}
                                        description={job.description}
                                        skills={job.skills}
                                        isNew={job.isNew && !readJobIds.has(job.id)}
                                        overlap={job.overlap}
                                        timezone={job.timezone}
                                        isSaved={savedJobIds.has(job.id)}
                                        onSave={() => toggleBookmark(job.id)}
                                        onClick={() => handleJobClick(job)}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-16 text-slate-400">
                                    <Bookmark className="w-12 h-12 mx-auto mb-4 opacity-30" />
                                    <p className="text-lg font-medium">No saved jobs yet</p>
                                    <p className="text-sm mt-1">Bookmark jobs to save them for later.</p>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </main>
            </div>

            <JobDetailsSheet
                open={!!selectedJob}
                onOpenChange={(open) => !open && setSelectedJob(null)}
                job={selectedJob}
                onApply={() => setIsApplied(true)}
                isApplied={isApplied}
            />
        </div>
    );
}
