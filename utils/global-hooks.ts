import { test } from "@playwright/test";

export function setupGlobalHooks(): void {
  test.beforeEach(({}, testInfo) => {
    console.log(`Running test: ${testInfo.title}`);
  });
}
