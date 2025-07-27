// app/dashboard/dashboard-api.ts
interface TimePeriodCount {
  day: number;
  week: number;
  month: number;
  year: number;
}

export interface DashboardData {
  users: TimePeriodCount;
  news: TimePeriodCount;
  polls: TimePeriodCount;
  epapers: TimePeriodCount;
  opinions: TimePeriodCount;
  comments: TimePeriodCount;
  likes: TimePeriodCount;
}

export interface HistoricalDataPoint {
  month: string;
  users: number;
  news: number;
  opinions: number;
  comments: number;
  likes: number;
}

export async function fetchDashboardData(): Promise<DashboardData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`, {
    credentials: 'include',
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  
  return res.json();
}

export async function fetchHistoricalData(): Promise<HistoricalDataPoint[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/historical`, {
    credentials: 'include',
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch historical data');
  }
  
  return res.json();
}