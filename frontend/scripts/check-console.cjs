const { chromium } = require("playwright");

const routes = [
  "/",
  "/about",
  "/research",
  "/events",
  "/publications",
  "/membership/become-a-member",
  "/admin/subscribers",
];

const ignoredMessages = [
  "Reduced Motion enabled",
  "Download the React DevTools",
  "favicon.ico",
  "GL Driver Message",
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  await context.addInitScript(() => {
    const addExtensionAttributes = () => {
      if (!document.body) return false;
      document.body.setAttribute("data-new-gr-c-s-check-loaded", "14.1320.0");
      document.body.setAttribute("data-gr-ext-installed", "");
      return true;
    };

    if (!addExtensionAttributes()) {
      const target = document.documentElement || document;
      new MutationObserver((_, observer) => {
        if (addExtensionAttributes()) observer.disconnect();
      }).observe(target, { childList: true, subtree: true });
    }
  });

  const failures = [];

  for (const route of routes) {
    const page = await context.newPage();
    const messages = [];

    page.on("console", (message) => {
      const text = message.text();
      if (
        ["error", "warning"].includes(message.type()) &&
        !ignoredMessages.some((ignored) => text.includes(ignored))
      ) {
        messages.push(`${message.type()}: ${text}`);
      }
    });

    page.on("pageerror", (error) => {
      messages.push(`pageerror: ${error.message}`);
    });

    const response = await page.goto(`http://127.0.0.1:3000${route}`, {
      waitUntil: "networkidle",
      timeout: 45000,
    });

    if (!response || !response.ok()) {
      messages.push(`navigation: ${response ? response.status() : "no response"}`);
    }

    await page.waitForTimeout(1200);

    if (messages.length > 0) {
      failures.push({ route, messages });
    }

    await page.close();
  }

  await browser.close();

  if (failures.length > 0) {
    console.log(JSON.stringify(failures, null, 2));
    process.exit(1);
  }

  console.log(`Playwright console check passed for routes: ${routes.join(", ")}`);
})();
