import { LucideIcon } from "lucide-react";
import toolipBtnCss from "./tooltipButton.module.css";

type TooltipButtonProps = {
      text: string;
      icon: LucideIcon;
      size?: number;
      fgColor?: string;
      bgColor?: string;
      onClick?: () => void;
}

export default function TooltipButton({
      text,
      icon: Icon,
      size = 20,
      fgColor = '#424242',
      bgColor = '#f6f8fa',
      onClick
}: TooltipButtonProps) {
      return (
            <button className={toolipBtnCss.button} onClick={onClick}
            style={{ "--tooltip-bg-color": bgColor, "--tooltip-fg-color": fgColor} as React.CSSProperties}>
                  <span className={toolipBtnCss.tooltip}>{text}</span>
                  <Icon size={size} />
            </button>
      );
}