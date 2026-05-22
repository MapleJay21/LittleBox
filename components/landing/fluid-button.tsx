import type { CSSProperties } from "react";

type FluidButtonProps = {
  text: string;
  onClick?: () => void;
  navTo?: string;
  className?: string;
  firstTextColor?: string;
  secondTextColor?: string;
  overlayColor?: string;
  borderColor?: string;
  style?: CSSProperties;
};

export function FluidButton({
  text,
  onClick,
  navTo,
  className,
  firstTextColor = "rgb(250, 250, 250)",
  secondTextColor = "rgb(1, 1, 1)",
  overlayColor = "rgb(250, 250, 250)",
  borderColor = "rgb(250, 250, 250)",
  style,
}: FluidButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-nav-to={navTo}
      className={`fluid-button ${className ?? ""}`.trim()}
      style={
        {
          "--fb-first-text": firstTextColor,
          "--fb-second-text": secondTextColor,
          "--fb-overlay": overlayColor,
          "--fb-border": borderColor,
          ...style,
        } as CSSProperties
      }
    >
      <span className="fluid-button__label-stack">
        <span className="fluid-button__label fluid-button__label--top">{text}</span>
        <span className="fluid-button__label fluid-button__label--bottom">{text}</span>
      </span>
      <span className="fluid-button__overlay" />
    </button>
  );
}
