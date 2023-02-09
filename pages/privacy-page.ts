import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { Endpoints } from "../utils/constants";
import { PrivacyPageSelectors } from "../utils/selectors";

export class PrivacyPage extends BasePage {
  readonly privacyPageMainText: Locator;

  constructor(page: Page) {
    super(page);
    this.privacyPageMainText = page.getByText(PrivacyPageSelectors.privacyPageMainText);
  }

  async navigate(): Promise<void> {
    await super.navigate(`${Endpoints.BASE_URL}/${Endpoints.PRIVACY}`);
    await expect(this.page).toHaveURL(Endpoints.PRIVACY);
  }
}
