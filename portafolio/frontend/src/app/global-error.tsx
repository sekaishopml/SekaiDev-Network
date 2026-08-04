"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#d6d6d6",
          color: "#111",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", padding: 32 }}>
          <h2 style={{ letterSpacing: "0.12em", fontWeight: 600 }}>
            SOMETHING WENT WRONG
          </h2>
          <p style={{ opacity: 0.7, marginTop: 12 }}>
            Please reload or try again in a moment.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 24,
              padding: "12px 28px",
              border: "1px solid #111",
              background: "transparent",
              letterSpacing: "0.16em",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            RETRY
          </button>
        </div>
      </body>
    </html>
  );
}
