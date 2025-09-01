import type { JSX } from "react";

type InputFieldProps = {
    label: string;
    type: "text" | "number";
    Icon: JSX.Element;
};

export default function InputField({ label, type, Icon }: InputFieldProps) {
    return (
        <div className="mb-5">
            <div className="flex items-center bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 shadow-lg backdrop-blur-xl transition focus-within:border-indigo-600 focus-within:shadow-[0_0_0_3px_rgba(79,70,229,0.3)]">
                <span className="mr-3 text-xl flex items-center">{Icon}</span>
                <input
                    type={type}
                    placeholder={label}
                    required
                    className="w-full bg-transparent outline-none border-none text-white placeholder-white/80 text-base"
                />
            </div>
        </div>
    );
}
