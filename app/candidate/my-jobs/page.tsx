"use client";

import { useState } from "react";
import { JobDetailsSheet } from "@/components/job-details-sheet";
import { JobCard } from "@/components/job-card";
import { CandidateSidebar } from "@/components/candidate-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Search, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MyJobsPage() {
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    const handleJobClick = (job: any) => {
        setSelectedJob(job);
        setSheetOpen(true);
    };

    const appliedJobs = [
        {
            title: "Senior Biomedical Technician",
            company: "Ascension Seton",
            location: "Austin, TX",
            distance: "5 miles",
            payRange: "$36 - $45/hr",
            matchScore: 98,
            tags: ["CBET", "NFPA 99", "Ventilators"]
        },
        {
            title: "Field Service Engineer - Imaging",
            company: "Siemens Healthineers",
            location: "Remote / Austin Region",
            distance: "N/A",
            payRange: "$85k - $110k/yr",
            matchScore: 94,
            tags: ["MRI", "CT", "OEM Training"]
        }
    ];

    const savedJobs = [
        {
            title: "Apprentice Imaging Engineer",
            company: "GE Healthcare",
            location: "Round Rock, TX",
            distance: "12 miles",
            payRange: "$28 - $35/hr",
            matchScore: 92,
            tags: ["X-Ray", "MRI Basics", "Field Travel"]
        }
    ];

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
                        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 hidden md:block">My Jobs</h1>
                        <span className="md:hidden font-semibold text-slate-900 dark:text-slate-100">My Jobs</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                className="h-10 pl-9 pr-4 rounded-full bg-slate-100 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-primary/20 outline-none w-64"
                            />
                        </div>
                        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                        </Button>
                        <Avatar className="h-9 w-9 md:hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                            <AvatarImage src="/avatar.jpg" alt="User Avatar" className="object-cover" />
                            <AvatarFallback className="text-slate-700 dark:text-slate-300">JD</AvatarFallback>
                        </Avatar>
                    </div>
                </header>

                <main className="flex-1 p-6 max-w-5xl mx-auto w-full space-y-8">
                    <Tabs defaultValue="applied" className="w-full">
                        <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-8">
                            <TabsTrigger value="applied">Applied ({appliedJobs.length})</TabsTrigger>
                            <TabsTrigger value="saved">Saved ({savedJobs.length})</TabsTrigger>
                        </TabsList>

                        <TabsContent value="applied" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                {appliedJobs.map((job, index) => (
                                    <JobCard
                                        key={index}
                                        {...job}
                                        onClick={() => handleJobClick(job)}
                                        isApplied
                                    />
                                ))}
                            </div>
                            {appliedJobs.length === 0 && (
                                <div className="text-center py-20 text-slate-500">
                                    No applications yet. Start exploring jobs!
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="saved" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                {savedJobs.map((job, index) => (
                                    <JobCard
                                        key={index}
                                        {...job}
                                        onClick={() => handleJobClick(job)}
                                    />
                                ))}
                            </div>
                            {savedJobs.length === 0 && (
                                <div className="text-center py-20 text-slate-500">
                                    No saved jobs yet.
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </main>

                <JobDetailsSheet
                    job={selectedJob}
                    open={sheetOpen}
                    onOpenChange={setSheetOpen}
                    isApplied={appliedJobs.some(job => job.title === selectedJob?.title)}
                    onApply={() => {
                        setSheetOpen(false);
                        // Connect apply logic later
                    }}
                />
            </div>
        </div>
    );
}
