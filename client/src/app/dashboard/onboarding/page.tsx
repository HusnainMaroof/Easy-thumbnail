import Onboarding from "@/src/components/common/OnBoarding";
import { getCurrentUser } from "@/src/lib/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    console.log("un authrozied");

    redirect("/");
  }
  return (
    <div>
      <Onboarding />
    </div>
  );
};

export default page;
