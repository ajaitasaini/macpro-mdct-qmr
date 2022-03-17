import { DataDrivenTypes } from "measures/CommonQuestions/types";

export const qualifiers = ["Ages 21 to 24"];
export const categories = [];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of women ages 21 to 24 who were identified as sexually active and who had at least one test for chlamydia during the measurement year.",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};

export const dataSourceData: DataDrivenTypes.DataSource = {
  optionsLabel:
    "If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below.",
  options: [
    {
      value: "Administrative Data",
      subOptions: [
        {
          label: "What is the Administrative Data Source?",
          options: [
            {
              value: "Medicaid Management Information System (MMIS)",
            },
            {
              value: "Administrative Data Other",
              description: true,
            },
          ],
        },
      ],
    },
    {
      value: "Electronic Health Records",
      description: true,
    },
    {
      value: "Other Data Source",
      description: true,
    },
  ],
};