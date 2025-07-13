import DashboardCards from "@/components/Dashboard/DashboardCards";

import { getUserFromCookie } from "@/hooks/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getUserFromCookie();

  if (!user?.email) {
    return redirect('/login'); // ✅ server-side redirect
  }


  return (

    user.email && <div>
      <h2 className="text-2xl font-bold mb-4">ড্যাশবোর্ড ওভারভিউ</h2>
      <DashboardCards />
    </div>

  );
}
