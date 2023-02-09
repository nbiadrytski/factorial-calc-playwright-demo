import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { Endpoints, ErrorMessages } from "../utils/constants";
import { assertResponseBodyAndStatus, assertResponseBodyJsonAndStatus, assertStatusCode } from "../utils/assertions";
import { fixtures as testFactorial } from "../utils/fixtures";
import { setupGlobalHooks } from "../utils/global-hooks";

setupGlobalHooks();

async function assertCalculationResultText(page: HomePage, expectedText: string): Promise<void> {
  await expect.soft(page.calculationResultText, ErrorMessages.WRONG_CALC_RESULT).toHaveText(expectedText);
}

test.describe("Factorial calculation", () => {
  const validFactorialValues = [
    { value: "0", result: 1 },
    { value: "1", result: 1 },
    { value: "100", result: 9.332621544394415e157 },
  ];
  validFactorialValues.forEach((dataset) => {
    testFactorial(`factorial calculation of a valid integer: ${dataset.value}`, async ({ homePage }) => {
      const response = await homePage.calculateFactorial(dataset.value, true);
      await assertResponseBodyJsonAndStatus(response, { answer: dataset.result });
      await assertCalculationResultText(homePage, `The factorial of ${dataset.value} is: ${dataset.result}`);
    });
  });

  const nonIntegerValues = ["9.99", "text", "!", "    ", ""];
  for (const value of nonIntegerValues) {
    testFactorial(`UI response on entering non-integer value: ${value}`, async ({ homePage }) => {
      await homePage.calculateFactorial(value, false);
      await assertCalculationResultText(homePage, "Please enter an integer");
    });
  }

  testFactorial("factorial calculation of a negative integer", async ({ homePage }) => {
    const response = await homePage.calculateFactorial("-3", true);
    // This is a bug. Display a message something like 'Integer value must be > or === 0'. Return 400
    await assertStatusCode(response, 500);
  });
});

test.describe("Open Home page legal links", () => {
  testFactorial("Privacy page is opened by clicking Privacy link", async ({ homePage }) => {
    const response = await homePage.openLegalLink(Endpoints.PRIVACY, homePage.privacyLink, true);
    await assertResponseBodyAndStatus(
      response,
      "This is the privacy document. We are not yet ready with it. Stay tuned!",
    );
  });

  testFactorial("Terms page is opened by clicking Terms link", async ({ homePage }) => {
    const response = await homePage.openLegalLink(Endpoints.TERMS, homePage.termsAndConditionsLink, true);
    await assertResponseBodyAndStatus(
      response,
      "This is the terms and conditions document. We are not yet ready with it. Stay tuned!",
    );
  });

  testFactorial(
    "qxf2.com page is opened by clicking Qxf2 Services link. User can navigate back to home page",
    async ({ page, homePage }) => {
      await homePage.openLegalLink(Endpoints.QXF2_SERVICES, homePage.qxf2ServicesLink, false);
      page.goBack({ waitUntil: "domcontentloaded" });
      await expect(page).toHaveURL(Endpoints.BASE_URL);
    },
  );
});
