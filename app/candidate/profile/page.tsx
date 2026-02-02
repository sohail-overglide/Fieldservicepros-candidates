"use client";

import { AiSparkleBadge } from "@/components/ai-sparkle-badge";
import { EditableField } from "@/components/editable-field";
import { Button } from "@/components/ui/button";
import { BadgeCheck, MapPin, Briefcase, GraduationCap, Menu, Search, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CandidateSidebar } from "@/components/candidate-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileScoreBanner } from "@/components/profile-score-banner";
import { AvailabilityStatus } from "@/components/availability-status";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative">
            {/* Lilac Gradient Background */}
            <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-purple-100/60 to-transparent pointer-events-none dark:from-purple-900/10" />

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
                        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 hidden md:block">My Profile</h1>
                        <span className="md:hidden font-semibold text-slate-900 dark:text-slate-100">Profile</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <AvailabilityStatus className="hidden md:flex" />
                        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                            <Bell className="w-5 h-5" />
                        </Button>
                        <Avatar className="h-9 w-9 md:hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                            <AvatarImage src="/avatar.jpg" alt="User Avatar" className="object-cover" />
                            <AvatarFallback className="text-slate-700 dark:text-slate-300">JD</AvatarFallback>
                        </Avatar>
                    </div>
                </header>

                <main className="flex-1 p-6 max-w-4xl mx-auto w-full space-y-6">
                    {/* Profile Score Banner */}
                    <ProfileScoreBanner />

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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
        </div>
    );
}
