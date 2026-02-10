"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Award, BookOpen, Briefcase, GraduationCap } from "lucide-react";

interface AiResumeProps {
    data: {
        name: string;
        title: string;
        location: string;
        email: string;
        phone: string;
        summary: string;
        experience: Array<{
            role: string;
            company: string;
            dates: string;
            description: string;
        }>;
        education: Array<{
            degree: string;
            school: string;
            year: string;
        }>;
        skills: string[];
    };
    isEnhancing?: boolean;
}

export function AiResume({ data, isEnhancing }: AiResumeProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 shadow-2xl rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 h-full flex flex-col relative"
        >
            {isEnhancing && (
                <motion.div
                    className="absolute inset-0 bg-primary/5 z-10 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            )}

            {/* Resume Header */}
            <div className="bg-brand-grey dark:bg-brand-grey p-8 text-white">
                <motion.h1
                    className="text-4xl font-bold tracking-tight"
                    animate={isEnhancing ? { opacity: [1, 0.5, 1] } : {}}
                >
                    {data.name}
                </motion.h1>
                <p className="text-xl text-white/90 mt-2 font-medium">{data.title}</p>

                <div className="flex flex-wrap gap-4 mt-6 text-sm text-white/70">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {data.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Mail className="w-4 h-4" />
                        {data.email}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Phone className="w-4 h-4" />
                        {data.phone}
                    </div>
                </div>
            </div>

            {/* Resume Body */}
            <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar flex-1 bg-white dark:bg-slate-900/50">
                {/* Summary */}
                <section className="space-y-3">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-brand-emerald flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Professional Summary
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {data.summary}
                    </p>
                </section>

                {/* Experience */}
                <section className="space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-brand-emerald flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        Experience
                    </h2>
                    <div className="space-y-6">
                        {data.experience.map((exp, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-slate-100">{exp.role}</h3>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{exp.company}</p>
                                    </div>
                                    <span className="text-xs font-semibold px-2 py-1 bg-brand-pale/20 dark:bg-brand-emerald/10 rounded text-brand-emerald">
                                        {exp.dates}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-2 gap-8">
                    {/* Education */}
                    <section className="space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-brand-emerald flex items-center gap-2">
                            <GraduationCap className="w-4 h-4" />
                            Education
                        </h2>
                        <div className="space-y-4">
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="space-y-1">
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{edu.degree}</h3>
                                    <p className="text-xs text-slate-500">{edu.school} • {edu.year}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Skills */}
                    <section className="space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-brand-emerald flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            Core Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, idx) => (
                                <span key={idx} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-brand-pale/30 dark:bg-brand-emerald/20 text-brand-emerald rounded">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* Resume Footer */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-center">
                <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-medium">
                    AI-Enhanced Professional Profile • Field Service Pro
                </p>
            </div>
        </motion.div>
    );
}
