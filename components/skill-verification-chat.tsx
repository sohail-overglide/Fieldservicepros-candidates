"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, ArrowRight } from "lucide-react";
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

    // Auto-advance to first question after intro
    useEffect(() => {
        if (messages.length === 1) {
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
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-32">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""
                            }`}
                    >
                        <Avatar className="w-8 h-8 mt-1">
                            {msg.role === "bot" ? (
                                <div className="bg-primary h-full w-full flex items-center justify-center text-white">
                                    <Bot className="w-5 h-5" />
                                </div>
                            ) : (
                                <AvatarFallback className="bg-slate-200 dark:bg-slate-700">JD</AvatarFallback>
                            )}
                        </Avatar>
                        <div
                            className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm ${msg.role === "user"
                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-none"
                                }`}
                        >
                            {msg.text}
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3"
                    >
                        <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center text-white mt-1">
                            <Bot className="w-5 h-5" />
                        </div>
                        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 rounded-2xl rounded-tl-none flex items-center gap-1.5 h-[52px]">
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                        </div>
                    </motion.div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
                <AnimatePresence mode="wait">
                    {!isComplete ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="grid grid-cols-2 gap-4 max-w-md mx-auto"
                        >
                            <Button
                                size="lg"
                                disabled={isTyping}
                                onClick={() => handleResponse("No")}
                                className="h-14 text-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm"
                            >
                                No
                            </Button>
                            <Button
                                size="lg"
                                disabled={isTyping}
                                onClick={() => handleResponse("Yes")}
                                className="h-14 text-lg shadow-primary/20 shadow-lg"
                            >
                                Yes
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-md mx-auto"
                        >
                            <Button size="lg" className="w-full h-14 text-lg font-semibold bg-green-600 hover:bg-green-700" asChild>
                                <Link href="/candidate/video-intro">
                                    Continue <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
