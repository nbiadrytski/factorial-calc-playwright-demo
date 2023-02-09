import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { Endpoints } from "../utils/constants";
import { TermsAndConditionsPageSelectors } from "../utils/selectors";

export class TermsAndConditionsPage extends BasePage {
  readonly termsAndConditionsPageMainText: Locator;

  constructor(page: Page) {
    super(page);
    this.termsAndConditionsPageMainText = page.getByText(
      TermsAndConditionsPageSelectors.termsAndConditionsPageMainText,
    );
  }

  async navigate(): Promise<void> {
    await super.navigate(`${Endpoints.BASE_URL}/${Endpoints.TERMS}`);
    await expect(this.page).toHaveURL(Endpoints.TERMS);
  }
}
