"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const certifications = [
    { value: "cbet", label: "CBET (Certified Biomedical Equipment Technician)" },
    { value: "cres", label: "CRES (Certified Radiology Equipment Specialist)" },
    { value: "cles", label: "CLES (Certified Laboratory Equipment Specialist)" },
    { value: "chtm", label: "CHTM (Certified Healthcare Technology Manager)" },
    { value: "cbne", label: "CBNE (Certified Biomedical Nephrology Technician)" },
];

export function PreferencesForm() {
    const router = useRouter(); // Keeping usage if needed (though Link is used)
    const [travelTolerance, setTravelTolerance] = useState([20]);
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedCerts, setSelectedCerts] = useState<string[]>([]);

    const handleToolToggle = (tool: string) => {
        setSelectedTools((prev) =>
            prev.includes(tool)
                ? prev.filter((t) => t !== tool)
                : [...prev, tool]
        );
    };

    const removeCert = (certToRemove: string) => {
        setSelectedCerts(selectedCerts.filter((c) => c !== certToRemove));
    };

    const getTravelLabel = (val: number) => {
        if (val <= 30) return "Home Every Night";
        if (val <= 70) return "Regional Travel (2-3 nights)";
        return "Road Warrior (Anywhere)";
    };

    return (
        <div className="space-y-10">

            {/* Travel Tolerance */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Travel Tolerance
                </h3>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-6">
                    <div className="flex justify-between items-end">
                        <span className="text-sm font-medium text-slate-500">I prefer to be:</span>
                        <span className="text-primary font-bold">{getTravelLabel(travelTolerance[0])}</span>
                    </div>
                    <Slider
                        defaultValue={[20]}
                        max={100}
                        step={1}
                        value={travelTolerance}
                        onValueChange={setTravelTolerance}
                        className="py-4"
                    />
                    <div className="flex justify-between text-xs text-slate-400">
                        <span>Never</span>
                        <span>Always</span>
                    </div>
                </div>
            </section>

            {/* Tools */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Tools
                </h3>
                <div className="space-y-3">
                    {[
                        "I have my own hand tools",
                        "I have specialty tools (gauges, vacuum pump)",
                        "I need tools provided"
                    ].map((item) => (
                        <div key={item} className="flex items-center space-x-3 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                            <Checkbox id={item} onCheckedChange={() => handleToolToggle(item)} checked={selectedTools.includes(item)} />
                            <label
                                htmlFor={item}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                            >
                                {item}
                            </label>
                        </div>
                    ))}
                </div>
            </section>

            {/* Certifications */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Certifications
                </h3>

                <div className="flex flex-wrap gap-2 mb-3">
                    {selectedCerts.map((certVal) => {
                        const label = certifications.find(c => c.value === certVal)?.label || certVal;
                        return (
                            <Badge key={certVal} variant="secondary" className="pl-3 pr-1 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 border border-blue-200 dark:border-blue-800">
                                {label}
                                <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 rounded-full hover:bg-blue-200/50" onClick={() => removeCert(certVal)}>
                                    <X className="w-3 h-3" />
                                </Button>
                            </Badge>
                        )
                    })}
                </div>

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between h-12 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        >
                            Add certification...
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0" align="start">
                        <Command>
                            <CommandInput placeholder="Search certifications..." />
                            <CommandList>
                                <CommandEmpty>No certification found.</CommandEmpty>
                                <CommandGroup>
                                    {certifications.map((cert) => (
                                        <CommandItem
                                            key={cert.value}
                                            value={cert.label}
                                            onSelect={() => {
                                                if (!selectedCerts.includes(cert.value)) {
                                                    setSelectedCerts([...selectedCerts, cert.value]);
                                                }
                                                setOpen(false);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedCerts.includes(cert.value)
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {cert.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </section>

            <div className="pt-8 pb-12">
                <Button size="lg" className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/20" asChild>
                    <Link href="/candidate/dashboard">
                        Find Matched Jobs
                    </Link>
                </Button>
            </div>
        </div>
    );
}
