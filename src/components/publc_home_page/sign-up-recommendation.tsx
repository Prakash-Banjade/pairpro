"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";


export function SignUpRecommendation() {
    return (
        <div className="h-[45rem] w-full rounded-md relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="sm:text-7xl text-5xl lg:text-9xl font-bold text-center relative z-20">
                    PairPro
                </h1>
                <p></p>
                <p className="max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                    Elevate your coding journey with seamless pair programming. Connect instantly, collaborate effortlessly, and conquer coding challenges together. Join our vibrant community of developers and level up your skills today.
                </p>
                <div className="flex mt-5 justify-center">
                    <div>
                        <Button className="rounded-full md:p-8 sm:p-7 p-6 lg:text-lg text-base" asChild>
                            <Link href="/dash">Get started</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
