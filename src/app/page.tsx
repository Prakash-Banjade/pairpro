import PublicHeader from "@/components/publc_home_page/header";
import { SignUpRecommendation } from "@/components/publc_home_page/sign-up-recommendation";
import { TracingBeamWrapper } from "@/components/utils/tracing-bean";

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <PublicHeader />
      <TracingBeamWrapper>
        <SignUpRecommendation />
      </TracingBeamWrapper>
    </div>
  );
}
