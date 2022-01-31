import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Q from "./questions";
import { useForm, FormProvider } from "react-hook-form";
import { ACSQualifierForm } from "./types";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateMeasure, useGetMeasure } from "hooks/api";
import { CoreSetAbbr, MeasureStatus } from "types";
import { useQueryClient } from "react-query";
import { formatDistanceToNow } from "date-fns";
import { FaCheckCircle } from "react-icons/fa";

const LastSavedText = ({ lastAltered }: { lastAltered?: number }) => {
  if (!lastAltered) return null;
  const lastAlteredText = formatDistanceToNow(new Date(lastAltered), {
    addSuffix: true,
  });
  return (
    <CUI.Flex justifyContent="center">
      <CUI.Box mt="1">
        <FaCheckCircle />
      </CUI.Box>
      <CUI.Text ml="2" fontSize="sm">
        {`Submitted ${lastAlteredText}`}
      </CUI.Text>
    </CUI.Flex>
  );
};

export const ACSQualifiers = () => {
  const { state, year } = useParams();
  const mutation = useUpdateMeasure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // get qualifier data and prepoulate default values if data exists
  const { data } = useGetMeasure({
    coreSet: CoreSetAbbr.ACS,
    measure: "CSQ",
  });

  const methods = useForm<ACSQualifierForm>({
    shouldUnregister: true,
    mode: "all",
    defaultValues: data?.Item.data || {
      PercentageEnrolledInEachDeliverySystem: [
        {
          key: "FeeForService",
          label: "Fee-for-Service",
          TwentyOneToSixtyFour: "",
          GreaterThanSixtyFour: "",
          userGenerated: false,
        },
        {
          key: "PCCM",
          label: "PCCM",
          TwentyOneToSixtyFour: "",
          GreaterThanSixtyFour: "",
          userGenerated: false,
        },
        {
          key: "ManagedCare",
          label: "Managed Care",
          TwentyOneToSixtyFour: "",
          GreaterThanSixtyFour: "",
          userGenerated: false,
        },
        {
          key: "IntegtatedCareModel",
          label: "Integrated Care Model (ICM)",
          TwentyOneToSixtyFour: "",
          GreaterThanSixtyFour: "",
          userGenerated: false,
        },
      ],
      CoreSetMeasuresAuditedOrValidatedDetails: [
        {
          MeasuresAuditedOrValidated: [],
          WhoConductedAuditOrValidation: "",
        },
      ],
    },
  });

  const handleSubmit = (data: ACSQualifierForm) => {
    const requestData = {
      data,
      measure: "CSQ",
      status: MeasureStatus.COMPLETE,
      coreSet: CoreSetAbbr.ACS,
    };

    mutation.mutate(requestData, {
      onSuccess: () => {
        // refetch the qualifier measure and redirect to measure list page
        queryClient.refetchQueries(["measure", state, year, "CSQ"]);
        navigate(`/${state}/${year}/${CoreSetAbbr.ACS}`);
      },
    });
  };

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: `FFY ${year}` },
        {
          path: `/${state}/${year}/${CoreSetAbbr.ACS}`,
          name: ``,
        },
        {
          path: `/${state}/${year}/${CoreSetAbbr.ACS}/CSQ`,
          name: `Adult Core Set Qualifiers`,
        },
      ]}
      buttons={
        data?.Item.data && (
          <LastSavedText lastAltered={data?.Item.lastAltered} />
        )
      }
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <CUI.Box maxW="5xl" as="section">
            <CUI.Box mb="7" mt="3">
              <CUI.Text as="h1" fontSize="xl" mb="3" fontWeight="bold">
                Adult Core Set Questions
              </CUI.Text>
              <QMR.SupportLinks />
            </CUI.Box>
            <CUI.OrderedList>
              <Q.DeliverySystems />
              <Q.Audit />
              <Q.ExternalContractor />
              <Q.CompleteCoreSets completeEnabled={methods.formState.isDirty} />
            </CUI.OrderedList>
          </CUI.Box>
        </form>
      </FormProvider>
    </QMR.StateLayout>
  );
};