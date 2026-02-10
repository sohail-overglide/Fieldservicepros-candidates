"use client";

import { useState } from "react";
import { AiSparkleBadge } from "@/components/ai-sparkle-badge";
import { EditableField } from "@/components/editable-field";
import { Button } from "@/components/ui/button";
import { SkipButton } from "@/components/skip-button";
import { ArrowRight, BadgeCheck, MapPin, Briefcase, GraduationCap, Sparkles, Plus, History, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { AiResume } from "@/components/ai-resume";

const INITIAL_DATA = {
    name: "John Doe",
    title: "Senior Biomedical Technician",
    location: "Austin, TX",
    experience_years: "7 Years",
    email: "john.doe@example.com",
    phone: "(512) 555-0123",
    summary: "Certified BMET with 7 years of experience maintaining critical care equipment. Specialized in patient monitoring systems and diagnostic imaging support. Passionate about healthcare technology and patient safety.",
    experience: [
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
    ],
    education: [
        { degree: "B.S. in Biomedical Engineering Technology", school: "University of Texas", year: "2017" }
    ],
    skills: ["Patient Monitoring", "Defibrillators", "Infusion Pumps", "Ventilators", "Preventive Maintenance", "Troubleshooting"]
};

const ENHANCED_DATA = {
    ...INITIAL_DATA,
    title: "Lead Biomedical Systems Engineer",
    summary: "Strategic Biomedical Systems Engineer with 7+ years of expertise in optimizing healthcare technology lifecycles. Expert in high-acuity clinical environments, specializing in advanced life-support systems (Ventilators, ECMO, Dialysis). Proven track record in reducing operational costs while ensuring 100% regulatory compliance and patient safety standards.",
    experience: [
        {
            ...INITIAL_DATA.experience[0],
            role: "Lead Biomedical Engineering Specialist",
            description: "Spearheaded technical operations for ICU/Surgical fleets. Optimized preventive maintenance (PM) workflows using data-driven analytics, achieving a 99.8% uptime rate. Mentored junior technicians and improved department-wide equipment troubleshooting efficiency by 25%."
        },
        {
            ...INITIAL_DATA.experience[1],
            description: "Provided high-level technical support for mission-critical medical instrumentation. Successfully managed a facility-wide infusion pump upgrade project, ensuring zero clinical disruptions during the transition."
        }
    ],
    skills: ["Clinical Engineering", "Advanced Life Support Systems", "Predictive Analytics", "Workflow Optimization", "Regulatory Compliance (JCAHO/AAMI)", "Medical Device Networking"]
};

export default function ReviewPage() {
    const [isEnhanced, setIsEnhanced] = useState(false);
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [data, setData] = useState(INITIAL_DATA);

    const handleEnhance = () => {
        setIsEnhancing(true);
        setTimeout(() => {
            setIsEnhanced(true);
            setData(ENHANCED_DATA);
            setIsEnhancing(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col h-screen overflow-hidden">
            {/* Header */}
            <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-8 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <History className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 italic tracking-tight">Profile Review</h1>
                        <p className="text-xs text-slate-500 font-medium">Step 2 of 4 • Refine your details</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                    <div className="hidden sm:block">
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{data.name}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Candidate #82103</p>
                    </div>
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 bg-slate-100 shrink-0">
                        <img src="/avatar.jpg" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                </div>
            </header>

            {/* Split Screen Container */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Side: AI Enhanced Resume */}
                <div className="hidden lg:flex flex-1 bg-slate-100 dark:bg-slate-950/50 p-12 items-center justify-center overflow-hidden">
                    <div className="w-full max-w-3xl h-full">
                        <AiResume data={data} isEnhancing={isEnhancing} />
                    </div>
                </div>

                {/* Right Side: Editable Sections */}
                <main className="w-full lg:w-[600px] xl:w-[700px] border-l border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-y-auto custom-scrollbar">
                    <div className="p-8 space-y-10 pb-32">
                        {/* Enhance Action Bar */}
                        <div className="p-6 rounded-2xl bg-brand-emerald text-white relative overflow-hidden group shadow-xl">
                            <div className="absolute top-0 right-0 p-8 transform translate-x-4 -translate-y-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <BrainCircuit className="w-32 h-32 text-brand-lime" />
                            </div>
                            <div className="relative z-10 space-y-4">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-brand-lime" />
                                        Optimize with AI
                                    </h3>
                                    <p className="text-sm text-emerald-50/80">
                                        Professionalize your bio and experience for better matches.
                                    </p>
                                </div>
                                <Button
                                    onClick={handleEnhance}
                                    disabled={isEnhanced || isEnhancing}
                                    className={`w-full ${isEnhanced ? 'bg-emerald-800' : 'bg-brand-lime hover:bg-lime-400 text-white font-black'} h-12 text-sm uppercase tracking-wider transition-all duration-500`}
                                >
                                    {isEnhancing ? "Processing..." : isEnhanced ? "Profile Optimized ✓" : "Enhance Profile"}
                                </Button>
                            </div>
                        </div>

                        {/* Identity */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                    <BadgeCheck className="w-4 h-4 text-brand-emerald" />
                                    Identity
                                </h2>
                                {isEnhanced && <AiSparkleBadge label="Enhanced" />}
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <EditableField label="Full Name" initialValue={data.name} />
                                <EditableField label="Job Title" initialValue={data.title} />
                                <EditableField label="Experience" initialValue={data.experience_years} />
                                <div className="space-y-1 px-2 -ml-2 rounded-lg">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</label>
                                    <div className="flex items-center gap-1.5 text-slate-900 dark:text-slate-100 font-medium py-1">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                        <span>{data.location}</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Professional Summary */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-brand-emerald" />
                                    Professional Summary
                                </h2>
                            </div>
                            <EditableField
                                label="Summary Bio"
                                initialValue={data.summary}
                                multiline
                            />
                        </section>

                        {/* Detailed Experience */}
                        <section className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                    <History className="w-4 h-4 text-brand-emerald" />
                                    Work Experience
                                </h2>
                                <button className="text-xs font-bold text-brand-emerald flex items-center gap-1 hover:underline">
                                    <Plus className="w-3.5 h-3.5" />
                                    Add Position
                                </button>
                            </div>

                            <div className="space-y-8 pl-4 border-l-2 border-brand-pale/30">
                                {data.experience.map((exp, idx) => (
                                    <div key={idx} className="relative group space-y-4">
                                        <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-4 border-brand-emerald shadow-sm" />
                                        <div className="grid grid-cols-2 gap-6">
                                            <EditableField label="Role" initialValue={exp.role} />
                                            <EditableField label="Company" initialValue={exp.company} />
                                            <EditableField label="Dates" initialValue={exp.dates} />
                                        </div>
                                        <EditableField label="Description" initialValue={exp.description} multiline />
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Skills */}
                        <section className="space-y-4">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                <GraduationCap className="w-4 h-4 text-brand-emerald" />
                                Extracted Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-brand-pale/30 dark:bg-brand-emerald/10 text-brand-emerald border-none hover:bg-brand-pale/50 transition-colors">
                                        {skill}
                                    </Badge>
                                ))}
                                <Button variant="outline" size="sm" className="rounded-full border-dashed border-brand-emerald/30 text-brand-emerald text-xs font-bold">
                                    + Add Skill
                                </Button>
                            </div>
                        </section>
                    </div>
                </main>
            </div>

            {/* Bottom Bar */}
            <footer className="fixed bottom-0 left-0 lg:left-[calc(50%+200px)] lg:w-[calc(50%-200px)] xl:left-[calc(100%-700px)] xl:w-[700px] right-0 p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-50 flex items-center justify-between gap-6 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <SkipButton />
                <Button size="lg" className="flex-1 max-w-[300px] h-14 text-base font-bold shadow-2xl shadow-primary/20 rounded-xl" asChild>
                    <Link href="/candidate/verify">
                        Verify & Continue <ArrowRight className="ml-2 w-5 h-5 opacity-90" />
                    </Link>
                </Button>
            </footer>
        </div>
    );
}
