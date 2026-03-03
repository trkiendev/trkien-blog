import React, { forwardRef, InputHTMLAttributes, useId } from "react";
import KitInputCss from "./KitInput.module.css";

interface KitInputProps
      extends InputHTMLAttributes<HTMLInputElement> {
      label: string;
}

const KitInput = forwardRef<HTMLInputElement, KitInputProps>(
      ({ label, className = "", id, ...props }, ref) => {
            const generatedId = useId();
            const inputId = id ?? generatedId;

            return (
                  <div className={KitInputCss.kitInput}>
                        <label htmlFor={inputId} className={KitInputCss.label}>
                              {label}
                        </label>
                        <input ref={ref} id={inputId} {...props} className={`${KitInputCss.input} ${className}`}/>
                  </div>
            );
      }
);

KitInput.displayName = "KitInput";

export default KitInput;