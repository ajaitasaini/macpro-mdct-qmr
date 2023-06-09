import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import { MeasureStatus, CoreSetAbbr } from "../../types";

export const createMeasure = handler(async (event, context) => {
  const body = JSON.parse(event!.body!);
  const dynamoKey = createCompoundKey(event);
  const params = {
    TableName: process.env.measureTableName!,
    Item: {
      compoundKey: dynamoKey,
      state: event!.pathParameters!.state!,
      year: parseInt(event!.pathParameters!.year!),
      coreSet: event!.pathParameters!.coreSet! as CoreSetAbbr,
      measure: event!.pathParameters!.measure!,
      createdAt: Date.now(),
      lastAltered: Date.now(),
      lastAlteredBy: event.headers["cognito-identity-id"],
      status: MeasureStatus.INCOMPLETE,
      description: body.description ?? "",
      detailedDescription: body.detailedDescription ?? "",
      data: body.data,
      userCreated: body.userCreated,
      placeholder: body.placeholder,
    },
  };

  await dynamoDb.put(params);

  return params;
});
