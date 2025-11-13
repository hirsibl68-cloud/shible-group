import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", disabled, children, ...rest } = props;
  return (
    <button
      {...rest}
      disabled={disabled}
      className={`w-full rounded-xl py-3 font-semibold transition
        ${disabled
          ? "bg-[#e7eef9] text-[#7b8fa6] cursor-not-allowed"
          : "bg-[#2aa1ff] hover:bg-[#1b8aea] text-white"}
        ${className}`}
    >
      {children}
    </button>
  );
}
