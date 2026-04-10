import Onboarding from "@/src/components/common/OnBoarding";
import { getCurrentUser } from "@/src/lib/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentUser();
    if (!user.authsuccess.success || !user.authsuccess.data.isOnboard) {
    console.log("un authrozied sss");

    redirect("/");
  }

  return (
    <div>
      <Onboarding />
    </div>
  );
};

export default page;
