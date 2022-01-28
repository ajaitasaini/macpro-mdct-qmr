import * as CUI from "@chakra-ui/react";
export const SupportLinks = () => (
  <>
    <CUI.Text>
      For technical questions regaring use of this application, please reach out
      to{" "}
      <CUI.Link href="mailto:MDCT_help@cms.hhs.gov" color="blue.600">
        MDCT_help@cms.hhs.gov
      </CUI.Link>
      . For content related questions, such as about measure specifications or
      what information to enter into each field, please reach out to{" "}
      <CUI.Link href="mailto:MACQualityTA@cms.hhs.gov" color="blue.600">
        MACQualityTA@cms.hhs.gov
      </CUI.Link>
      .
    </CUI.Text>

    <CUI.Text paddingTop="8" fontSize="x-small" color="gray.700">
      PRA Disclosure Statement: Centers for Medicare & Medicaid Services (CMS)
      collects this mandatory information in accordance with (42 U.S.C. 1396a)
      and (42 CFR 430.12); which sets forth the authority for the submittal and
      collection of state plans and plan amendment information in a format
      defined by CMS for the purpose of improving the state application and
      federal review processes, improve federal program management of Medicaid
      programs and Children’s Health Insurance Program, and to standardize
      Medicaid program data which covers basic requirements, and individual
      content that reflects the characteristics of the particular state’s
      program. The information will be used to monitor and analyze performance
      metrics related to the Medicaid and Children’s Health Insurance Program in
      efforts to boost program integrity efforts, improve performance and
      accountability across the programs. Under the Privacy Act of 1974 any
      personally identifying information obtained will be kept private to the
      extent of the law. According to the Paperwork Reduction Act of 1995, no
      persons are required to respond to a collection of information unless it
      displays a valid OMB control number. The valid OMB control number for this
      information collection is 0938-1188. The time required to complete and
      review the information collection is estimated to range from 1 hour to 80
      hours per response (see below), including the time to review instructions,
      search existing data resources, gather the data needed, and completeand
      review the information collection. If you have comments concerning the
      accuracy of the time estimate(s) or suggestions for imprving this form,
      please write to: CMS, 7500 Security Boulevard, Attn: PRA Reports Clerance
      Office, Mail Stop C4-26-05, Baltimore, Maryland 21244-1850.
    </CUI.Text>
  </>
);
