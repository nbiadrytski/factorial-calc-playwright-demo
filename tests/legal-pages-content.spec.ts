import { test } from "@playwright/test";
import { fixtures as testLegalPageContent } from "../utils/fixtures";
import { setupGlobalHooks } from "../utils/global-hooks";
import { assertElementIsVisible } from "../utils/assertions";

setupGlobalHooks();

test.describe("Legal pages", () => {
  testLegalPageContent("Privacy page main text is visible", async ({ privacyPage }) => {
    await assertElementIsVisible(privacyPage.privacyPageMainText);
  });

  testLegalPageContent("Terms page main text is visible", async ({ termsPage }) => {
    await assertElementIsVisible(termsPage.termsAndConditionsPageMainText);
  });
});
