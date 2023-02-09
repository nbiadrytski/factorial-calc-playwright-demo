import { Locator, Page, Response } from "@playwright/test";
import Logger from "../utils/logger";

export class BasePage {
  readonly page: Page;
  logger: typeof Logger;

  constructor(page: Page) {
    this.page = page;
    this.logger = Logger;
  }

  async navigate(url?: string): Promise<void> {
    await this.page.goto(url);
    this.logger.info(`Navigated to ${url}`);
  }

  async waitForResponseByUrlAndClick(url: string, elementToClick: Locator): Promise<Response> {
    const responsePromise = this.page.waitForResponse((response) => response.url().includes(url));
    elementToClick.click();
    this.logger.info(`Clicked ${elementToClick}`);
    return await responsePromise;
  }
}
