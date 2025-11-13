export type ToastItem = { id: string; type: "success" | "error" | "info"; message: string; duration?: number };

let listeners: ((t: ToastItem) => void)[] = [];
function uid() { return Math.random().toString(36).slice(2); }

export function onToast(cb: (t: ToastItem) => void) {
  listeners.push(cb);
  return () => { listeners = listeners.filter(l => l !== cb); };
}

function push(type: ToastItem["type"], message: string, duration = 3000) {
  const item: ToastItem = { id: uid(), type, message, duration };
  listeners.forEach(l => l(item));
}

export const toast = {
  success: (m: string, d?: number) => push("success", m, d),
  error:   (m: string, d?: number) => push("error", m, d),
  info:    (m: string, d?: number) => push("info", m, d),
};
