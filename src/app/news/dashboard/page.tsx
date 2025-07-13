'use client'
import DashboardCards from "@/components/Dashboard/DashboardCards";
import { useAuthProvider } from "@/Providers/AuthProvider";

// import { getUserFromCookie } from "@/hooks/auth";
import { redirect } from "next/navigation";

export default  function DashboardPage() {
  // const user = await getUserFromCookie();
  const {user,loading}=useAuthProvider()
  if (loading) {
    return  <p className="text-center py-10">লোড হচ্ছে...</p>
  }

  
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
