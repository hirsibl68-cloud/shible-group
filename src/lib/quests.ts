// src/lib/quests.ts
export type Quest = {
  id: string;
  title: string;
  points: number;
  doneOn?: string; // ISO تاريخ آخر إكمال
};
const KEY = "dailyQuests";
const TODAY = () => new Date().toISOString().slice(0, 10); // yyyy-mm-dd

export function defaultQuests(): Quest[] {
  return [
    { id: "q1", title: "تسجيل دخول اليوم", points: 5 },
    { id: "q2", title: "زيارة صفحة الإيداع", points: 10 },
    { id: "q3", title: "مشاركة رابط الدعوة", points: 15 },
  ];
}

export function loadQuests(): Quest[] {
  const raw = localStorage.getItem(KEY);
  const qs = raw ? JSON.parse(raw) as Quest[] : defaultQuests();
  // إعادة ضبط يومية: إذا doneOn != اليوم، تعتبر غير منتهية
  return qs.map(q => (q.doneOn?.startsWith(TODAY()) ? q : { ...q, doneOn: undefined }));
}

export function saveQuests(qs: Quest[]) {
  localStorage.setItem(KEY, JSON.stringify(qs));
}

export function completeQuest(id: string) {
  const qs = loadQuests();
  const i = qs.findIndex(q => q.id === id);
  if (i >= 0) {
    qs[i].doneOn = new Date().toISOString();
    saveQuests(qs);
  }
}

export function isDone(q: Quest) {
  return !!q.doneOn?.startsWith(TODAY());
}
