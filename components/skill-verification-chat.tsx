"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

type Message = {
    id: string;
    role: "bot" | "user";
    text: string;
};

const questions = [
    {
        id: "cbet",
        text: "I see you worked at Ascension. Do you have your CBET certification?",
    },
    {
        id: "monitoring",
        text: "Great! Do you have experience troubleshooting Philips or GE patient monitoring systems?",
    },
    {
        id: "imaging",
        text: "Last one: Have you ever performed PMs on X-Ray or MRI equipment?",
    },
];

export function SkillVerificationChat() {
    const [messages, setMessages] = useState<Message[]>([
        { id: "intro", role: "bot", text: "Hi John! I just need to verify a few quick details to match you with the best jobs." },
    ]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    const addMessage = (role: "bot" | "user", text: string) => {
        setMessages((prev) => [
            ...prev,
            { id: Math.random().toString(36).substring(7), role, text },
        ]);
    };

    const hasStartedRef = useRef(false);

    // Auto-advance to first question after intro
    useEffect(() => {
        if (messages.length === 1 && !hasStartedRef.current) {
            hasStartedRef.current = true;
            setTimeout(() => {
                setIsTyping(true);
                setTimeout(() => {
                    setIsTyping(false);
                    addMessage("bot", questions[0].text);
                }, 1500);
            }, 1000);
        }
    }, [messages]);

    // Scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleResponse = (answer: "Yes" | "No") => {
        addMessage("user", answer);
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const nextIndex = currentQuestionIndex + 1;

            if (nextIndex < questions.length) {
                setCurrentQuestionIndex(nextIndex);
                addMessage("bot", questions[nextIndex].text);
            } else {
                setIsComplete(true);
                addMessage("bot", "Perfect! That's all I need. You're all set to record your video pitch.");
            }
        }, 1200);
    };

    return (
        <div className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-950/50">
            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-40 custom-scrollbar">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className={`flex items-start gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-1 shadow-md ${msg.role === "bot"
                            ? "bg-gradient-to-br from-brand-emerald to-brand-lime text-white"
                            : "bg-brand-grey text-white"
                            }`}>
                            {msg.role === "bot" ? <Sparkles className="w-5 h-5" /> : <span className="text-xs font-bold uppercase">JD</span>}
                        </div>
                        <div
                            className={`p-4 px-5 rounded-2xl max-w-[85%] text-[15px] leading-relaxed shadow-sm transition-all ${msg.role === "user"
                                ? "bg-primary text-white rounded-tr-none"
                                : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-none font-medium"
                                }`}
                        >
                            {msg.text}
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-start gap-4"
                    >
                        <div className="bg-gradient-to-br from-brand-emerald to-brand-lime h-10 w-10 rounded-2xl flex items-center justify-center text-white mt-1 shadow-md">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 px-5 rounded-2xl rounded-tl-none flex items-center gap-1.5 h-[52px] shadow-sm">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                        </div>
                    </motion.div>
                )}
                <div ref={bottomRef} className="h-4" />
            </div>

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 p-8 pt-10 bg-gradient-to-t from-white via-white/100 to-transparent dark:from-slate-900 dark:via-slate-900/100 dark:to-transparent z-40">
                <AnimatePresence mode="wait">
                    {!isComplete ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <Button
                                size="lg"
                                disabled={isTyping}
                                onClick={() => handleResponse("No")}
                                className="h-14 text-base font-bold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 border-none shadow-none rounded-2xl transition-all"
                            >
                                No
                            </Button>
                            <Button
                                size="lg"
                                disabled={isTyping}
                                onClick={() => handleResponse("Yes")}
                                className="h-14 text-base font-bold shadow-xl shadow-primary/25 rounded-2xl transition-all active:scale-95"
                            >
                                Yes
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-md mx-auto"
                        >
                            <Button size="lg" className="w-full h-16 text-lg font-bold bg-brand-emerald hover:bg-emerald-700 shadow-2xl shadow-brand-emerald/20 rounded-2xl group transition-all" asChild>
                                <Link href="/candidate/video-intro">
                                    Start Video Pitch <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
