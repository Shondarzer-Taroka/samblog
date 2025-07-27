
import { getUserFromCookie } from '@/hooks/auth';
import { cookies } from 'next/headers';
import DashboardView from './SessionsOverviewChart';


const getData = async () => {
  const user = await getUserFromCookie();
  console.log(user,'dspas');
  
  
  const dashboardRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`, {
    credentials: 'include',
    headers: {
      Cookie: cookies().toString()
    }
  });
  
  const historicalRes = user?.role === 'admin' 
    ? await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/historical`, {
        credentials: 'include',
        headers: {
          Cookie: cookies().toString()
        }
      })
    : null;

  if (!dashboardRes.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  const dashboardData = await dashboardRes.json();
  const historicalData = historicalRes ? await historicalRes.json() : null;

  return { 
    dashboardData, 
    historicalData,
    user 
  };
};

export default async function DashboardPage() {
  const { dashboardData, historicalData, user } = await getData();

  return (
    <DashboardView 
      dashboardData={dashboardData} 
      historicalData={historicalData}
      user={user}
    />
  );
}