import * as Types from "measures/2023/shared/CommonQuestions/types";

export interface FormData
  extends Types.DefinitionOfPopulation,
    Types.StatusOfData,
    Types.DateRange,
    Types.DidReport,
    Types.AdditionalNotes,
    Types.WhyAreYouNotReporting,
    Types.CombinedRates,
    Types.OtherPerformanceMeasure,
    Types.MeasurementSpecification,
    Types.PerformanceMeasure,
    Types.DeviationFromMeasureSpecification,
    Types.OptionalMeasureStratification {
  //DataSource
  "DataSource-CAHPS-Version": string;
  "DataSource-CAHPS-Version-Other": string;
}
