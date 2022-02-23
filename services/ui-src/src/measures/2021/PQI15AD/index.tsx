import * as Q from "./questions";
import * as CMQ from "../CommonQuestions";
import { useFormContext, useWatch } from "react-hook-form";
import { Measure } from "./validation/types";
import { useEffect } from "react";
import { validationFunctions } from "./validation/customValidationFunctions";
import { positiveNumbersWithMaxDecimalPlaces } from "utils/numberInputMasks";

export const PQI15AD = ({
  name,
  year,
  measureId,
  setValidationFunctions,
}: Measure.Props) => {
  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions(validationFunctions);
    }
  }, [setValidationFunctions]);

  const { getValues } = useFormContext<Measure.Form>();

  const data = getValues();

  const performanceMeasureArray = [data["PerformanceMeasure-AgeRates"]];

  // Watch Values of Form Questions
  const watchReportingRadio = useWatch<Measure.Form>({
    name: "DidReport",
  });
  const watchMeasureSpecification = useWatch<Measure.Form>({
    name: "MeasurementSpecification",
  });

  const watchOtherPerformanceMeasureRates = useWatch<Measure.Form>({
    name: "OtherPerformanceMeasure-Rates",
  });

  // Conditionals for Performance Measures
  const isAHRQ = watchMeasureSpecification === "AHRQ";

  const isOtherSpecification = watchMeasureSpecification === "Other";
  // Age Conditionals for Deviations from Measure Specifications/Optional Measure Stratification
  const showOtherPerformanceMeasureRates = !!watchOtherPerformanceMeasureRates;

  // Logic to conditionally show age groups in Deviations from Measure Specifications/Optional Measure Stratification
  const ageGroups = [{ label: "Ages 18 to 64", id: 0 }];

  if (showOtherPerformanceMeasureRates) {
    let otherRates = getValues("OtherPerformanceMeasure-Rates");
    otherRates.forEach((rate) => {
      if (rate.description) {
        ageGroups.push({ label: rate.description, id: ageGroups.length });
      }
    });
  }

  return (
    <>
      <CMQ.Reporting
        reportingYear={year}
        measureName={name}
        measureAbbreviation={measureId}
      />

      {!watchReportingRadio?.includes("No") && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type="AHRQ" />
          <Q.DataSource />
          <CMQ.DateRange type="adult" />
          <CMQ.DefinitionOfPopulation />
          {/* Show Performance Measure when HEDIS is selected from DataSource */}
          {isAHRQ && <Q.PerformanceMeasure />}
          {/* Show Deviation only when Other is not selected */}
          {isAHRQ && <Q.DeviationFromMeasureSpec />}
          {/* Show Other Performance Measures when isAHRQ is not true  */}
          {isOtherSpecification && (
            <CMQ.OtherPerformanceMeasure
              rateMultiplicationValue={100000}
              customMask={positiveNumbersWithMaxDecimalPlaces(1)}
            />
          )}
          <CMQ.CombinedRates />
          {(isAHRQ || showOtherPerformanceMeasureRates) && (
            <CMQ.OptionalMeasureStrat
              performanceMeasureArray={performanceMeasureArray}
              ageGroups={["Ages 18 to 39"]}
              adultMeasure
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
