import { useMemo, useState } from "react";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Q from "./";
import { ICheckbox } from "components/MultiSelect";
import { useController, useFormContext } from "react-hook-form";
import { AuditDetails } from "../types";
import { HiX } from "react-icons/hi";

export const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <CUI.IconButton
    fontSize="1.5em"
    variant="ghost"
    icon={<HiX />}
    aria-label="Remove Audit Item"
    onClick={onClick}
  />
);

export const Audit = () => {
  const { control } = useFormContext();
  const { field } = useController({
    name: "CoreSetMeasuresAuditedOrValidatedDetails",
    control,
  });

  const [measureList, setMeasureList] = useState(field.value);

  const multiSelectList = useMemo<ICheckbox[]>(
    () => [
      {
        label: "AMM-AD - Antidepressant Medication Management",
        value: "AMM-AD",
        isVisible: true,
      },
      {
        label: "AMR-AD - Asthma Medication Ratio: Ages 19 to 64",
        value: "AMR-AD",
        isVisible: true,
      },
      {
        label: "BCS-AD - Breast Cancer Screening",
        value: "BCS-AD",
        isVisible: true,
      },
      {
        label: "CBP-AD - Controlling High Blood Pressue",
        value: "CBP-AD",
        isVisible: true,
      },
      {
        label: "CCP-AD - Contraceptive Care Postpartum Women Ages 21 - 44",
        value: "CCP-AD",
        isVisible: true,
      },
    ],
    []
  );

  const handleAddMeasureList = () => {
    setMeasureList([
      ...measureList,
      {
        MeasuresAuditedOrValidated: [],
        WhoConductedAuditOrValidation: "",
      },
    ]);
  };

  const removeAuditItem = (index: number) => {
    const newMeasureList = [...measureList];
    newMeasureList.splice(index, 1);
    setMeasureList(newMeasureList);
  };

  return (
    <CUI.ListItem>
      <Q.QualifierHeader
        header="Audit or Validation of Measures"
        description="Were any of the Core Set meaures audited or validated?"
      />
      <CUI.Spacer />
      <CUI.Stack>
        <CUI.Box pt="4">
          <QMR.RadioButton
            formLabelProps={{ fontWeight: "600" }}
            name="CoreSetMeasuresAuditedOrValidated"
            options={[
              {
                displayValue:
                  "Yes, some of the Core Set measures have been audited or validated",
                value:
                  "Yes, some of the Core Set measures have been audited or validated",
                children: [
                  <CUI.Stack mb="5" spacing="6">
                    {measureList.map((m: AuditDetails, index: number) => {
                      return (
                        <CUI.Box
                          border="1px"
                          borderColor="gray.200"
                          borderRadius="md"
                          key={`${Object.keys(m).join("-")}${index}.key`}
                        >
                          <CUI.Flex>
                            <QMR.TextInput
                              formLabelProps={{ fontWeight: "400" }}
                              label="Who conducted the audit or validation?"
                              name={`CoreSetMeasuresAuditedOrValidatedDetails.${index}.WhoConductedAuditOrValidation`}
                              formControlProps={{
                                p: "5",
                                pb: "0",
                              }}
                            />
                            <CUI.Spacer />
                            {index !== 0 && (
                              <CloseButton
                                onClick={() => removeAuditItem(index)}
                              />
                            )}
                          </CUI.Flex>
                          <CUI.Box p="5">
                            <CUI.Text mb="4">
                              Which measures did they audit or validate?
                            </CUI.Text>

                            <QMR.MultiSelect
                              multiSelectList={multiSelectList}
                              name={`CoreSetMeasuresAuditedOrValidatedDetails.${index}.MeasuresAuditedOrValidated`}
                            />
                          </CUI.Box>
                        </CUI.Box>
                      );
                    })}
                  </CUI.Stack>,
                  <QMR.ContainedButton
                    buttonText={"+ Add Another"}
                    buttonProps={{
                      variant: "outline",
                      colorScheme: "blue",
                      textTransform: "capitalize",
                    }}
                    onClick={handleAddMeasureList}
                  />,
                ],
              },
              {
                displayValue:
                  "No, none of the Core Set measures have been audited or validated",
                value:
                  "No, none of the Core Set measures have been audited or validated",
              },
            ]}
          />
        </CUI.Box>
      </CUI.Stack>
    </CUI.ListItem>
  );
};