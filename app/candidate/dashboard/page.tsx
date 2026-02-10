"use client";

import { useState } from "react";
import { JobDetailsSheet } from "@/components/job-details-sheet";
import { JobCard } from "@/components/job-card";
import { CandidateSidebar } from "@/components/candidate-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Search, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AvailabilityStatus } from "@/components/availability-status";

export default function DashboardPage() {
    const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    const handleJobClick = (job: typeof jobs[0]) => {
        setSelectedJob(job);
        setSheetOpen(true);
    };

    const jobs = [
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
            title: "Apprentice Imaging Engineer",
            company: "GE Healthcare",
            location: "Round Rock, TX",
            distance: "12 miles",
            payRange: "$28 - $35/hr",
            matchScore: 92,
            tags: ["X-Ray", "MRI Basics", "Field Travel"]
        },
        {
            title: "Sterilization Tech II",
            company: "St. David's Medical",
            location: "Downtown Austin",
            distance: "8 miles",
            payRange: "$30 - $38/hr",
            matchScore: 89,
            tags: ["Autoclaves", "Steris", "Night Shift"]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative">
            {/* Brand Gradient Background */}
            <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-brand-pale/50 via-brand-pale/5 to-transparent pointer-events-none dark:from-brand-emerald/10" />

            {/* Desktop Sidebar */}
            <CandidateSidebar />

            {/* Main Content Area */}
            <div className="md:pl-64 flex flex-col min-h-screen transition-all duration-300">

                {/* Header */}
                <header className="sticky top-0 z-20 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between">
                    {/* Mobile Menu Trigger */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="-ml-3">
                                    <Menu className="w-6 h-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 w-64">
                                <CandidateSidebar />
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div className="flex items-center gap-4 text-sm font-bold text-brand-grey dark:text-slate-400">
                        <span className="hidden md:inline-block">/ Dashboard</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Credits removed as platform is free for candidates */}

                        <Button variant="ghost" size="icon" className="text-slate-500 rounded-full relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
                        </Button>

                        <Avatar className="h-9 w-9 md:hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                            <AvatarImage src="/avatar.jpg" alt="User Avatar" className="object-cover" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    </div>
                </header>

                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">

                    {/* Hero / Welcome */}
                    <section className="text-center py-10 md:py-16 space-y-4">
                        <div className="flex justify-center mb-4">
                            <AvailabilityStatus />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                            Find Your Next Role
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                            Search for jobs matching your verified skills and experience.
                        </p>

                        <div className="max-w-xl mx-auto mt-8 relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                <Search className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for roles (e.g. 'HVAC Technician in Austin')..."
                                className="w-full h-12 pl-11 pr-4 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm focus:ring-2 focus:ring-brand-emerald/20 focus:border-brand-emerald outline-none transition-all text-sm"
                            />
                            <Button
                                className="absolute right-1.5 top-1.5 h-9 rounded-full px-6 bg-[#019446] hover:bg-[#019446]/90 text-white border-none z-20 shadow-sm"
                            >
                                Search
                            </Button>
                        </div>
                    </section>

                    {/* Stats Row */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: "Profile Score", value: "85%", sub: "High visibility" },
                            { label: "Profile Views", value: "24", sub: "+8 this week" },
                            { label: "Applications", value: "3", sub: "Active now" },
                            { label: "Interview Req", value: "1", sub: "Action needed" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-shadow">
                                <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">{stat.label}</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</span>
                                    <span className="text-xs text-brand-emerald bg-brand-pale/20 dark:bg-brand-emerald/10 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-brand-emerald/5">
                                        {stat.sub}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Job Feed */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Recommended for You</h2>
                            <Button variant="ghost" size="sm" className="text-brand-emerald font-bold hover:text-emerald-700 hover:bg-brand-pale/20 transition-all">View All</Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 pb-20 md:pb-0">
                            {jobs.map((job, index) => (
                                <JobCard
                                    key={index}
                                    {...job}
                                    onClick={() => handleJobClick(job)}
                                />
                            ))}
                        </div>
                    </section>
                </main>

                <JobDetailsSheet
                    job={selectedJob}
                    open={sheetOpen}
                    onOpenChange={setSheetOpen}
                    onApply={() => {
                        setSheetOpen(false);
                        // Open OneClickApplyDrawer (this logic needs to be connected, for now closing sheet)
                    }}
                />
            </div>

            {/* Mobile Bottom Nav (Visible only on small screens) */}
            <div className="md:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 h-16 flex items-center justify-around px-6 pb-2 safe-area-pb z-20">
                <div className="flex flex-col items-center gap-1 text-primary">
                    <Search className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Jobs</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-slate-400">
                    <div className="w-6 h-6 rounded-full border-2 border-slate-300 dark:border-slate-600"></div>
                    <span className="text-[10px] font-medium">Apps</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-slate-400">
                    <div className="w-6 h-6 rounded-full border-2 border-slate-300 dark:border-slate-600"></div>
                    <span className="text-[10px] font-medium">Profile</span>
                </div>
            </div>
        </div>
    );
}
