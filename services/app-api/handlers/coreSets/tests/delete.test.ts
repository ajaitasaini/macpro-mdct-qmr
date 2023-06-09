import { deleteCoreSet } from "../delete";
import db from "../../../libs/dynamodb-lib";
import { env } from "yargs";
import { testEvent, testMeasure } from "../../../test-util/testEvents";

jest.mock("../../../libs/dynamodb-lib", () => ({
  __esModule: true,
  default: {
    delete: jest.fn(),
    scan: jest.fn(),
  },
}));

jest.mock("../../../libs/authorization", () => ({
  __esModule: true,
  isAuthorized: jest.fn().mockReturnValue(true),
}));

jest.mock("../../../libs/debug-lib", () => ({
  __esModule: true,
  init: jest.fn(),
  flush: jest.fn(),
}));

jest.mock("../../dynamoUtils/createCompoundKey", () => ({
  __esModule: true,
  createCompoundKey: jest.fn().mockReturnValue("FL2020ACSFUA-AD"),
}));

jest.mock("../../../libs/updateCoreProgress", () => ({
  __esModule: true,
  updateCoreSetProgress: jest.fn(),
}));

jest.mock("../../dynamoUtils/createCompoundKey", () => ({
  __esModule: true,
  createCompoundKey: jest.fn().mockReturnValue("FL2020ACSFUA-AD"),
}));

describe("Testing Delete Core Set Functions", () => {
  beforeEach(() => {
    (db.scan as jest.Mock).mockReset();
    (db.delete as jest.Mock).mockReset();
  });

  test("Test deleteCoreSet with associated measures", async () => {
    (db.scan as jest.Mock).mockReturnValue({
      Items: [testMeasure, testMeasure, testMeasure],
    });

    await deleteCoreSet(
      {
        ...testEvent,
        pathParameters: { state: "FL", year: "2020", coreSet: "ACS" },
      },
      null
    );

    expect(db.scan).toHaveBeenCalled();
    expect(db.delete).toHaveBeenCalledTimes(4);
  });

  test("Test deleteCoreSet with no associated measures", async () => {
    (db.scan as jest.Mock).mockReturnValue({});

    await deleteCoreSet(
      {
        ...testEvent,
        pathParameters: { state: "FL", year: "2020", coreSet: "ACS" },
      },
      null
    );

    expect(db.scan).toHaveBeenCalled();
    expect(db.delete).toHaveBeenCalled();
  });
});
