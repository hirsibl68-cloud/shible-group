"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskPopup({
  open,
  onClose,
  title,
  rewardUSD,
  rewardXP,
  level,
  xp,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  rewardUSD: number;
  rewardXP: number;
  level: number;
  xp: number;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-[90%] max-w-sm rounded-3xl p-6 shadow-xl text-center"
          >
            <div className="text-5xl mb-3">🎉</div>

            <h2 className="text-lg font-bold text-[#0b1a2e]">
              {title}
            </h2>

            <p className="text-sm text-[#4b5a6b] mt-1">
              تم إنجاز المهمة بنجاح!
            </p>

            <div className="mt-4 bg-[#f5faff] border border-[#e1edff] rounded-2xl p-4">
              <div className="text-[#0b1a2e] font-semibold">
                +{rewardUSD.toFixed(2)}$ ربح
              </div>
              <div className="text-[#1b4da8] font-semibold text-sm mt-1">
                +{rewardXP} XP
              </div>
            </div>

            <div className="mt-4">
              <div className="text-xs text-[#6b7b90]">XP Progress</div>
              <div className="w-full h-2 bg-[#e7eef9] rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-[#2aa1ff] rounded-full"
                  style={{ width: `${xp % 100}%` }}
                />
              </div>
              <div className="text-xs text-[#1b4da8] mt-1 font-semibold">
                المستوى الحالي: {level}
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full bg-[#1b6fe0] hover:bg-[#155ec2] text-white font-semibold py-2 rounded-xl transition"
            >
              متابعة
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
