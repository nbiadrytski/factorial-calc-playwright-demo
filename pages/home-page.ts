import { expect, Locator, Page, Response } from "@playwright/test";
import { BasePage } from "./base-page";
import { HomePageSelectors } from "../utils/selectors";
import { Endpoints } from "../utils/constants";

export class HomePage extends BasePage {
  readonly enterIntegerInput: Locator;
  readonly calculateButton: Locator;
  readonly calculationResultText: Locator;
  readonly privacyLink: Locator;
  readonly termsAndConditionsLink: Locator;
  readonly qxf2ServicesLink: Locator;

  constructor(page: Page) {
    super(page);
    this.enterIntegerInput = page.getByPlaceholder(HomePageSelectors.enterIntegerInput);
    this.calculateButton = page.locator(HomePageSelectors.calculateButton);
    this.calculationResultText = page.locator(HomePageSelectors.calculationResultText);
    this.privacyLink = page.getByRole("link", { name: "Terms and Conditions" });
    this.termsAndConditionsLink = page.getByRole("link", { name: "Privacy" });
    this.qxf2ServicesLink = page.getByRole("link", { name: "Qxf2 Services" });
  }

  async navigate(): Promise<void> {
    await super.navigate(".");
    await expect(this.page).toHaveTitle("Factoriall");
  }

  async calculateFactorial(value: string, getResponse: boolean): Promise<Response> {
    await this.enterIntegerInput.fill(value);
    if (getResponse) {
      return await this.waitForResponseByUrlAndClick(Endpoints.FACTORIAL, this.calculateButton);
    } else {
      await this.calculateButton.click();
      this.logger.info(`Clicked ${this.calculateButton}`);
      return;
    }
  }

  async openLegalLink(endpoint: Endpoints, linkLocator: Locator, getResponse: boolean): Promise<Response> {
    if (getResponse) {
      const response = await this.waitForResponseByUrlAndClick(endpoint, linkLocator);
      await this.assertLegalPageIsOpened(endpoint);
      return response;
    } else {
      await linkLocator.click();
      await this.assertLegalPageIsOpened(endpoint);
      return;
    }
  }

  private async assertLegalPageIsOpened(endpoint: Endpoints): Promise<void> {
    await expect(this.page).toHaveURL(endpoint);
    this.logger.info(`Opened ${endpoint} page`);
  }
}
