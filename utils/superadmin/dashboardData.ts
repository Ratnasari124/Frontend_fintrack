// src/data/dashboardData.ts


export const branches = ["Klojen", "Lowokwaru", "Junrejo", "Blimbing"];
// Data untuk DokumentasiCabang
export const dokumentasiCabangData = [
  { id: 1, name: 'Klojen' },
  { id: 2, name: 'Lowokwaru' },
  { id: 3, name: 'Junrejo' },
  { id: 4, name: 'Blimbing' },
]

// src/utils/superadmin/dashboardData.ts

export type cardSummaryData = {
  title: string;
  value: string;
  iconName: string;
  iconColorClass: string;
  bgColorClass: string;
};

// Fungsi fetch dari API backend
export async function getCardSummaryData(): Promise<cardSummaryData[]> {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/superadmin/dashboard-summary");
    const data = await res.json();

    return [
      {
        title: "Pemasukan",
        value: data.branches[0].pemasukan,
        iconName: "MoneyIcon",
        iconColorClass: "text-green-500 dark:text-green-100",
        bgColorClass: "bg-green-100 dark:bg-green-500",
      },
      {
        title: "Pengeluaran",
        value: data.branches[0].pengeluaran,
        iconName: "CartIcon",
        iconColorClass: "text-red-500 dark:text-red-100",
        bgColorClass: "bg-red-100 dark:bg-red-500",
      },
      {
        title: "Saldo",
        value: data.branches[0].saldo,
        iconName: "MoneyIcon",
        iconColorClass: "text-blue-500 dark:text-blue-100",
        bgColorClass: "bg-blue-100 dark:bg-blue-500",
      },
      {
        title: "Jumlah Cabang",
        value: data.jumlah_cabang.toString(),
        iconName: "ChatIcon",
        iconColorClass: "text-purple-500 dark:text-purple-100",
        bgColorClass: "bg-purple-100 dark:bg-purple-500",
      },
    ];
  } catch (error) {
    console.error("Gagal fetch dashboard summary:", error);
    return [];
  }
}

export interface TrendLineApiResponse {
  labels: string[]; // misal: ["Jan", "Feb", "Mar", ...]
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

export async function fetchTrendLineData(): Promise<TrendLineApiResponse> {
  const res = await fetch("http://127.0.0.1:8000/api/superadmin/dashboard-trendline");
  if (!res.ok) throw new Error("Failed to fetch trend line data");
  return res.json();
}

export async function fetchTrendBarData(): Promise<TrendLineApiResponse> {
  const res = await fetch("http://127.0.0.1:8000/api/superadmin/dashboard-trendbar");
  if (!res.ok) {
    throw new Error("Gagal mengambil data trend bar");
  }
  return await res.json();
}

// utils/superadmin/dashboardData.ts
export interface DokumentasiCabangItem {
  id: string;
  name: string;
}

export async function fetchDokumentasiCabang(): Promise<DokumentasiCabangItem[]> {
  const response = await fetch(
    "http://127.0.0.1:8000/api/superadmin/dashboard-summary"
  );
  const data = await response.json();

  return data.branches.map((branch: any) => ({
    id: branch.branch_code,
    name: `${branch.branch_name}, ${branch.branch_address}`,
  }));
}
