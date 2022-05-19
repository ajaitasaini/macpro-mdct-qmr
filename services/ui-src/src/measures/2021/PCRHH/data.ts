import { DataDrivenTypes } from "measures/CommonQuestions/types";

export const qualifiers = [
  "Count of Index Hospital Stays",
  "Count of Observed 30-Day Readmissions",
  "Observed Readmission Rate",
  "Count of Expected 30-Day Readmissions",
  "Expected Readmission Rate",
  "O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)",
  "Count of Enrollees in Health Home Population",
  "Number of Outliers",
  "Outlier Rate (Number of Outliers/Count of Enrollees in Health Home Population) x 1,000",
];
export const categories = [];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "For Health Home enrollees ages 18 to 64, the number of acute inpatient and observation stays during the measurement year that were followed by an unplanned acute readmission for any diagnosis within 30 days and the predicted probability of an acute readmission.  Data are reported in the following categories:",
  ],
  questionListItems: [
    "Count of Index Hospital Stays (IHS) ",
    "Count of Observed 30-Day Readmissions",
    "Count of Expected 30-Day Readmissions",
  ],
  categories,
  qualifiers,
};