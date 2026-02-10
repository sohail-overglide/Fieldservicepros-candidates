"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { CheckCircle2, Send } from "lucide-react";
import confetti from "canvas-confetti";

interface OneClickApplyDrawerProps {
    jobTitle: string;
    companyName: string;
    matchScore: number;
    triggerText?: string;
}

export function OneClickApplyDrawer({ jobTitle, companyName, matchScore, triggerText = "Quick Apply" }: OneClickApplyDrawerProps) {
    const [applied, setApplied] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleApply = () => {
        // Confetti explosion
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.8 },
            colors: ['#019446', '#90C13E', '#CBE5BF', '#ffffff'] // Brand theme
        });

        setApplied(true);

        // Close drawer after delay? Or keep open to show success?
        // Let's keep open to show success state in drawer
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open && applied) {
            // Reset if needed, or keep applied state for session?
            // For prototype, keeping it 'Applied' makes sense visually on the card? 
            // But here we are inside the drawer trigger... 
        }
    };

    if (applied && !isOpen) {
        return (
            <Button variant="outline" disabled className="w-full bg-brand-pale/30 text-brand-emerald border-brand-emerald/10 font-bold">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Applied
            </Button>
        )
    }

    return (
        <Drawer open={isOpen} onOpenChange={handleOpenChange}>
            <DrawerTrigger asChild>
                {applied ? (
                    <Button variant="outline" disabled className="w-full bg-brand-pale/30 text-brand-emerald border-brand-emerald/10 font-bold">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Applied
                    </Button>
                ) : (
                    <Button className="w-full mt-4 bg-brand-emerald hover:bg-emerald-700 text-white border-none shadow-lg shadow-brand-emerald/10" onClick={(e) => e.stopPropagation()}>
                        {triggerText}
                    </Button>
                )}
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    {!applied ? (
                        <>
                            <DrawerHeader>
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 rounded-full bg-brand-pale flex items-center justify-center text-brand-emerald text-2xl font-bold border border-brand-emerald/10">
                                        {companyName.charAt(0)}
                                    </div>
                                </div>
                                <DrawerTitle className="text-center text-2xl">{jobTitle}</DrawerTitle>
                                <DrawerDescription className="text-center">
                                    at {companyName} • {matchScore}% Match
                                </DrawerDescription>
                            </DrawerHeader>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl mx-4 mb-4 space-y-3">
                                <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">Sending Profile:</h4>
                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    <span>Verified Resume</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    <span>EPA 608 Certification</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    <span>Video Intro (30s)</span>
                                </div>
                            </div>
                            <DrawerFooter className="pt-2">
                                <Button size="lg" className="w-full text-lg bg-brand-emerald hover:bg-emerald-700 text-white border-none shadow-xl shadow-brand-emerald/20" onClick={handleApply}>
                                    <Send className="w-5 h-5 mr-2" />
                                    Send Application
                                </Button>
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </>
                    ) : (
                        <>
                            <DrawerHeader>
                                <div className="mx-auto w-16 h-16 bg-brand-pale text-brand-emerald rounded-full flex items-center justify-center mb-4 border border-brand-emerald/10">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <DrawerTitle className="text-center text-2xl text-brand-emerald font-bold">Application Sent!</DrawerTitle>
                                <DrawerDescription className="text-center">
                                    Good luck! {companyName} will review your profile shortly.
                                </DrawerDescription>
                            </DrawerHeader>
                            <div className="p-4 pb-0">
                                <Button className="w-full" onClick={() => setIsOpen(false)}>
                                    Back to Jobs
                                </Button>
                            </div>
                            <div className="p-4 text-center">
                                <p className="text-xs text-slate-400">Application ID: #8293-FSP</p>
                            </div>
                        </>
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
