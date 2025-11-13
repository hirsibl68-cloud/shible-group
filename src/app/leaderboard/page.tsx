"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function LeaderboardPage() {
  const { data, error, isLoading } = useSWR("/api/leaderboard", fetcher);

  if (isLoading) return <div className="p-6 text-center">جارٍ التحميل...</div>;
  if (error) return <div className="p-6 text-center text-red-600">حدث خطأ في الجلب</div>;

  return (
    <div className="min-h-screen bg-[#f5f9ff] py-10 px-4">
      <h1 className="text-center text-xl font-bold text-[#0b1a2e] mb-6">
        🏆 لوحة المتصدرين
      </h1>

      <div className="max-w-md mx-auto bg-white shadow-sm border border-[#dce9ff] rounded-2xl overflow-hidden">
        <table className="w-full text-center text-sm">
          <thead className="bg-[#eaf3ff] text-[#0b1a2e] font-semibold">
            <tr>
              <th className="py-3">#</th>
              <th>الاسم</th>
              <th>المستوى</th>
              <th>XP</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((u: any, i: number) => (
              <tr
                key={u.id}
                className="border-t border-[#edf3ff] hover:bg-[#f8fbff] transition"
              >
                <td className="py-3">{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.level}</td>
                <td>{u.xp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
