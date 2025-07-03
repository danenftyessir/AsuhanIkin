import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      disabled,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "btn transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      outline: "btn-outline",
      ghost: "hover:bg-gray-100",
    };

    const sizes = {
      sm: "btn-sm",
      md: "",
      lg: "px-8 py-3 text-lg",
    };

    const classes = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      fullWidth && "btn-full",
      className
    );

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={classes}
        {...props}
      >
        {loading && (
          <span className="loading-spinner" style={{ marginRight: "0.5rem" }}>
            ⏳
          </span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
