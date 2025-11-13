export const LEVEL_STEP_XP = 50; // كم XP لكل مستوى (عدّلها لو بدك)

/** يضيف XP ويحسب المستوى الجديد */
export function addXP(currentXP: number, gain: number) {
  const xp = (currentXP ?? 0) + (gain ?? 0);
  const level = Math.floor(xp / LEVEL_STEP_XP) + 1;
  return { newXP: xp, newLevel: level };
}
