import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import { measures } from "../dynamoUtils/measureList";
import { Measure } from "../../types";
import { Key } from "aws-sdk/clients/dynamodb";

export const listMeasures = handler(async (event, context) => {
  const state = event.pathParameters?.state;
  const year = event.pathParameters?.year as string;
  const coreSet = event.pathParameters?.coreSet;

  const params = {
    TableName: process.env.measureTableName!,
    ...convertToDynamoExpression(
      { state: state, year: parseInt(year), coreSet: coreSet },
      "list"
    ),
    ExclusiveStartKey: undefined as Key | undefined,
  };

  const scannedResults: any[] = [];
  let queryValue;

  do {
    queryValue = await dynamoDb.scan(params);
    queryValue?.Items?.forEach((v) => {
      const measure = measures[parseInt(year)]?.filter(
        (m) => m.measure === (v as Measure)?.measure
      )[0];

      scannedResults.push({
        ...v,
        autoCompleted: !!measure?.autocompleteOnCreation,
      });
    });

    params.ExclusiveStartKey = queryValue.LastEvaluatedKey;
  } while (queryValue.LastEvaluatedKey !== undefined);
  queryValue.Items = scannedResults;
  return queryValue;
});

export const getMeasure = handler(async (event, context) => {
  const dynamoKey = createCompoundKey(event);
  const params = {
    TableName: process.env.measureTableName!,
    Key: {
      compoundKey: dynamoKey,
      coreSet: event.pathParameters!.coreSet!,
    },
  };
  const queryValue = await dynamoDb.get(params);
  return queryValue;
});

export const getReportingYears = handler(async () => {
  const reportingYears = Object.keys(measures);
  return reportingYears;
});

export const getMeasureListInfo = handler(async () => {
  return measures;
});
