import Onboarding from "@/src/components/common/OnBoarding";
import { getCurrentUser } from "@/src/lib/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentUser();
  if (!user.authsuccess.success || !user.authsuccess.data) {
    console.log("Unauthorized");
    redirect("/");
  }

  // Only runs if authenticated + data exists
  if (!user.authsuccess.data.isOnboard) {
    console.log("Not onboarded - stay here");
  } else {
    redirect("/dashboard/home");
  }
  console.log(" user Data", user);
  return (
    <div>
      <Onboarding />
    </div>
  );
};

export default page;
