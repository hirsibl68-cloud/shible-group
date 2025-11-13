// src/lib/user.ts
export function ensureUserId(): string {
  let id = localStorage.getItem("userId");
  if (!id) {
    id = "u_" + Math.random().toString(36).slice(2, 9);
    localStorage.setItem("userId", id);
  }
  return id;
}

export function addReferral(ref: string) {
  const key = "refCount:" + ref;
  const n = Number(localStorage.getItem(key) || 0) + 1;
  localStorage.setItem(key, String(n));

  // حدّث لوحة الترتيب
  const raw = localStorage.getItem("leaderboard");
  const board: { id: string; count: number }[] = raw ? JSON.parse(raw) : [];
  const i = board.findIndex((x) => x.id === ref);
  if (i >= 0) board[i].count = n;
  else board.push({ id: ref, count: n });
  localStorage.setItem("leaderboard", JSON.stringify(board));
}

export function getReferralCount(myId: string) {
  return Number(localStorage.getItem("refCount:" + myId) || 0);
}

export function getLeaderboard() {
  const raw = localStorage.getItem("leaderboard");
  const board: { id: string; count: number }[] = raw ? JSON.parse(raw) : [];
  // رتب تنازلي
  return board.sort((a, b) => b.count - a.count).slice(0, 50);
}
