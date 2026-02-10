"use client";

import { useState } from "react";
import { CandidateSidebar } from "@/components/candidate-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Menu, Send, Phone, Video } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

// Mock Data for Recruiters
const recruiters = [
    {
        id: "r1",
        name: "Sarah Jenkins",
        role: "Recruiter at Ascension",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        status: "online",
        lastMessage: "Hi John! We'd love to schedule an interview for the BMET role.",
        lastMessageTime: "2:30 PM",
        unread: 2
    },
    {
        id: "r2",
        name: "David Chen",
        role: "Hiring Manager at GE",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        status: "offline",
        lastMessage: "Thanks for your application. Reviewing it now.",
        lastMessageTime: "Yesterday",
        unread: 0
    },
    {
        id: "r3",
        name: "Maria Rodriguez",
        role: "HR at St. David's",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        status: "online",
        lastMessage: "Can you clarify your certification status?",
        lastMessageTime: "Mon",
        unread: 0
    }
];

const mockMessages: Record<string, { id: string; sender: "user" | "recruiter"; text: string; time: string }[]> = {
    r1: [
        { id: "1", sender: "recruiter", text: "Hi John! I reviewed your profile. Impressive BMET experience.", time: "2:00 PM" },
        { id: "2", sender: "recruiter", text: "We'd love to schedule an interview for the Senior BMET role.", time: "2:30 PM" },
    ],
    r2: [
        { id: "1", sender: "user", text: "Hi David, I just applied for the Imaging Engineer position.", time: "Yesterday" },
        { id: "2", sender: "recruiter", text: "Thanks for your application. Reviewing it now.", time: "Yesterday" },
    ],
    r3: [
        { id: "1", sender: "recruiter", text: "Can you clarify your certification status?", time: "Mon" },
        { id: "2", sender: "user", text: "Yes, I am CBET certified as of 2023.", time: "Mon" },
    ],
};

export default function MessagesPage() {
    const [selectedRecruiter, setSelectedRecruiter] = useState(recruiters[0]);
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState(mockMessages);

    const handleSendMessage = () => {
        if (!messageInput.trim() || !selectedRecruiter) return;

        const newMessage = {
            id: Date.now().toString(),
            sender: "user" as const,
            text: messageInput,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages(prev => ({
            ...prev,
            [selectedRecruiter.id]: [...(prev[selectedRecruiter.id] || []), newMessage],
        }));
        setMessageInput("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Desktop Sidebar */}
            <CandidateSidebar />

            <div className="md:pl-64 flex flex-col h-screen transition-all duration-300 ease-in-out">
                {/* Header */}
                <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 w-72">
                                <CandidateSidebar />
                            </SheetContent>
                        </Sheet>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 hidden md:block">Messages</h1>
                        <span className="md:hidden font-semibold text-slate-900 dark:text-slate-100">Messages</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Avatar className="h-9 w-9 md:hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                            <AvatarImage src="/avatar.jpg" alt="User Avatar" className="object-cover" />
                            <AvatarFallback className="text-slate-700 dark:text-slate-300">JD</AvatarFallback>
                        </Avatar>
                    </div>
                </header>

                <main className="flex-1 p-2 w-full h-[calc(100vh-5rem)] overflow-hidden bg-slate-50 dark:bg-slate-950">
                    <div className="flex h-full gap-2">
                        {/* Recruiter List (Sidebar) */}
                        <Card className="w-80 flex flex-col border-slate-200 dark:border-slate-800 hidden lg:flex bg-white dark:bg-slate-900 rounded-none shadow-none">
                            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        placeholder="Search messages..."
                                        className="pl-9 h-10 bg-slate-50 dark:bg-slate-800 border-none"
                                    />
                                </div>
                            </div>
                            <ScrollArea className="flex-1">
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {recruiters.map((recruiter) => (
                                        <div
                                            key={recruiter.id}
                                            onClick={() => setSelectedRecruiter(recruiter)}
                                            className={`p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${selectedRecruiter?.id === recruiter.id ? "bg-slate-50 dark:bg-slate-800" : ""
                                                }`}
                                        >
                                            <div className="flex gap-3">
                                                <div className="relative">
                                                    <Avatar className="h-12 w-12 border border-slate-200 dark:border-slate-700">
                                                        <AvatarImage src={recruiter.avatar} alt={recruiter.name} />
                                                        <AvatarFallback>{recruiter.name[0]}</AvatarFallback>
                                                    </Avatar>
                                                    {recruiter.status === "online" && (
                                                        <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-brand-lime border-2 border-white dark:border-slate-900 rounded-full"></span>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <p className="font-semibold text-slate-900 dark:text-slate-100 truncate">{recruiter.name}</p>
                                                        <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{recruiter.lastMessageTime}</span>
                                                    </div>
                                                    <p className="text-xs text-primary font-medium mb-1">{recruiter.role}</p>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate pr-6">
                                                        {recruiter.lastMessage}
                                                    </p>
                                                </div>
                                                {recruiter.unread > 0 && (
                                                    <Badge className="bg-primary text-white text-xs px-1.5 py-0.5 rounded-full self-center ml-2">
                                                        {recruiter.unread}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </Card>

                        {/* Chat Window */}
                        <Card className="flex-1 flex flex-col border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden rounded-none shadow-none">
                            {/* Chat Header */}
                            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="lg:hidden">
                                        {/* Mobile Back Button placeholder if needed */}
                                    </div>
                                    <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
                                        <AvatarImage src={selectedRecruiter.avatar} />
                                        <AvatarFallback>{selectedRecruiter.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h2 className="font-bold text-slate-900 dark:text-slate-100">{selectedRecruiter.name}</h2>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                            {selectedRecruiter.role}
                                            {selectedRecruiter.status === "online" && (
                                                <span className="w-1.5 h-1.5 bg-brand-lime rounded-full inline-block"></span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" className="text-slate-500 hover:text-primary">
                                        <Phone className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-slate-500 hover:text-primary">
                                        <Video className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <ScrollArea className="flex-1 p-4 md:p-6 bg-slate-50/50 dark:bg-slate-950/50">
                                <div className="space-y-6">
                                    {/* Date Separator */}
                                    <div className="flex justify-center">
                                        <span className="text-xs font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                                            Today
                                        </span>
                                    </div>

                                    {(messages[selectedRecruiter.id] || []).map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                        >
                                            <div className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${msg.sender === "user"
                                                ? "bg-primary text-primary-foreground rounded-br-none"
                                                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-none"
                                                }`}>
                                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                                <p className={`text-[10px] mt-1 text-right ${msg.sender === "user" ? "text-primary-foreground/70" : "text-slate-400"
                                                    }`}>
                                                    {msg.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>

                            {/* Input Area */}
                            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paperclip w-5 h-5"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                                    </Button>
                                    <Input
                                        placeholder="Type a message..."
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        className="h-11 bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-1"
                                    />
                                    <Button
                                        size="icon"
                                        className="h-11 w-11 shrink-0 bg-primary hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
                                        onClick={handleSendMessage}
                                        disabled={!messageInput.trim()}
                                    >
                                        <Send className="w-5 h-5 ml-0.5" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}
