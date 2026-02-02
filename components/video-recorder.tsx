"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Video, Mic, Smartphone, Play, Square, RotateCcw, Save, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function VideoRecorder() {
    const router = useRouter();
    const [permissionError, setPermissionError] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isCameraActive, setIsCameraActive] = useState(false); // NEW STATE
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [timer, setTimer] = useState(0);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const videoPreviewRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        setIsCameraActive(false);
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            streamRef.current = stream;
            if (videoPreviewRef.current) {
                videoPreviewRef.current.srcObject = stream;
            }
            setPermissionError(false);
            setIsCameraActive(true); // Trigger re-render
        } catch (err) {
            console.error("Error accessing camera:", err);
            setPermissionError(true);
            setIsCameraActive(false);
        }
    };

    const startRecording = async () => {
        if (!streamRef.current) {
            await startCamera();
        }

        if (streamRef.current) {
            const mediaRecorder = new MediaRecorder(streamRef.current);
            mediaRecorderRef.current = mediaRecorder;
            const chunks: Blob[] = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: "video/webm" });
                setRecordedChunks(chunks);
                setVideoBlob(blob);
                setVideoUrl(URL.createObjectURL(blob));
                // Don't kill camera yet if we want to retain preview? Actually for review we play the blob.
                // Keep camera active for retake?
            };

            mediaRecorder.start();
            setIsRecording(true);
            setTimer(0);
            timerIntervalRef.current = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
            stopCamera(); // Stop camera to show playback
        }
    };

    const retake = () => {
        setVideoBlob(null);
        setVideoUrl(null);
        setRecordedChunks([]);
        startCamera();
    };

    const saveVideo = () => {
        // Mock save
        router.push("/candidate/preferences");
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    if (permissionError) {
        return (
            <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/20 text-center space-y-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto text-red-600 dark:text-red-400">
                    <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">Camera Access Denied</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        We need camera access to record your intro. Please enable permissions in your browser settings.
                    </p>
                </div>
                <Button onClick={startCamera} variant="outline" className="w-full">
                    Retry Permission
                </Button>
            </div>
        );
    }

    // REVIEW STATE
    if (videoUrl) {
        return (
            <div className="space-y-4">
                <div className="relative aspect-[3/4] bg-black rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800">
                    <video
                        src={videoUrl}
                        controls
                        className="w-full h-full object-cover"
                        playsInline
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" onClick={retake} className="h-12 text-base">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Retake
                    </Button>
                    <Button onClick={saveVideo} className="h-12 text-base">
                        <Save className="w-4 h-4 mr-2" />
                        Save & Continue
                    </Button>
                </div>
            </div>
        );
    }

    // IDLE / RECORDING STATE
    return (
        <div className="space-y-6">
            <div className="relative aspect-[3/4] bg-slate-900 rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800">
                {!isRecording && !isCameraActive && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                        <Smartphone className="w-12 h-12 mb-4 opacity-50" />
                        <p className="text-sm">Camera preview will appear here</p>
                    </div>
                )}

                <video
                    ref={videoPreviewRef}
                    autoPlay
                    muted
                    playsInline
                    className={`w-full h-full object-cover ${!isCameraActive ? 'hidden' : ''}`}
                />

                {isRecording && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-mono font-medium animate-pulse flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full" />
                        {formatTime(timer)}
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center gap-4">
                {!isRecording ? (
                    <Button
                        size="lg"
                        onClick={!isCameraActive ? startCamera : startRecording}
                        className={`
                h-16 w-16 rounded-full shadow-lg transition-all
                ${!isCameraActive ? 'bg-slate-800 hover:bg-slate-700' : 'bg-red-600 hover:bg-red-700 hover:scale-110'}
            `}
                    >
                        {!isCameraActive ? <Video className="w-6 h-6" /> : <div className="w-4 h-4 bg-white rounded-sm" />}
                        {isCameraActive && <span className="sr-only">Start</span>}
                    </Button>
                ) : (
                    <Button
                        size="lg"
                        onClick={stopRecording}
                        className="h-16 w-16 rounded-full bg-slate-800 hover:bg-slate-700 text-white shadow-lg border-4 border-slate-200 dark:border-slate-700"
                    >
                        <Square className="w-6 h-6 fill-current" />
                    </Button>
                )}

                <p className="text-sm font-medium text-slate-500">
                    {!isCameraActive
                        ? "Tap to enable camera"
                        : isRecording
                            ? "Recording... Tap to stop"
                            : "Tap Red Button to Record"
                    }
                </p>
            </div>
        </div>
    );
}
