import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));

const server = await createServer({
  root,
  configFile: fileURLToPath(new URL("../vitest.config.ts", import.meta.url)),
  logLevel: "error",
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { contactSchema } = await server.ssrLoadModule(
    "/src/lib/contactSchema.ts"
  );

  const payload = {
    name: "Smoke Tester",
    email: "smoke@example.com",
    company: "",
    industry: "",
    projectType: "Product / web app",
    timeline: "",
    budget: "Not sure yet",
    message: "Smoke validation checks the contact schema still loads.",
    website: "",
  };

  const parsed = contactSchema.parse(payload);
  assert.equal(parsed.email, payload.email);
  assert.equal(parsed.intent, "");
  assert.equal(parsed.locale, "");

  const invalid = contactSchema.safeParse({ ...payload, email: "invalid" });
  assert.equal(invalid.success, false);

  console.log("[smoke-contact-schema] ok");
} finally {
  await server.close();
}
