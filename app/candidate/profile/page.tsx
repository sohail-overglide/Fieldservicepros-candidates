"use client";

import { AiSparkleBadge } from "@/components/ai-sparkle-badge";
import { EditableField } from "@/components/editable-field";
import { Button } from "@/components/ui/button";
import { BadgeCheck, MapPin, Briefcase, GraduationCap, Menu, Bell, Mail, Phone, Building2, Calendar, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CandidateSidebar } from "@/components/candidate-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileScoreBanner } from "@/components/profile-score-banner";
import { AvailabilityStatus } from "@/components/availability-status";

const experienceData = [
    {
        role: "Senior Biomedical Technician",
        company: "Austin Health Systems",
        dates: "2020 - Present",
        description: "Lead technician for the ICU and Surgical departments. Manage PM schedules for over 500 critical assets. Reduced equipment downtime by 15% through predictive maintenance."
    },
    {
        role: "Biomedical Equipment Technician II",
        company: "St. Jude Hospital",
        dates: "2017 - 2020",
        description: "Performed repairs and safety testing on various medical devices. Specialized in infusion pumps and ventilators."
    }
];

const educationData = [
    { degree: "B.S. in Biomedical Engineering Technology", school: "University of Texas", year: "2017" }
];

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative">
            {/* Brand Gradient Background */}
            <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-brand-pale/40 to-transparent pointer-events-none dark:from-brand-emerald/10" />

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

                <main className="flex-1 p-6 max-w-4xl mx-auto w-full space-y-6 pb-12">
                    {/* Profile Score Banner */}
                    <ProfileScoreBanner />

                    {/* Basic Info */}
                    <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <BadgeCheck className="w-5 h-5 text-brand-emerald" />
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-700">
                            <div className="space-y-1 p-2 -ml-2">
                                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</label>
                                <div className="flex items-center gap-1.5 text-slate-900 dark:text-slate-100">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    <span>john.doe@example.com</span>
                                </div>
                            </div>
                            <div className="space-y-1 p-2 -ml-2">
                                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Phone</label>
                                <div className="flex items-center gap-1.5 text-slate-900 dark:text-slate-100">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    <span>(512) 555-0123</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Professional Summary */}
                    <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-brand-emerald" />
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

                    {/* Experience */}
                    <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-brand-emerald" />
                                Experience
                            </h2>
                            <AiSparkleBadge label="Verified" />
                        </div>

                        <div className="space-y-5">
                            {experienceData.map((exp, idx) => (
                                <div key={idx} className="relative pl-5 border-l-2 border-brand-pale dark:border-brand-emerald/20 space-y-1.5">
                                    <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-brand-emerald border-2 border-white dark:border-slate-800" />
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                        <h3 className="font-bold text-slate-900 dark:text-slate-100">{exp.role}</h3>
                                        <span className="text-xs font-semibold px-2.5 py-1 bg-brand-pale/20 dark:bg-brand-emerald/10 rounded-full text-brand-emerald w-fit">
                                            {exp.dates}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium text-brand-grey dark:text-slate-400 flex items-center gap-1.5">
                                        <Building2 className="w-3.5 h-3.5" />
                                        {exp.company}
                                    </p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <button className="w-full py-2.5 text-sm font-bold text-brand-emerald border border-dashed border-brand-emerald/30 rounded-xl hover:bg-brand-emerald/5 transition-colors">
                            + Add Experience
                        </button>
                    </section>

                    {/* Education */}
                    <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-brand-emerald" />
                                Education
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {educationData.map((edu, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700">
                                    <div className="w-10 h-10 rounded-xl bg-brand-pale/20 dark:bg-brand-emerald/10 flex items-center justify-center shrink-0">
                                        <BookOpen className="w-5 h-5 text-brand-emerald" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <h3 className="font-bold text-slate-900 dark:text-slate-100">{edu.degree}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{edu.school}</p>
                                        <p className="text-xs font-semibold text-brand-emerald flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {edu.year}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full py-2.5 text-sm font-bold text-brand-emerald border border-dashed border-brand-emerald/30 rounded-xl hover:bg-brand-emerald/5 transition-colors">
                            + Add Education
                        </button>
                    </section>

                    {/* Skills */}
                    <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-brand-emerald" />
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
                            <button className="px-3 py-1.5 text-sm font-bold text-brand-emerald border border-dashed border-brand-emerald/30 rounded-full hover:bg-brand-emerald/5 transition-colors">
                                + Add Skill
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
