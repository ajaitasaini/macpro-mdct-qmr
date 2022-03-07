import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { NDRSets } from "./ndrSets";

interface SubCatSectionProps {
  /** onClick state updating function for dynamic rendering */
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  /** additional text to display after "+ Add Another" on the button */
  additionalText?: string;
  isDisabled?: boolean;
}

/**
 * Button for handling additional values in dynamic rendering
 */
export const AddAnotherButton = ({
  onClick,
  additionalText,
  isDisabled,
}: SubCatSectionProps) => {
  return (
    <QMR.ContainedButton
      buttonText={"+ Add Another " + additionalText}
      buttonProps={{
        variant: "outline",
        colorScheme: "blue",
        textTransform: "capitalize",
        mt: "4",
      }}
      key={"AddAnotherButton"}
      onClick={onClick}
      disabledStatus={isDisabled}
    />
  );
};

interface AdditonalCategoryProps {
  /** name for react-hook-form registration */
  name: string;
}

/**
 * Additional [Race/Sex/Language/Etc] Category Section
 */
export const SubCatSection = ({ name }: AdditonalCategoryProps) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `${name}.additionalSubCategories`,
    control,
    shouldUnregister: true,
  });

  return (
    <CUI.Box key={`${name}.additionalSubCategoriesWrapper`}>
      {fields.map((field: any, idx: number) => (
        <QMR.DeleteWrapper allowDeletion key={field.id}>
          <CUI.Text size={"xl"} my="3" onClick={() => remove(idx)}>
            {"Additional/Alternative Classification/Sub-category"}
          </CUI.Text>
          <QMR.QuestionChild show key={field.id}>
            <CUI.Stack spacing={"5"}>
              <QMR.TextInput
                name={`${name}.additionalSubCategories.${idx}.description`}
                key={`${name}.additionalSubCategories.${idx}.description`}
                label={"Define the Alternative Classification/Sub-category"}
                rules={{ required: true }}
              />
              <NDRSets
                name={`${name}.additionalSubCategories.${idx}.ageRangeRates`}
                key={`${name}.additionalSubCategories.${idx}.ageRangeRates`}
              />
            </CUI.Stack>
          </QMR.QuestionChild>
        </QMR.DeleteWrapper>
      ))}
      <AddAnotherButton
        onClick={() => append({})}
        additionalText={"Sub-Category"}
        key={`${name}.additionalSubCategoriesButton`}
      />
    </CUI.Box>
  );
};