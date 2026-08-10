import { z } from "zod";
import { LOCALES } from "@/content/config";
import { en } from "@/content/dictionaries/en";
import { es } from "@/content/dictionaries/es";

const ALLOWED_INDUSTRIES = new Set([...en.INDUSTRIES, ...es.INDUSTRIES]);
const ALLOWED_PROJECT_TYPES = new Set([
  ...en.PROJECT_TYPES,
  ...es.PROJECT_TYPES,
]);
const ALLOWED_TIMELINES = new Set([...en.TIMELINES, ...es.TIMELINES]);
const ALLOWED_BUDGETS = new Set([...en.BUDGETS, ...es.BUDGETS]);

const trimInput = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const trimmedString = (schema: z.ZodType<string>) =>
  z.preprocess(trimInput, schema);

const optionalSelect = (allowed: ReadonlySet<string>, label: string) =>
  trimmedString(
    z.string().max(80).refine((value) => value === "" || allowed.has(value), {
      message: `Invalid ${label}`,
    })
  );

const requiredSelect = (allowed: ReadonlySet<string>, label: string) =>
  trimmedString(
    z
      .string()
      .min(1, `Invalid ${label}`)
      .max(80)
      .refine((value) => allowed.has(value), {
        message: `Invalid ${label}`,
      })
  );

export const contactSchema = z.object({
  name: trimmedString(z.string().min(2, "Invalid name").max(120)),
  email: trimmedString(z.string().email("Invalid email").max(200)),
  company: trimmedString(z.string().max(160)),
  industry: optionalSelect(ALLOWED_INDUSTRIES, "industry"),
  projectType: optionalSelect(ALLOWED_PROJECT_TYPES, "project type"),
  timeline: optionalSelect(ALLOWED_TIMELINES, "timeline"),
  budget: requiredSelect(ALLOWED_BUDGETS, "budget"),
  message: trimmedString(z.string().min(10, "Invalid message").max(4000)),
  website: trimmedString(z.string().max(200)),
  locale: trimmedString(
    z.string().max(8).refine(
      (value) => value === "" || (LOCALES as readonly string[]).includes(value),
      { message: "Invalid locale" }
    )
  ),
  intent: trimmedString(z.string().max(120)),
});

export type ContactPayload = z.infer<typeof contactSchema>;
