/* eslint-disable @typescript-eslint/no-unused-vars */
import SessionsOverviewChart from "./SessionsOverviewChart";

export default function DashboardCards() {
  return (
    <section>


      <div className="hidden grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold">মোট লেখা</h3>
          <p className="text-3xl font-bold mt-2 text-blue-600">২৫০</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold">একটিভ ইউজার</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">১৫০</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold">মন্তব্য</h3>
          <p className="text-3xl font-bold mt-2 text-purple-600">৩২০</p>
        </div>
      </div>
      <SessionsOverviewChart/>
    </section>
  );
}













// // app/dashboard/page.tsx
// import { cookies } from 'next/headers';
// import jwt from 'jsonwebtoken';
// import DashboardComponent from './DashboardComponent';




// async function getUserFromCookie() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get('refreshToken')?.value;

//   if (!token) return null;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     return decoded as { id: string; name: string; email: string; role: string };
//   } catch (error) {
//     return null;
//   }
// }

// async function getDashboardData(refreshToken: string) {
//   const cookieHeader = `refreshToken=${refreshToken}`;

//   const [dashboardRes, historicalRes] = await Promise.all([
//     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`, {
//       headers: {
//         Cookie: cookieHeader
//       },
//       cache: 'no-store'
//     }),
//     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/historical`, {
//       headers: {
//         Cookie: cookieHeader
//       },
//       cache: 'no-store'
//     })
//   ]);

//   if (!dashboardRes.ok || !historicalRes.ok) {
//     throw new Error('Failed to fetch dashboard data');
//   }

//   const dashboardData = await dashboardRes.json();
//   const historicalData = await historicalRes.json();

//   return {
//     dashboardData,
//     historicalData
//   };
// }

// export default async function DashboardPage() {
//   const user = await getUserFromCookie();
//   const cookieStore = await cookies();
//   const refreshToken = cookieStore.get('refreshToken')?.value || '';

//   console.log(user,'dash bord card');
  
//   if (!user || user.role !== 'admin') {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <strong>Access Denied:</strong> You don&apos;t have permission to view this page
//         </div>
//       </div>
//     );
//   }

//   try {
//     const { dashboardData, historicalData } = await getDashboardData(refreshToken);

//     return (
//       <DashboardComponent
//         data={dashboardData}
//         historicalData={historicalData}
//       />
//     );
//   } catch (error) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <strong>Error:</strong>{' '}
//           {error instanceof Error ? error.message : 'Failed to load dashboard data'}
//         </div>
//       </div>
//     );
//   }
// }
