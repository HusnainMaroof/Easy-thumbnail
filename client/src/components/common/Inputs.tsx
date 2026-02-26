import { Eye, EyeClosed, Unlock } from "lucide-react";
import React, { InputHTMLAttributes, ElementType } from "react";

// 1. Define the Interface
// Extending InputHTMLAttributes ensures 'value' and 'onChange' are valid props
interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ElementType;
  label: string;
  // Explicitly defining these for clarity in controlled usage
  err: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Click?: () => void;
}

export const CustomInput = ({
  err,
  name,
  icon: Icon,
  label,
  id,
  value,
  onChange,
  type,
  Click,
  ...props
}: CustomInputProps) => {
  // Generate a unique ID for accessibility
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Linked label to input via htmlFor */}
      <label
        htmlFor={inputId}
        className="text-[10px] font-bold uppercase tracking-widest text-black ml-1"
      >
        {label}
      </label>

      <div className="relative group">
        <div
          className={`absolute left-4 top-1/2 -translate-y-1/2  ${err ? "text-red-700" : "text-black group-focus-within:text-[#B197FC]"} transition-colors pointer-events-none`}
        >
          <Icon size={18} />
        </div>

        <input
          name={name}
          {...props}
          id={inputId}
          value={value}
          type={type}
          onChange={onChange}
          className={`w-full bg-white border-2  rounded-xl py-3 pl-12 pr-4 font-bold text-sm outline-none transition-all ${
            err
              ? "text-red-700 border-red-700 focus:shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] placeholder:text-red-700"
              : "text-black border-black placeholder:text-gray-700 focus:shadow-[4px_4px_0px_0px_rgba(177,151,252,1)]"
          }
`}
        />
        {(label === "Password" || label === "New Password") &&  (
          <span className="text-black absolute right-4 top-1/2 -translate-y-1/2 z-100  ">
            {type === "password" ? (
              <Eye size={18} className="cursor-pointer" onClick={Click} />
            ) : (
              <EyeClosed size={18} className="cursor-pointer" onClick={Click} />
            )}
          </span>
        )}

      </div>
        <span className="text-red-700"> {err}</span>
    </div>
  );
};
