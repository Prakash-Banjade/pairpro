import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return <div className=" h-screen">
        <section className="flex justify-center pt-20 h-full">
            <SignIn />
        </section>
    </div>
}