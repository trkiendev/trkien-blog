import { useEffect, useRef, useState } from "react";
import dropdownCss from "./MyDropdown.module.css";
import { ChevronDown } from "lucide-react";

type MultipleDropdownProps<T> = {
      items: T[]
      getValue: (item: T) => string
      getLabel: (item: T) => string
      value?: string[]
      placeholder?: string
      disabled?: boolean
      loading?: boolean
      onChange?: (value: string[]) => void
}

export default function MultipleDropdown<T>({
      items,
      getValue,
      getLabel,
      value = [],
      placeholder = "-- Select --",
      disabled = false,
      loading = false,
      onChange
}: MultipleDropdownProps<T>) { 
      const [ open, setOpen ] = useState(false);
      const containerRef = useRef<HTMLDivElement>(null);

      // đóng dropdown khi click ngoài
      useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                  if (!containerRef.current?.contains(e.target as Node)) {
                        setOpen(false);
                  }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

      const handleToggle = (val: string) => {
            let next: string[];
            
            const exists = value.includes(val);
            if(exists) {
                  next = value.filter(v => v !== val);
            } else {
                  next = [...value, val];
            }

            onChange?.(next);
      }

      // hiển thị label của các item đã chọn
      const selectedLabels = items.filter(i => value.includes(getValue(i)))
                                                .map(getLabel);

      return (
            <div ref={containerRef} className={`${dropdownCss.dropdown} ${disabled ? dropdownCss.disabled : ""}`}>
                  {/* control */}
                  <div className={dropdownCss.control} onClick={() => !disabled && setOpen(v => !v)}>
                        <div className={dropdownCss.values}>
                              {loading ? "Loading..." : selectedLabels.length ? selectedLabels.join(", ") : placeholder}
                              <ChevronDown size={15} />
                        </div>
                  </div>

                  {/* menu */}
                  { open && (
                        <ul className={`${dropdownCss.menu} ${open ? dropdownCss.open : ""}`}>
                              { items.map(item => {
                                    const val = getValue(item);
                                    const label = getLabel(item);
                                    const checked = value.includes(val);

                                    return (
                                          <li key={val}
                                                className={`${dropdownCss.item} ${
                                                      checked ? dropdownCss.selected : ""
                                                }`}
                                                onClick={() => handleToggle(val)}
                                          >
                                                <input type="checkbox" checked={checked} readOnly/>
                                                <span>{label}</span>
                                          </li>
                                    );
                              })}
                        </ul>
                  )}
            </div>
      )
      
}