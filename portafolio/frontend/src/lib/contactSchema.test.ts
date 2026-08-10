import { describe, expect, it } from "vitest";
import { contactSchema } from "./contactSchema";

const validPayload = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  industry: "Startup / product",
  projectType: "Product / web app",
  timeline: "",
  budget: "Not sure yet",
  message: "We need a focused product launch plan for a new internal tool.",
  website: "",
  locale: "en",
  intent: "product",
};

describe("contactSchema", () => {
  it("validates a good payload", () => {
    const parsed = contactSchema.parse({
      ...validPayload,
      name: "  Ada Lovelace  ",
      email: "  ada@example.com  ",
    });

    expect(parsed.name).toBe("Ada Lovelace");
    expect(parsed.email).toBe("ada@example.com");
  });

  it("rejects a bad email", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      email: "not-an-email",
    });

    expect(result.success).toBe(false);
  });

  it("allows the honeypot field through schema validation", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      website: "https://bot.example",
    });

    expect(result.success).toBe(true);
  });

  it("accepts missing intent and locale as optional input fields", () => {
    const { intent: _intent, locale: _locale, ...payload } = validPayload;
    const parsed = contactSchema.parse(payload);

    expect(parsed.intent).toBe("");
    expect(parsed.locale).toBe("");
  });
});
