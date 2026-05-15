import { API_BASE_URL } from "@/config/env";

export interface StatisticsVO {
  totalApps: number;
  activeUsers: number;
  totalChats: number;
  totalCodeLines: number;
}

export async function getStatisticsOverview() {
  const res = await fetch(`${API_BASE_URL}/statistics/overview`);
  const data = await res.json();
  return {
    data: {
      code: data.code,
      message: data.message,
      data: data.data as StatisticsVO,
    },
  };
}
