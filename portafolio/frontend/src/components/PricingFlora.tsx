/** Decorative vines + blooms for the pricing pin — edges only, never over copy. */

type Props = {
  leftClassName: string;
  rightClassName: string;
  bloomClassName: string;
};

export default function PricingFlora({
  leftClassName,
  rightClassName,
  bloomClassName,
}: Props) {
  return (
    <>
      <svg
        className={leftClassName}
        viewBox="0 0 120 640"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M38 620 C22 520 70 470 48 380 C28 300 62 250 44 170 C30 110 58 70 52 18"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M48 380 C78 360 92 330 86 300"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M44 170 C18 155 8 120 22 95"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          opacity="0.88"
        />
        <ellipse
          cx="86"
          cy="308"
          rx="16"
          ry="8"
          transform="rotate(-28 86 308)"
          fill="currentColor"
          opacity="0.5"
        />
        <ellipse
          cx="20"
          cy="102"
          rx="14"
          ry="7"
          transform="rotate(24 20 102)"
          fill="currentColor"
          opacity="0.48"
        />
        <ellipse
          cx="62"
          cy="248"
          rx="13"
          ry="6.5"
          transform="rotate(-12 62 248)"
          fill="currentColor"
          opacity="0.45"
        />
        <g transform="translate(48 48)" opacity="0.9">
          <circle cx="0" cy="0" r="3.8" fill="currentColor" />
          <ellipse cx="0" cy="-9" rx="4" ry="8" fill="currentColor" opacity="0.7" />
          <ellipse cx="8" cy="-3" rx="4" ry="8" transform="rotate(72)" fill="currentColor" opacity="0.7" />
          <ellipse cx="5" cy="7" rx="4" ry="8" transform="rotate(144)" fill="currentColor" opacity="0.7" />
          <ellipse cx="-5" cy="7" rx="4" ry="8" transform="rotate(216)" fill="currentColor" opacity="0.7" />
          <ellipse cx="-8" cy="-3" rx="4" ry="8" transform="rotate(288)" fill="currentColor" opacity="0.7" />
        </g>
      </svg>

      <svg
        className={rightClassName}
        viewBox="0 0 120 640"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M78 40 C96 130 48 190 72 280 C94 360 52 420 70 510 C82 560 54 600 60 630"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M72 280 C42 295 28 330 36 360"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M70 510 C98 525 108 560 94 590"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.88"
        />
        <ellipse
          cx="34"
          cy="352"
          rx="15"
          ry="7.5"
          transform="rotate(30 34 352)"
          fill="currentColor"
          opacity="0.48"
        />
        <ellipse
          cx="96"
          cy="582"
          rx="13"
          ry="6.5"
          transform="rotate(-22 96 582)"
          fill="currentColor"
          opacity="0.45"
        />
        <g transform="translate(74 210)" opacity="0.88">
          <circle cx="0" cy="0" r="3.4" fill="currentColor" />
          <ellipse cx="0" cy="-8" rx="3.6" ry="7" fill="currentColor" opacity="0.7" />
          <ellipse cx="7" cy="-2" rx="3.6" ry="7" transform="rotate(72)" fill="currentColor" opacity="0.7" />
          <ellipse cx="4" cy="6" rx="3.6" ry="7" transform="rotate(144)" fill="currentColor" opacity="0.7" />
          <ellipse cx="-4" cy="6" rx="3.6" ry="7" transform="rotate(216)" fill="currentColor" opacity="0.7" />
          <ellipse cx="-7" cy="-2" rx="3.6" ry="7" transform="rotate(288)" fill="currentColor" opacity="0.7" />
        </g>
      </svg>

      <svg
        className={bloomClassName}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="40" cy="40" r="4" fill="currentColor" />
        <ellipse cx="40" cy="28" rx="5" ry="11" fill="currentColor" opacity="0.5" />
        <ellipse cx="51" cy="34" rx="5" ry="11" transform="rotate(72 51 34)" fill="currentColor" opacity="0.5" />
        <ellipse cx="48" cy="48" rx="5" ry="11" transform="rotate(144 48 48)" fill="currentColor" opacity="0.5" />
        <ellipse cx="32" cy="48" rx="5" ry="11" transform="rotate(216 32 48)" fill="currentColor" opacity="0.5" />
        <ellipse cx="29" cy="34" rx="5" ry="11" transform="rotate(288 29 34)" fill="currentColor" opacity="0.5" />
      </svg>
    </>
  );
}
