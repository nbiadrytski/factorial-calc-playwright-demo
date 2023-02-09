import { Response } from "@playwright/test";

export class InterceptedResponse {
  static async getBody(response: Response): Promise<string> {
    const responseBody = await response.body();
    return responseBody.toString();
  }

  static async getBodyJson(response: Response): Promise<any> {
    return await response.json();
  }

  static async getStatus(response: Response): Promise<number> {
    return await response.status();
  }
}
