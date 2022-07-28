import { DataDrivenTypes } from "measures/2021/CommonQuestions/types";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("COB-AD");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of beneficiaries age 18 and older with concurrent use of prescription opioids and benzodiazepines. Beneficiaries with a cancer diagnosis, sickle cell disease diagnosis, or in hospice are excluded.",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};
