"use client";

import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export function ResumeUploader() {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (selectedFile: File) => {
        setFile(selectedFile);
        simulateUpload();
    };

    const simulateUpload = () => {
        setUploading(true);
        setProgress(0);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        // Mock success transition
                        router.push("/candidate/review"); // Assuming step 2 is here
                    }, 500);
                    return 100;
                }
                return prev + 2; // Slower increment for 3s-ish feel
            });
        }, 40); // 40ms * 50 steps = 2000ms + overhead approx 3s
    };

    const clearFile = () => {
        setFile(null);
        setUploading(false);
        setProgress(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <AnimatePresence mode="wait">
                {!file ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`
              relative border-2 border-dashed rounded-3xl p-8 text-center transition-colors cursor-pointer
              ${isDragging
                                ? "border-primary bg-primary/5"
                                : "border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                            }
            `}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileSelect}
                        />
                        <div className="w-16 h-16 bg-brand-pale dark:bg-brand-emerald/20 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-emerald shadow-sm">
                            <Upload className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                            Upload Resume
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 px-4 leading-relaxed">
                            Drop your resume here or tap to browse. We&apos;ll extract your skills automatically.
                        </p>
                        <Button variant="outline" className="w-full h-12 rounded-xl text-base">
                            Select PDF or DOCX
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border border-slate-100 dark:border-slate-700"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-brand-pale dark:bg-brand-emerald/20 rounded-2xl flex items-center justify-center text-brand-emerald shadow-sm">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-slate-900 dark:text-slate-100 truncate max-w-[180px]">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={clearFile}
                                disabled={uploading && progress < 100}
                                className="text-slate-400 hover:text-red-500"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-slate-700 dark:text-slate-300">
                                    {progress < 100 ? "AI Analyzing Skills..." : "Analysis Complete"}
                                </span>
                                <span className="text-primary">{Math.round(progress)}%</span>
                            </div>
                            <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ ease: "linear", duration: 0.2 }}
                                />
                            </div>
                        </div>

                        {progress >= 100 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 flex items-center gap-2 text-brand-emerald dark:text-emerald-400 text-sm font-bold tracking-tight justify-center bg-brand-pale/20 dark:bg-brand-emerald/10 py-3 rounded-xl border border-brand-emerald/10"
                            >
                                <CheckCircle2 className="w-5 h-5" />
                                <span>Optimization Complete. Redirecting...</span>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
