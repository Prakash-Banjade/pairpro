import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return <div className=" h-screen">
    <section className="flex justify-center pt-20 h-full">
      <SignUp />
    </section>
  </div>
}