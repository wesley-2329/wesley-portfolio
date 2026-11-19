import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "subtle";

const styles: Record<Variant, string> = {
  primary:
    "bg-fg text-ink hover:bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_30px_-6px_rgba(142,123,255,0.45)]",
  ghost: "border border-line-strong bg-white/[0.02] text-fg hover:border-white/30 hover:bg-white/[0.06] backdrop-blur-md",
  subtle: "text-fg-muted hover:text-fg",
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
};

/** Pill link-button with a sliding label on hover. */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  { variant = "primary", icon, className, children, ...rest },
  ref
) {
  return (
    <a
      ref={ref}
      className={cn(
        "group relative inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-full px-6 text-sm font-medium transition-[background-color,border-color,color,box-shadow] duration-300",
        styles[variant],
        className
      )}
      {...rest}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-expo group-hover:-translate-y-full">{children}</span>
        <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-expo group-hover:translate-y-0">
          {children}
        </span>
      </span>
      {icon && (
        <span className="transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          {icon}
        </span>
      )}
    </a>
  );
});
