import { useEffect, useRef, useState } from "react";
import dropdownCss from "./MyDropdown.module.css";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

type SingleDropdownProps<T> = {
      dropdownLabel?: string;
      items: T[];
      getValue: (item: T) => string
      getLabel: (item: T) => string
      getImageUrl?: (item: T) => string | null | undefined
      value?: string;
      placeholder?: string;
      disabled?: boolean;
      loading?: boolean;
      onChange?: (value: string) => void
}

export default function SingleDropdown<T>({
      dropdownLabel,
      items,
      getValue,
      getLabel,
      getImageUrl,
      value,
      placeholder = "-- Select --",
      disabled = false,
      loading = false,
      onChange
}: SingleDropdownProps<T>) {
      const [ open, setOpen ] = useState(false);
      const containerRef = useRef<HTMLDivElement>(null);

      // đóng dropdown khi click ra ngoài
      useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                  if (!containerRef.current?.contains(e.target as Node)) {
                        setOpen(false)
                  }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

      const selectedItem = items.find(i => getValue(i) === value);
      const handleSelect = (val: string) => {
            onChange?.(val)
            setOpen(false)
      }

      return (
            <div ref={containerRef} className={`${dropdownCss.dropdown} ${disabled ? dropdownCss.disabled : ""}`}>
                  {/* label */}
                  {dropdownLabel && (
                        <label className={dropdownCss.label}>
                              {dropdownLabel}
                        </label>
                  )}
                  
                  {/* control */}
                  <div className={dropdownCss.control} onClick={() => !disabled && setOpen(v => !v)}>
                        {loading ? ("Loading...") : selectedItem ? (
                              <div className="flex items-center gap-2">
                                    {getImageUrl && getImageUrl(selectedItem) && (
                                          <Image src={getImageUrl(selectedItem)!}
                                                className="rounded-sm object-cover"
                                                alt={getLabel(selectedItem)}
                                          width={18} height={18}/>
                                    )}
                                    <span>{getLabel(selectedItem)}</span>
                              </div>
                        ) : (
                              placeholder
                        )}
                        <span><ChevronDown size={15} /></span>
                  </div>

                  {/* menu */}
                  { open && (
                        <ul className={`${dropdownCss.menu} ${open ? dropdownCss.open : ""}`}>
                              {items.map(item => {
                                    const val = getValue(item);
                                    const label = getLabel(item);

                                    return (
                                          <li key={val}
                                                className={`${dropdownCss.item} ${
                                                      value === val ? dropdownCss.selected : ""
                                                }`}
                                                onClick={() => handleSelect(val)}
                                          >
                                                {getImageUrl && getImageUrl(item) && (
                                                      <Image src={getImageUrl(item)!} className="rounded-sm object-cover" alt={label}
                                                      width={18} height={18}></Image>
                                                )}
                                                <span>{ label }</span>
                                          </li>
                                    )
                              })}
                        </ul>
                  )}
            </div>
      )
}

