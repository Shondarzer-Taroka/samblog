import DashboardCards from "@/components/Dashboard/DashboardCards";
import { getUserFromCookie } from "@/hooks/auth";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const user = getUserFromCookie();

  if (!user) {
    redirect('/login'); // ✅ server-side redirect
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">ড্যাশবোর্ড ওভারভিউ</h2>
      <DashboardCards />
    </div>
  );
}
