import type { ReactElement, ReactNode, SVGProps } from "react";
import type { PricingFeatureIcon } from "@/content/dictionaries/types";

export type { PricingFeatureIcon };
type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

const ICONS: Record<PricingFeatureIcon, (props: IconProps) => ReactElement> = {
  layout: (p) => (
    <Base {...p}>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path d="M3.5 9h17M9 9v11" />
    </Base>
  ),
  message: (p) => (
    <Base {...p}>
      <path d="M5 19.5 7.2 16H18a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 18 4H6A2.5 2.5 0 0 0 3.5 6.5v10A2.5 2.5 0 0 0 5 19.5Z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </Base>
  ),
  copy: (p) => (
    <Base {...p}>
      <path d="M7 7.5h10M7 11h8M7 14.5h6" />
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </Base>
  ),
  globe: (p) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="8" />
      <path d="M4.5 12h15M12 4c2.2 2.4 3.3 5 3.3 8s-1.1 5.6-3.3 8c-2.2-2.4-3.3-5-3.3-8s1.1-5.6 3.3-8Z" />
    </Base>
  ),
  search: (p) => (
    <Base {...p}>
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 3.5 3.5" />
    </Base>
  ),
  rocket: (p) => (
    <Base {...p}>
      <path d="M12 19c-2-.2-4.5-1.8-5.5-4.2 1.8-.4 3.4-1.2 4.6-2.3 1.2 1.1 2.8 1.9 4.6 2.3C14.7 17.2 13 18.8 12 19Z" />
      <path d="M9.5 12.5C8 9.5 8.2 6.2 12 3.5c3.8 2.7 4 6 2.5 9" />
      <path d="M9.2 14.8 7 18.5M14.8 14.8 17 18.5" />
    </Base>
  ),
  form: (p) => (
    <Base {...p}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 9h8M8 12.5h8M8 16h5" />
    </Base>
  ),
  key: (p) => (
    <Base {...p}>
      <circle cx="8.5" cy="12" r="3.5" />
      <path d="M12 12h8m-3-2.5V12m0 0v2.5" />
    </Base>
  ),
  support: (p) => (
    <Base {...p}>
      <path d="M8 17.5v1a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1" />
      <path d="M6.5 14a5.5 5.5 0 0 1 11 0" />
      <path d="M4.5 14v-1.2A7.5 7.5 0 0 1 12 5.5a7.5 7.5 0 0 1 7.5 7.3V14" />
    </Base>
  ),
  pages: (p) => (
    <Base {...p}>
      <rect x="5" y="3.5" width="10" height="14" rx="1.5" />
      <path d="M9 5.5h10.5A1.5 1.5 0 0 1 21 7v12.5A1.5 1.5 0 0 1 19.5 21H9" />
    </Base>
  ),
  palette: (p) => (
    <Base {...p}>
      <path d="M12 4a8 8 0 1 0 0 16h1.2a2.3 2.3 0 0 0 2.2-2.8 2.3 2.3 0 0 1 2.2-2.9H18a4 4 0 0 0 0-8h-.4A8 8 0 0 0 12 4Z" />
      <circle cx="8.2" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="11" cy="7.8" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
    </Base>
  ),
  motion: (p) => (
    <Base {...p}>
      <path d="m5 16 4.5-8.5L13 13l2.5-4.5L19 16" />
      <path d="M4 19h16" />
    </Base>
  ),
  shield: (p) => (
    <Base {...p}>
      <path d="M12 3.5 19 6.5v5.2c0 4.3-2.9 7.4-7 8.8-4.1-1.4-7-4.5-7-8.8V6.5L12 3.5Z" />
      <path d="m9.5 12 1.8 1.8 3.4-3.6" />
    </Base>
  ),
  chart: (p) => (
    <Base {...p}>
      <path d="M4.5 19.5h15" />
      <path d="M7 16v-4.5M12 16V8M17 16v-7" />
    </Base>
  ),
  layers: (p) => (
    <Base {...p}>
      <path d="m12 4 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4M4 16l8 4 8-4" />
    </Base>
  ),
  code: (p) => (
    <Base {...p}>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" />
    </Base>
  ),
  crm: (p) => (
    <Base {...p}>
      <circle cx="9" cy="9" r="3" />
      <circle cx="16.5" cy="10" r="2.2" />
      <path d="M3.5 18.5c.7-3 2.8-4.5 5.5-4.5s4.8 1.5 5.5 4.5M14 18.2c.4-1.7 1.6-2.7 3.2-2.7 1.2 0 2.2.5 2.8 1.5" />
    </Base>
  ),
  lock: (p) => (
    <Base {...p}>
      <rect x="5.5" y="10.5" width="13" height="9" rx="2" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </Base>
  ),
  database: (p) => (
    <Base {...p}>
      <ellipse cx="12" cy="6.5" rx="7" ry="2.5" />
      <path d="M5 6.5v11c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-11" />
      <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </Base>
  ),
  panel: (p) => (
    <Base {...p}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M3.5 9h17M9 9v10.5" />
      <path d="M12 12.5h5.5M12 15.5h4" />
    </Base>
  ),
  ads: (p) => (
    <Base {...p}>
      <path d="m5 15 5-10h4l5 10" />
      <path d="M8 15h8M10.5 10.5h3" />
      <circle cx="7" cy="18" r="1.2" />
      <circle cx="17" cy="18" r="1.2" />
    </Base>
  ),
  test: (p) => (
    <Base {...p}>
      <path d="M9 3.5h6M10 3.5v5.2L5.8 17a2.3 2.3 0 0 0 2 3.4h8.4a2.3 2.3 0 0 0 2-3.4L14 8.7V3.5" />
      <path d="M8.5 13.5h7" />
    </Base>
  ),
  hours: (p) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5l3 2" />
    </Base>
  ),
  pulse: (p) => (
    <Base {...p}>
      <path d="M3.5 12h3.2l2-5 3.5 10 2.3-5H20.5" />
    </Base>
  ),
  roadmap: (p) => (
    <Base {...p}>
      <path d="M6 5v14M6 7h9l-1.5 2.5L15 12H6M6 16h8l-1.2 2 1.2 2H6" />
    </Base>
  ),
  chat: (p) => (
    <Base {...p}>
      <path d="M7 18.5 5 21V8.5A2.5 2.5 0 0 1 7.5 6h9A2.5 2.5 0 0 1 19 8.5v7A2.5 2.5 0 0 1 16.5 18H7Z" />
      <path d="M9 10.5h6M9 13.5h4" />
    </Base>
  ),
  calendar: (p) => (
    <Base {...p}>
      <rect x="4" y="5.5" width="16" height="14" rx="2" />
      <path d="M8 3.5v4M16 3.5v4M4 10h16" />
    </Base>
  ),
  bug: (p) => (
    <Base {...p}>
      <path d="M8 9.5a4 4 0 0 1 8 0v5a4 4 0 0 1-8 0v-5Z" />
      <path d="M12 5.5V4M7 8.5 5 7M17 8.5 19 7M5 12.5h2M17 12.5h2M7 16.5 5 18M17 16.5 19 18" />
    </Base>
  ),
};

export function PricingFeatureGlyph({
  name,
  className,
}: {
  name: PricingFeatureIcon;
  className?: string;
}) {
  const Icon = ICONS[name] ?? ICONS.layers;
  return <Icon className={className} />;
}
