"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Briefcase, Star, MessageSquare } from "lucide-react";

interface Notification {
    id: string;
    type: "job" | "message" | "system";
    title: React.ReactNode;
    time: string;
    isRead: boolean;
}

const mockNotifications: Notification[] = [
    {
        id: "1",
        type: "job",
        title: <span><strong>Tell us about your experience</strong> working as a [HVAC] Lead Technician for a Job Portal at ClimatePros Inc.</span>,
        time: "Jan 10 at 03:54 AM",
        isRead: false
    },
    {
        id: "2",
        type: "system",
        title: <span><strong>Add credibility to your profile</strong> by verifying your EPA Certification.</span>,
        time: "Dec 05, 2025 at 06:46 AM",
        isRead: false
    },
    {
        id: "3",
        type: "job",
        title: <span><strong>Tell us about your experience</strong> working as a Commercial Electrician for a Job Portal at Future Personnel Agency, Inc.</span>,
        time: "Jan 19 at 11:30 AM",
        isRead: true
    },
    {
        id: "4",
        type: "message",
        title: <span>New message from <strong>Sarah (Recruiter)</strong>: &quot;Hi John, are you available for a quick call?&quot;</span>,
        time: "Dec 22, 2025 at 09:33 PM",
        isRead: true
    },
    {
        id: "5",
        type: "job",
        title: <span><strong>Tell us about your experience</strong> working as a [Managed Delivery] Product Designer for Diamond Manufacturer.</span>,
        time: "Dec 03, 2025 at 11:30 AM",
        isRead: true
    }
];

interface NotificationsSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function NotificationsSheet({ open, onOpenChange }: NotificationsSheetProps) {
    const pendingCount = mockNotifications.filter(n => !n.isRead).length;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800" side="right">
                <SheetHeader className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between space-y-0">
                    <SheetTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">Notifications</SheetTitle>
                    {/* Close button is automatically added by SheetContent, but we can customize or suppress if needed. Shadcn default X is fine. */}
                </SheetHeader>

                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Pending</span>
                        {pendingCount > 0 && (
                            <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                                {pendingCount}
                            </Badge>
                        )}
                    </div>
                </div>

                <ScrollArea className="flex-1">
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {mockNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-5 flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${!notification.isRead ? 'bg-brand-pale/20 dark:bg-brand-emerald/5' : ''}`}
                            >
                                <div className="mt-1 shrink-0">
                                    {notification.type === 'job' && <Briefcase className="w-5 h-5 text-slate-400" />}
                                    {notification.type === 'system' && <Star className="w-5 h-5 text-slate-400" />}
                                    {notification.type === 'message' && <MessageSquare className="w-5 h-5 text-slate-400" />}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                        {notification.title}
                                    </p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">
                                        {notification.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
