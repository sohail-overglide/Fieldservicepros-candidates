"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Facebook, Apple, Mail } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                        Welcome Back
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Sign in to access your field profile
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="tech@example.com"
                                type="email"
                                className="h-12 text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                className="h-12 text-lg"
                            />
                        </div>
                        <Button className="w-full h-12 text-lg font-medium" asChild>
                            <Link href="/candidate/onboarding">Sign In</Link>
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200 dark:border-slate-700" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-slate-800 px-2 text-slate-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <Button variant="outline" className="h-12">
                            <Mail className="h-5 w-5" />
                            <span className="sr-only">Google</span>
                        </Button>
                        <Button variant="outline" className="h-12">
                            <Facebook className="h-5 w-5" />
                            <span className="sr-only">Facebook</span>
                        </Button>
                        <Button variant="outline" className="h-12">
                            <Apple className="h-5 w-5" />
                            <span className="sr-only">Apple</span>
                        </Button>
                    </div>
                </div>

                <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                    Don't have an account?{" "}
                    <Link
                        href="/candidate/register"
                        className="font-semibold text-primary hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
