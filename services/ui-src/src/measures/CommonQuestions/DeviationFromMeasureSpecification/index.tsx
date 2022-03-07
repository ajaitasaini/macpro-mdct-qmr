import * as QMR from "components";
import * as Types from "../types";
import { useWatch } from "react-hook-form";
import { useCustomRegister } from "hooks/useCustomRegister";

interface GetTopLvlDeviationOptions {
  categories: string[];
}

type TopLevelOptions = {
  displayValue: string;
  rates: Types.RateFields[] | undefined;
  key: string;
}[];

interface Props {
  categories: string[];
}

interface OptionProps {
  name: string;
  qualifiers?: Types.RateFields[];
}

/**
 * It removes all non-word characters from a string.
 * @param {string} [s] - The string to be cleaned.
 */
const cleanString = (s?: string) => s?.replace(/[^\w]/g, "");

/**
 * Check if the rate has both a numerator and a denominator.
 * @param el - The rate field that we're checking.
 */
const numDenExistInRate = (el: Types.RateFields) =>
  el?.numerator && el?.denominator;

/**
 * It returns an array of objects that contain a display value, value, and single TextArea child
 * @param {string} name - The name of the field.
 */
const getRateTextAreaOptions = (name: string) =>
  ["Numerator", "Denominator", "Other"].map((displayValue) => {
    const value = displayValue.toLowerCase();
    return {
      displayValue,
      value,
      children: [
        <QMR.TextArea
          label="Explain:"
          name={`${name}.${value}`}
          key={`${name}.${value}`}
        />,
      ],
    };
  });

/* This is a custom checkbox component that is used to render the checkboxes for the rate deviations. */
const DeviationsSelectedCheckbox = ({ name }: { name: string }) => (
  <QMR.Checkbox
    name={`${name}.RateDeviationsSelected`}
    key={`${name}.RateDeviationsSelected`}
    options={getRateTextAreaOptions(name)}
  />
);

/**
 * It takes in a list of qualifiers and returns options based on if the rates contain a label
 * @param {OptionProps}  - qualifier: the qualifier object - name: a name to register the input with
 * @returns A list of options
 */
export const getLowLvlDeviationOptions = ({
  qualifiers,
  name,
}: OptionProps) => {
  if (!qualifiers || qualifiers.length === 0) return [];

  // if there are no labels then there is no need for the additional checkbox
  if (!qualifiers.some((el) => el.label)) {
    return getRateTextAreaOptions(name);
  }

  return qualifiers
    .sort((a, b) => (a.label!! < b.label!! ? 1 : 1))
    .map((item) => {
      const value = `${cleanString(item.label)}`;
      return {
        displayValue: item.label!,
        value,
        children: [
          <DeviationsSelectedCheckbox
            name={`${name}.${value}`}
            key={`${name}.${value}`}
          />,
        ],
      };
    });
};

export const DeviationFromMeasureSpec = ({ categories }: Props) => {
  const register = useCustomRegister<Types.DeviationFromMeasureSpecification>();
  const watchPerformanceMeasure = useWatch({
    name: "PerformanceMeasure",
  });

  const getTopLvlDeviationOptions = ({
    categories,
  }: GetTopLvlDeviationOptions) => {
    if (watchPerformanceMeasure?.rates) {
      const topLvlOptions: TopLevelOptions = [];
      const { rates } = watchPerformanceMeasure;

      /* This is checking if the rates object has a singleCategory key.
      If it does, then it will return the low level deviation options. */
      if (rates.singleCategory) {
        return getLowLvlDeviationOptions({
          qualifiers: rates.singleCategory.filter(numDenExistInRate),
          name: `Deviations`,
        });
      } else {
        Object.keys(rates).forEach((key) => {
          // if some of the rates have both num and den
          if (rates[key]?.some(numDenExistInRate)) {
            // add the rates that have num and den to topLvlOptions along with its display value from categories
            topLvlOptions.push({
              rates: rates[key]?.filter(numDenExistInRate),
              displayValue:
                categories.find((cat) => cleanString(cat) === key) || "",
              key,
            });
          }
        });
      }

      return (
        topLvlOptions?.map((option) => {
          return {
            value: option.key,
            displayValue: option.displayValue,
            children: [
              <QMR.Checkbox
                {...register(`Deviations.${option.key}.SelectedOptions`)}
                formLabelProps={{ fontWeight: 600 }}
                key={`Deviations.${option.key}`}
                options={getLowLvlDeviationOptions({
                  qualifiers: option.rates,
                  name: `Deviations.${option.key}`,
                })}
              />,
            ],
          };
        }) ?? []
      );
    }
    return [];
  };

  return (
    <QMR.CoreQuestionWrapper label="Deviations from Measure Specifications">
      <QMR.RadioButton
        renderHelperTextAbove
        {...register("DidCalculationsDeviate")}
        formLabelProps={{ fontWeight: 600 }}
        label="Did your calculation of the measure deviate from the measure specification in any way?"
        helperText="For example: deviation from measure specification might include different methodology, timeframe, or reported age groups."
        options={[
          {
            displayValue:
              "Yes, the calculation of the measure deviates from the measure specification.",
            value: "yes",
            children: [
              <QMR.Checkbox
                {...register("DeviationOptions")}
                label="Select and explain the deviation(s):"
                options={getTopLvlDeviationOptions({
                  categories,
                })}
              />,
            ],
          },
          {
            displayValue:
              "No, the calculation of the measure does not deviate from the measure specification in any way.",
            value: "no",
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};