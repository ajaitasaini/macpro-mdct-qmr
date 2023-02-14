import * as PMD from "./data";
import * as QMR from "components";
import * as CMQ from "measures/2022/shared/CommonQuestions";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { FormData } from "./types";
import { validationFunctions } from "./validation";
import { AABRateCalculation } from "utils/rateFormulas";
import { getPerfMeasureRateArray } from "measures/2022/shared/globalValidations";

export const AABAD = ({
  name,
  year,
  measureId,
  setValidationFunctions,
  isNotReportingData,
  isPrimaryMeasureSpecSelected,
  showOptionalMeasureStrat,
  isOtherMeasureSpecSelected,
}: QMR.MeasureWrapperProps) => {
  const { watch } = useFormContext<FormData>();
  const data = watch();

  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions(validationFunctions);
    }
  }, [setValidationFunctions]);

  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);

  return (
    <>
      <CMQ.Reporting
        reportingYear={year}
        measureName={name}
        measureAbbreviation={measureId}
      />

      {!isNotReportingData && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type="HEDIS" />
          <CMQ.DataSource />
          <CMQ.DateRange type="adult" />
          <CMQ.DefinitionOfPopulation />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure
                data={PMD.data}
                rateCalc={AABRateCalculation}
              />
              <CMQ.DeviationFromMeasureSpec categories={PMD.categories} />
            </>
          )}
          {isOtherMeasureSpecSelected && (
            <CMQ.OtherPerformanceMeasure
              data={PMD.data}
              rateCalc={AABRateCalculation}
            />
          )}
          <CMQ.CombinedRates />
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              performanceMeasureArray={performanceMeasureArray}
              qualifiers={PMD.qualifiers}
              categories={PMD.categories}
              adultMeasure
              rateCalc={AABRateCalculation}
              customPrompt={PMD.data.customPrompt}
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
