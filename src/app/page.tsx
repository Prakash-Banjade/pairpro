import { SignUpRecommendation } from "@/components/publc_home_page/sign-up-recommendation";
import { TracingBeamWrapper } from "@/components/utils/tracing-bean";

export default function Home() {
  return (
    <div className="min-h-screen">
      <TracingBeamWrapper>
        <SignUpRecommendation />
      </TracingBeamWrapper>
    </div>
  );
}
