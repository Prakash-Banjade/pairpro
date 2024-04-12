"use client";
import React from "react";
// import { calsans } from "@/fonts/calsans";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../ui/tracing-bean";

export function TracingBeamWrapper({ children }: {
    children: React.ReactNode
}) {
    return (
        <TracingBeam className="px-6">
            <div className="w-full min-h-full mx-auto antialiased pt-4 relative">
                {children}
            </div>
        </TracingBeam>
    );
}
