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
            colors: ['#2563eb', '#93c5fd', '#3b82f6', '#ffffff'] // Blueish theme
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
            <Button variant="outline" disabled className="w-full bg-green-50 text-green-600 border-green-200">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Applied
            </Button>
        )
    }

    return (
        <Drawer open={isOpen} onOpenChange={handleOpenChange}>
            <DrawerTrigger asChild>
                {applied ? (
                    <Button variant="outline" disabled className="w-full bg-green-50 text-green-600 border-green-200">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Applied
                    </Button>
                ) : (
                    <Button className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900" onClick={(e) => e.stopPropagation()}>
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
                                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
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
                                <Button size="lg" className="w-full text-lg shadow-xl shadow-blue-500/20" onClick={handleApply}>
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
                                <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <DrawerTitle className="text-center text-2xl text-green-700">Application Sent!</DrawerTitle>
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
