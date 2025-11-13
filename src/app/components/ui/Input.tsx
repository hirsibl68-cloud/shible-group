import { InputHTMLAttributes, forwardRef } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className = "", ...rest }, ref) => {
    return (
      <div className="space-y-1">
        {label && <label className="text-sm text-[#345067]">{label}</label>}
        <input
          ref={ref}
          {...rest}
          className={`w-full rounded-xl border border-[#dce9ff] bg-white px-3 py-2 outline-none ${className}`}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
