import prisma from "../src/lib/prisma";

async function main() {
  await prisma.task.createMany({
    data: [
      { key: "daily_check", title: "تسجيل الدخول اليومي", icon: "🔥", rewardBase: 1.5, rewardXP: 15, limitPerDay: 1 },
      { key: "watch_ad", title: "مشاهدة إعلان", icon: "🎬", rewardBase: 0.5, rewardXP: 5, limitPerDay: 5 },
      { key: "lucky_box", title: "فتح صندوق الحظ", icon: "🎁", rewardBase: 0, rewardXP: 10, cooldownHours: 6 },
      { key: "share", title: "مشاركة التطبيق", icon: "📤", rewardBase: 1, rewardXP: 10, limitPerDay: 1 },
      { key: "invite_friend", title: "دعوة الأصدقاء", icon: "👥", rewardBase: 2, rewardXP: 20, limitPerDay: 100 },
      { key: "invest_bonus", title: "اربح من استثمارك", icon: "💰", rewardBase: 0, rewardXP: 20, limitPerDay: 1 },
      { key: "level_up", title: "ترقية المستوى", icon: "⭐", rewardBase: 1, rewardXP: 50, limitPerDay: 10 },
      { key: "withdraw", title: "عملية سحب", icon: "🏦", rewardBase: 0.5, rewardXP: 5, limitPerDay: 1 },
      { key: "engage", title: "تفاعل يومي", icon: "⚡", rewardBase: 0.2, rewardXP: 3, limitPerDay: 3 }
    ]
  });
}

main().then(() => {
  console.log("Tasks seeded ✔");
});
