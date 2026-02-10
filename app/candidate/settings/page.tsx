"use client";

import { CandidateSidebar } from "@/components/candidate-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsSection } from "@/components/settings-section";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { NotificationsSheet } from "@/components/notifications-sheet";
import { useState } from "react";

export default function SettingsPage() {
    const [showNotifications, setShowNotifications] = useState(false);
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            {/* Desktop Sidebar */}
            <CandidateSidebar />

            <div className="md:pl-64 flex flex-col min-h-screen transition-all duration-300 ease-in-out">
                {/* Header */}
                <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
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
                        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 hidden md:block">Settings</h1>
                        <span className="md:hidden font-semibold text-slate-900 dark:text-slate-100">Settings</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            onClick={() => setShowNotifications(true)}
                        >
                            <Bell className="w-5 h-5" />
                        </Button>
                        <NotificationsSheet open={showNotifications} onOpenChange={setShowNotifications} />
                        <Avatar className="h-9 w-9 md:hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                            <AvatarImage src="/avatar.jpg" alt="User Avatar" className="object-cover" />
                            <AvatarFallback className="text-slate-700 dark:text-slate-300">JD</AvatarFallback>
                        </Avatar>
                    </div>
                </header>

                <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
                    <Tabs defaultValue="global-preferences" className="w-full space-y-8">
                        <TabsList className="bg-transparent p-0 h-auto justify-start border-b border-slate-200 dark:border-slate-800 w-full rounded-none">
                            {["Global Preferences", "Scheduling", "Job Preferences", "Notifications"].map((tab) => {
                                const value = tab.toLowerCase().replace(/\s+/g, '-');
                                return (
                                    <TabsTrigger
                                        key={value}
                                        value={value}
                                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 font-medium text-slate-500 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100 transition-none"
                                    >
                                        {tab}
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>

                        {/* Global Preferences */}
                        <TabsContent value="global-preferences" className="space-y-2">
                            <div className="mb-6">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Account</h2>
                            </div>

                            <SettingsSection title="FieldService Pros Email Address">
                                john.doe@fieldservicepros.com
                            </SettingsSection>

                            <SettingsSection
                                title="Personal Email Address"
                                action={<Button variant="outline" size="sm">Update Email</Button>}
                            >
                                john.doe@example.com
                            </SettingsSection>

                            <SettingsSection
                                title="Copy notifications to personal email address"
                                action={<Switch checked />}
                            >
                                <span className="sr-only">Copy notifications</span>
                            </SettingsSection>

                            <SettingsSection
                                title="Password"
                                action={<Button variant="outline" size="sm">Update Password</Button>}
                            >
                                ••••••••••
                            </SettingsSection>

                            <div className="mb-6 mt-10">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Layout</h2>
                            </div>

                            <SettingsSection
                                title="3 Column Layout"
                                action={
                                    <div className="flex items-center gap-2">
                                        <Switch />
                                        <span className="text-sm text-slate-500">View job details alongside job postings</span>
                                    </div>
                                }
                            >
                                <span className="sr-only">3 Column Layout</span>
                            </SettingsSection>
                        </TabsContent>

                        {/* Scheduling */}
                        <TabsContent value="scheduling" className="space-y-4">
                            <SettingsSection
                                title="Time Zone & Working Hours"
                                action={<Button variant="outline" size="sm">Edit</Button>}
                            >
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <span className="text-slate-500">Time Zone</span>
                                        <span className="md:col-span-2 font-medium text-slate-900 dark:text-slate-100">(UTC-06:00) Central Time (US & Canada)</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <span className="text-slate-500">Working Hours</span>
                                        <span className="md:col-span-2 font-medium text-slate-900 dark:text-slate-100">8:00 AM – 5:00 PM</span>
                                    </div>
                                </div>
                            </SettingsSection>
                        </TabsContent>

                        {/* Job Preferences */}
                        <TabsContent value="job-preferences" className="space-y-4">
                            <div className="bg-brand-pale/20 dark:bg-brand-emerald/10 border border-brand-emerald/10 p-4 rounded-lg flex items-start gap-3 text-sm text-brand-emerald dark:text-emerald-400 mb-6">
                                <div className="mt-0.5">👁️</div>
                                <p>Your job preferences are visible for matchers. When they will be searching for candidates they will take this into account to send more relevant job interest requests.</p>
                            </div>

                            <SettingsSection
                                title="Job Preferences"
                                action={
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500"><span className="sr-only">Delete</span>🗑️</Button>
                                        <Button variant="outline" size="sm">Edit</Button>
                                    </div>
                                }
                            >
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <span className="text-slate-500">Commitment</span>
                                        <span className="md:col-span-2 font-medium text-slate-900 dark:text-slate-100">Full-time, Part-time (20+ hrs)</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <span className="text-slate-500">Travel Radius</span>
                                        <span className="md:col-span-2 font-medium text-slate-900 dark:text-slate-100">Up to 50 miles from Dallas, TX</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <span className="text-slate-500">Trade Specializations</span>
                                        <div className="md:col-span-2 flex flex-wrap gap-2">
                                            <Badge variant="secondary" className="bg-slate-100 text-slate-700">HVAC</Badge>
                                            <Badge variant="secondary" className="bg-slate-100 text-slate-700">Commercial Refrigeration</Badge>
                                            <Badge variant="secondary" className="bg-slate-100 text-slate-700">Electrical</Badge>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <span className="text-slate-500">Minimum Hourly Rate</span>
                                        <span className="md:col-span-2 font-medium text-slate-900 dark:text-slate-100">$45.00 / hr</span>
                                    </div>
                                </div>
                            </SettingsSection>
                        </TabsContent>

                        {/* Notifications */}
                        <TabsContent value="notifications" className="space-y-4">
                            <div className="mb-6">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Job Alerts</h2>
                                <p className="text-sm text-slate-500 mt-1">Receive email Alerts when a new job matching your preferences is posted.</p>
                            </div>

                            <SettingsSection
                                title="Enable Alerts"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <input type="radio" name="alerts" id="all" className="w-4 h-4 text-primary border-slate-300 focus:ring-primary" />
                                        <Label htmlFor="all">All new jobs</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input type="radio" name="alerts" id="match" defaultChecked className="w-4 h-4 text-primary border-slate-300 focus:ring-primary" />
                                        <Label htmlFor="match">
                                            New jobs that match job preferences
                                            <span className="text-primary ml-2 cursor-pointer hover:underline text-xs">View job preferences</span>
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input type="radio" name="alerts" id="never" className="w-4 h-4 text-primary border-slate-300 focus:ring-primary" />
                                        <Label htmlFor="never">Never</Label>
                                    </div>

                                    <div className="pt-4 flex items-center space-x-2">
                                        <Switch id="mute" />
                                        <Label htmlFor="mute" className="text-slate-600">Mute alerts when unavailable (0 hrs/wk)</Label>
                                    </div>
                                </div>
                            </SettingsSection>

                            <div className="mt-8 mb-6">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">SMS Notifications</h2>
                            </div>

                            <SettingsSection
                                title="SMS Settings"
                                action={<Button variant="default" size="sm">Update</Button>}
                            >
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <Switch id="sms" defaultChecked />
                                        <div className="space-y-1">
                                            <Label htmlFor="sms">Send SMS when clients request my interest in a position</Label>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Badge variant="outline" className="bg-slate-50 px-3 py-1 text-slate-600 border-slate-200">+1 (555) 123-4567</Badge>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-2">You can manage your phone number in the Profile/Basic Information section.</p>
                                        </div>
                                    </div>
                                </div>
                            </SettingsSection>

                        </TabsContent>

                    </Tabs>
                </main>
            </div>
        </div>
    );
}
