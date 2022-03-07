import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { useWatch } from "react-hook-form";
import * as Types from "../types";
import {
  allPositiveIntegers,
  percentageAllowOneDecimalMax,
} from "utils/numberInputMasks";
import * as DC from "dataConstants";

export const DefinitionOfPopulation = () => {
  const register = useCustomRegister<Types.DefinitionOfPopulation>();
  const showDeliverySystemOtherPopulation =
    useWatch({
      name: DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC,
    }) !== "NoRepresentsTotalEligiblePop"; // where is this coming from?

  return (
    <QMR.CoreQuestionWrapper label="Definition of Population Included in the Measure">
      <CUI.Heading size="sm" as="h3">
        Definition of denominator
      </CUI.Heading>
      <CUI.Text mt="3">
        Please select all populations that are included. For example, if your
        data include both non-dual Medicaid beneficiaries and Medicare and
        Medicaid Dual Eligibles, select both:
      </CUI.Text>
      <CUI.UnorderedList m="5" ml="10">
        <CUI.ListItem>Denominator includes Medicaid population</CUI.ListItem>
        <CUI.ListItem>
          Denominator includes Medicare and Medicaid Dually-Eligible population
        </CUI.ListItem>
      </CUI.UnorderedList>
      <QMR.Checkbox
        {...register(DC.DEFINITION_OF_DENOMINATOR)}
        options={[
          {
            displayValue: "Denominator includes Medicaid population",
            value: DC.DENOMINATOR_INC_MEDICAID_POP,
          },
          {
            displayValue:
              "Denominator includes CHIP population (e.g. pregnant women)",
            value: DC.DENOMINATOR_INC_CHIP,
          },
          {
            displayValue:
              "Denominator includes Medicare and Medicaid Dually-Eligible population",
            value: DC.DENOMINATOR_INC_MEDICAID_DUAL_ELIGIBLE,
          },
          {
            displayValue: "Other",
            value: DC.DENOMINATOR_INC_OTHER,
            children: [
              <QMR.TextArea
                formLabelProps={{ fontWeight: "400" }}
                label="Define the other denominator population:"
                {...register(DC.DEFINITION_DENOMINATOR_OTHER)}
              />,
            ],
          },
        ]}
      />
      <CUI.Box my="5">
        <QMR.TextArea
          formLabelProps={{ fontWeight: "400" }}
          label="If there has been a change in the included population from the previous reporting year, please provide any available context below:"
          {...register(DC.CHANGE_IN_POP_EXPLANATION)}
        />
      </CUI.Box>
      <CUI.Box my="5">
        <QMR.RadioButton
          formLabelProps={{ fontWeight: "600" }}
          label="Does this denominator represent your total measure-eligible population as defined by the Technical Specifications for this measure?"
          {...register(DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC)}
          options={[
            {
              displayValue:
                "Yes, this denominator represents the total measure-eligible population as defined by the Technical Specifications for this measure.",
              value: DC.YES,
            },
            {
              displayValue:
                "No, this denominator does not represent the total measure-eligible population as defined by the Technical Specifications for this measure.",
              value: DC.NO,
              children: [
                <QMR.TextArea
                  {...register(
                    DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC_NO_EXPLAIN
                  )}
                  label="Explain which populations are excluded and why:"
                />,
                <CUI.Box mt="10" key="DenominatorDefineTotalTechSpec-No-Size">
                  <QMR.NumberInput
                    mask={allPositiveIntegers}
                    {...register(DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC_NO_SIZE)}
                    label="Specify the size of the population excluded (optional):"
                  />
                </CUI.Box>,
              ],
            },
          ]}
        />
      </CUI.Box>
      <CUI.Box mt="5">
        <CUI.Heading size="sm" as="h3" my="2">
          {"Which delivery systems are represented in the denominator?"}
        </CUI.Heading>
        <QMR.Checkbox
          formLabelProps={{ fontWeight: "400" }}
          {...register(DC.DELIVERY_SYS_REPRESENTATION_DENOMINATOR)}
          label="Select all delivery systems that apply in your state (must select at least one); for each delivery system selected, enter the percentage of the measure-eligible population represented by that service delivery system."
          options={[
            {
              displayValue: "Fee-for-Service (FFS)",
              value: DC.FFS,
              children: [
                <QMR.RadioButton
                  {...register(DC.DELIVERY_SYS_FFS)}
                  formLabelProps={{ fontWeight: "400" }}
                  label="Is all of your measure-eligible Fee-for-Service (FFS) population included in this measure?"
                  options={[
                    {
                      displayValue:
                        "Yes, all of our measure-eligible Fee-for-Service (FFS) population are included in this measure.",
                      value: DC.YES,
                    },
                    {
                      displayValue:
                        "No, not all of our measure-eligible Fee-for-Service (FFS) population are included in this measure.",
                      value: DC.NO,
                      children: [
                        <QMR.NumberInput
                          {...register(DC.DELIVERY_SYS_FFS_NO_PERCENT)}
                          formLabelProps={{ fontWeight: "400" }}
                          label="What percent of your measure-eligible Fee-for-Service (FFS) population are included in the measure?"
                          displayPercent
                          mask={percentageAllowOneDecimalMax}
                        />,
                        <CUI.Text my="5" key="AdditionalFFSText">
                          The percentage provided here should represent the
                          percentage of the denominator population(s) included
                          in the measure (i.e., Medicaid, CHIP, etc.) that
                          receives items/services through the selected delivery
                          system. For example, if the population included in the
                          reported data represents all managed care enrollees
                          and half of your state’s fee-for-service enrollees,
                          select managed care, and select fee-for-service and
                          enter 50.
                        </CUI.Text>,
                        <QMR.NumberInput
                          {...register(DC.DELIVERY_SYS_FFS_NO_POP)}
                          formLabelProps={{ fontWeight: "400" }}
                          mask={allPositiveIntegers}
                          label="What number of your measure-eligible Fee-for-Service (FFS) population are included in the measure? (optional)"
                        />,
                      ],
                    },
                  ]}
                />,
              ],
            },
            {
              displayValue: "Primary Care Case Management (PCCM)",
              value: DC.PCCM,
              children: [
                <QMR.RadioButton
                  {...register(DC.DELIVERY_SYS_PCCM)}
                  formLabelProps={{ fontWeight: "400" }}
                  label="Is all of your measure-eligible Primary Care Case Management (PCCM) population included in this measure?"
                  options={[
                    {
                      displayValue:
                        "Yes, all of our measure-eligible Primary Care Case Management (PCCM) population are included in this measure.",
                      value: DC.YES,
                    },
                    {
                      displayValue:
                        "No, not all of our measure-eligible Primary Care Case Management (PCCM) population are included in this measure.",
                      value: DC.NO,
                      children: [
                        <QMR.NumberInput
                          {...register(DC.DELIVERY_SYS_PCCM_NO_PERCENT)}
                          displayPercent
                          mask={percentageAllowOneDecimalMax}
                          formLabelProps={{ fontWeight: "400" }}
                          label="What percent of your measure-eligible Primary Care Case Management (PCCM) population are included in the measure?"
                        />,
                        <CUI.Box py="5" key="AdditionalPCCMText">
                          <CUI.Text my="3">
                            The percentage provided here should represent the
                            percentage of the denominator population(s) included
                            in the measure (i.e., Medicaid, CHIP, etc.) that
                            receives items/services through the selected
                            delivery system. For example, if the population
                            included in the reported data represents all managed
                            care enrollees and half of your state’s
                            fee-for-service enrollees, select managed care, and
                            select fee-for-service and enter 50.
                          </CUI.Text>
                        </CUI.Box>,
                        <QMR.NumberInput
                          {...register(DC.DELIVERY_SYS_PCCM_NO_POP)}
                          formLabelProps={{ fontWeight: "400" }}
                          mask={allPositiveIntegers}
                          label="What number of your measure-eligible Primary Care Case Management (PCCM) population are included in the measure? (optional)"
                        />,
                      ],
                    },
                  ]}
                />,
              ],
            },
            {
              displayValue:
                "Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP)",
              value: DC.MCO_PIHP,
              children: [
                <CUI.Box pb="5" key="DeliverySys-MCO_PIHP-Percent">
                  <QMR.NumberInput
                    displayPercent
                    mask={percentageAllowOneDecimalMax}
                    formLabelProps={{ fontWeight: "400" }}
                    label="What percent of your measure-eligible Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP) population are included in the measure?"
                    {...register(DC.DELIVERY_SYS_MCO_PIHP_PERCENT)}
                  />
                </CUI.Box>,
                <CUI.Box py="5" key="DeliverySys-MCO_PIHP-NumberOfPlans">
                  <QMR.NumberInput
                    formLabelProps={{ fontWeight: "400" }}
                    mask={allPositiveIntegers}
                    label="What is the number of Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP) plans that are included in the reported data?"
                    {...register(DC.DELIVERY_SYS_MCO_PIHP_NUM_PLANS)}
                  />
                </CUI.Box>,
                <CUI.Box pt="5" key="DeliverySys-MCO_PIHP">
                  <QMR.RadioButton
                    {...register(DC.DELIVERY_SYS_MCO_PIHP)}
                    formLabelProps={{ fontWeight: "400" }}
                    label="Is all of your measure-eligible Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP) population included in this measure?"
                    options={[
                      {
                        displayValue:
                          "Yes, all of our measure-eligible Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP) population are included in this measure.",
                        value: DC.YES,
                      },
                      {
                        displayValue:
                          "No, not all of our measure-eligible Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP) population are included in this measure.",
                        value: DC.NO,
                        children: [
                          <CUI.Text mb="5" key="AdditionalMCOIncludedText">
                            {
                              "What percent of your measure-eligible Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP) population are"
                            }
                            <CUI.Text as="i" fontWeight="600">
                              {" included "}
                            </CUI.Text>
                            {"in the measure?"}
                          </CUI.Text>,
                          <QMR.NumberInput
                            displayPercent
                            mask={percentageAllowOneDecimalMax}
                            renderHelperTextAbove
                            helperText="The percentage provided here should represent the percentage of the denominator population(s) included in the measure (i.e., Medicaid, CHIP, etc.) that receives items/services through the selected delivery system. For example, if the population included in the reported data represents all managed care enrollees and half of your state’s fee-for-service enrollees, select managed care, and select fee-for-service and enter 50."
                            {...register(DC.DELIVERY_SYS_MCO_PIHP_NO_INC)}
                          />,
                          <CUI.Text my="5" key="AdditionalMCOExcludedText">
                            {" "}
                            {
                              "How many of your measure-eligible Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP) plans are"
                            }
                            <CUI.Text as="i" fontWeight="600">
                              {" excluded "}
                            </CUI.Text>
                            {
                              "from the measure? If none are excluded, please enter zero."
                            }
                          </CUI.Text>,
                          <QMR.NumberInput
                            mask={allPositiveIntegers}
                            {...register(DC.DELIVERY_SYS_MCO_PIHP_NO_EXCL)}
                          />,
                        ],
                      },
                    ]}
                  />
                </CUI.Box>,
              ],
            },
            {
              displayValue: "Integrated Care Models (ICM)",
              value: DC.ICM,
              children: [
                <QMR.RadioButton
                  formLabelProps={{ fontWeight: "400" }}
                  label="Is all of your measure-eligible Integrated Care Models (ICM) population included in this measure?"
                  {...register(DC.DELIVERY_SYS_ICM)}
                  options={[
                    {
                      displayValue:
                        "Yes, all of our measure-eligible Integrated Care Models (ICM) population are included in this measure.",
                      value: DC.YES,
                    },
                    {
                      displayValue:
                        "No, not all of our measure-eligible Integrated Care Models (ICM) population are included in this measure.",
                      value: DC.NO,
                      children: [
                        <QMR.NumberInput
                          displayPercent
                          renderHelperTextAbove
                          helperText="The percentage provided here should represent the
                          percentage of the denominator population(s) included
                          in the measure (i.e., Medicaid, CHIP, etc.) that
                          receives items/services through the selected
                          delivery system. For example, if the population
                          included in the reported data represents all managed
                          care enrollees and half of your state’s
                          fee-for-service enrollees, select managed care, and
                          select fee-for-service and enter 50."
                          mask={percentageAllowOneDecimalMax}
                          formLabelProps={{ fontWeight: "400" }}
                          label="What percent of your measure-eligible Integrated Care Models (ICM) population are included in the measure?"
                          {...register(DC.DELIVERY_SYS_ICM_NO_PERCENT)}
                        />,
                        <CUI.Box py="5" key="AdditionalICMText">
                          <QMR.NumberInput
                            mask={allPositiveIntegers}
                            formLabelProps={{ fontWeight: "400" }}
                            label="How many of your measure-eligible Integrated Care Models (ICM) plans are excluded from the measure? If none are excluded, please enter zero."
                            {...register(DC.DELIVERY_SYS_ICM_NO_POP)}
                          />
                        </CUI.Box>,
                      ],
                    },
                  ]}
                />,
              ],
            },
            {
              displayValue: "Other",
              value: DC.OTHER,
              children: [
                <CUI.Box pb="5" key="DeliverySys-Other">
                  <QMR.TextArea
                    formLabelProps={{ fontWeight: "400" }}
                    label="Describe the Other Delivery System represented in the denominator:"
                    {...register(DC.DELIVERY_SYS_OTHER)}
                  />
                </CUI.Box>,
                <CUI.Box py="5" key="DeliverySys-Other-Percent">
                  <QMR.NumberInput
                    displayPercent
                    mask={percentageAllowOneDecimalMax}
                    formLabelProps={{ fontWeight: "400" }}
                    label="Percentage of measure-eligible state population represented in data reported:"
                    {...register(DC.DELIVERY_SYS_OTHER_PERCENT)}
                  />
                </CUI.Box>,
                <CUI.Box py="5" key="AdditionalOtherText">
                  <CUI.Text>
                    The percentage provided here should represent the percentage
                    of the denominator population(s) included in the measure
                    (i.e., Medicaid, CHIP, etc.) that receives items/services
                    through the selected delivery system. For example, if the
                    population included in the reported data represents all
                    managed care enrollees and half of your state’s
                    fee-for-service enrollees, select managed care, and select
                    fee-for-service and enter 50.
                  </CUI.Text>
                </CUI.Box>,
                <CUI.Box py="5" key="DeliverySys-Other-NumberOfHealthPlans">
                  <QMR.NumberInput
                    mask={allPositiveIntegers}
                    formLabelProps={{ fontWeight: "400" }}
                    label="If applicable, list the number of Health Plans represented:"
                    {...register(DC.DELIVERY_SYS_OTHER_NUM_HEALTH_PLANS)}
                  />
                </CUI.Box>,
                ...(showDeliverySystemOtherPopulation // TODO: is this ever shown now?
                  ? [
                      <CUI.Box pt="5" key="DeliverySys-Other-Population">
                        <QMR.NumberInput
                          mask={allPositiveIntegers}
                          formLabelProps={{ fontWeight: "400" }}
                          label="Number of measure-eligible state population represented in data reported:"
                          {...register(DC.DELIVERY_SYS_OTHER_POP)}
                        />
                      </CUI.Box>,
                    ]
                  : []),
              ],
            },
          ]}
        />
      </CUI.Box>
    </QMR.CoreQuestionWrapper>
  );
};