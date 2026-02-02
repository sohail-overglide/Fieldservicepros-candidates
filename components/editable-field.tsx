"use client";

import { useState, useRef, useEffect } from "react";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditableFieldProps {
    initialValue: string;
    label: string;
    multiline?: boolean;
}

export function EditableField({ initialValue, label, multiline = false }: EditableFieldProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !multiline) {
            setIsEditing(false);
        }
    };

    if (isEditing) {
        return (
            <div className="space-y-1">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</label>
                {multiline ? (
                    <Textarea
                        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={handleBlur}
                        className="min-h-[100px] text-base"
                    />
                ) : (
                    <Input
                        ref={inputRef as React.RefObject<HTMLInputElement>}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        className="h-10 text-base"
                    />
                )}
            </div>
        );
    }

    return (
        <div
            onClick={() => setIsEditing(true)}
            className="group cursor-pointer space-y-1 p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
            <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</label>
                <Pencil className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className={`text-base text-slate-900 dark:text-slate-100 ${multiline ? 'whitespace-pre-wrap' : ''}`}>
                {value}
            </p>
        </div>
    );
}
