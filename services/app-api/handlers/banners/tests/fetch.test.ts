import { fetchBanner } from "../fetch";
import { APIGatewayProxyEvent } from "aws-lambda";
import { proxyEvent, testBanner } from "./proxyEvent";
import dynamoDb from "../../../libs/dynamodb-lib";
import { Errors, StatusCodes } from "../../../utils/constants/constants";
import { mockDocumentClient } from "../../../utils/testing/setupJest";

jest.mock("../../../libs/authorization", () => ({
  isAuthorized: jest.fn().mockReturnValue(true),
  hasPermissions: jest.fn().mockReturnValue(true),
}));

jest.mock("../../../libs/debug-lib", () => ({
  init: jest.fn(),
  flush: jest.fn(),
}));

jest.spyOn(dynamoDb, "get").mockImplementation(
  mockDocumentClient.get.promise.mockReturnValue({
    Item: {
      ...testBanner,
      createdAt: new Date().getTime(),
      lastAltered: new Date().getTime(),
    },
  })
);

const testEvent: APIGatewayProxyEvent = {
  ...proxyEvent,
  headers: { "cognito-identity-id": "test" },
  pathParameters: { bannerId: "testKey" },
};

describe("Test fetchBanner API method", () => {
  test("Test Report not found Fetch", async () => {
    jest.spyOn(dynamoDb, "get").mockImplementation(
      mockDocumentClient.get.promise.mockReturnValueOnce({
        Item: undefined,
      })
    );
    const res = await fetchBanner(testEvent, null);
    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(JSON.parse(res.body).status).toBe(StatusCodes.NOT_FOUND);
  });

  test("Test Successful Banner Fetch", async () => {
    const res = await fetchBanner(testEvent, null);
    const parsedBody = JSON.parse(res.body);
    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(parsedBody.status).toBe(StatusCodes.SUCCESS);
    expect(parsedBody.body.Item.title).toEqual(testBanner.title);
    expect(parsedBody.body.Item.description).toEqual(testBanner.description);
    expect(parsedBody.body.Item.startDate).toEqual(testBanner.startDate);
    expect(parsedBody.body.Item.endDate).toEqual(testBanner.endDate);
    expect(parsedBody.body.Item.link).toEqual(testBanner.link);
  });

  test("Test bannerKey not provided throws 500 error", async () => {
    const noKeyEvent: APIGatewayProxyEvent = {
      ...testEvent,
      pathParameters: {},
    };
    const res = await fetchBanner(noKeyEvent, null);

    expect(res.statusCode).toBe(StatusCodes.SERVER_ERROR);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test bannerKey empty throws 500 error", async () => {
    const noKeyEvent: APIGatewayProxyEvent = {
      ...testEvent,
      pathParameters: { bannerId: "" },
    };
    const res = await fetchBanner(noKeyEvent, null);

    expect(res.statusCode).toBe(StatusCodes.SERVER_ERROR);
    expect(res.body).toContain(Errors.NO_KEY);
  });
});
