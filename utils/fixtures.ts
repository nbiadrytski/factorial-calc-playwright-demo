import { test as base } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { PrivacyPage } from "../pages/privacy-page";
import { TermsAndConditionsPage } from "../pages/terms-and-conditions-page";

type Fixtures = {
  homePage: HomePage;
  privacyPage: PrivacyPage;
  termsPage: TermsAndConditionsPage;
  saveLogs: void;
};

export const fixtures = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await use(homePage);
  },
  privacyPage: async ({ page }, use) => {
    const privacyPage = new PrivacyPage(page);
    await privacyPage.navigate();
    await use(privacyPage);
  },
  termsPage: async ({ page }, use) => {
    const termsPage = new TermsAndConditionsPage(page);
    await termsPage.navigate();
    await use(termsPage);
  },
});
