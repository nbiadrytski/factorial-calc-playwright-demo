import { expect, Locator, Response } from "@playwright/test";
import { InterceptedResponse } from "./http-utils/intercepted-response";
import { ErrorMessages } from "./constants";
import { Logger as logger } from "./logger";

export async function assertStatusCode(response: Response, statusCode = 200): Promise<void> {
  expect.soft(await InterceptedResponse.getStatus(response), ErrorMessages.WRONG_STATUS_CODE).toEqual(statusCode);
}

export async function assertResponseBodyJson(response: Response, expectedResponseJson: any): Promise<void> {
  expect
    .soft(await InterceptedResponse.getBodyJson(response), ErrorMessages.RESPONSE_SHOULD_EQUAL)
    .toEqual(expectedResponseJson);
}

export async function assertResponseBody(response: Response, expectedResponse: string): Promise<void> {
  expect
    .soft(await InterceptedResponse.getBody(response), ErrorMessages.RESPONSE_SHOULD_EQUAL)
    .toEqual(expectedResponse);
}

export async function assertResponseBodyAndStatus(
  response: Response,
  expectedResponse: string,
  statusCode = 200,
): Promise<void> {
  await assertStatusCode(response, statusCode);
  await assertResponseBody(response, expectedResponse);
}

export async function assertResponseBodyJsonAndStatus(
  response: Response,
  expectedResponseJson: any,
  statusCode = 200,
): Promise<void> {
  await assertStatusCode(response, statusCode);
  await assertResponseBodyJson(response, expectedResponseJson);
}

export async function assertElementIsVisible(element: Locator): Promise<void> {
  await expect(element).toBeVisible();
  logger.debug(`Element ${element} is visible`);
}
