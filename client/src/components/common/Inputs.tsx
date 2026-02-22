import React, { InputHTMLAttributes, ElementType } from "react";

// 1. Define the Interface
// Extending InputHTMLAttributes ensures 'value' and 'onChange' are valid props
interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ElementType;
  label: string;
  // Explicitly defining these for clarity in controlled usage
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomInput = ({
  icon: Icon,
  label,
  id,
  value,
  onChange,
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
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black group-focus-within:text-[#B197FC] transition-colors pointer-events-none">
          <Icon size={18} />
        </div>

        <input
          {...props}
          id={inputId}
          value={value}
          onChange={onChange}
          className="w-full bg-white border-4 text-black border-black rounded-xl py-3 pl-12 pr-4 font-bold text-sm outline-none focus:shadow-[4px_4px_0px_0px_rgba(177,151,252,1)] transition-all placeholder:text-gray-700"
        />
      </div>
    </div>
  );
};
