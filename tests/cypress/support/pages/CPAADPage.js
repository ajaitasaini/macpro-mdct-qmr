const CPAadLink = "//p[contains(text(),'CPA-AD')]";
const cpaADtitle =
  "//a[contains(text(),'CPA-AD - Consumer Assessment of Healthcare Provide')]";
const sentenceBelowTitle =
  "//p[contains(text(),'For technical questions regarding use of this appl')]";
//const printButton = "//button[@class='chakra-button css-11qozvn']";
const didYouCollectThisMeasure =
  "//p[contains(text(),'Yes, we did collect data for the Consumer Assessme')]";
const howDidYouReportThisMeasure =
  "//p[contains(text(),'Submitted raw data to AHRQ (CAHPS Database)')]";
const measurementSpecificationAHRQ =
  "//p[contains(text(),'Agency for Healthcare Research and Quality (AHRQ) ')]";
const dataSource =
  "//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/div[1]/form[1]/section[1]/div[4]/div[1]/div[1]/div[1]/div[1]/label[1]/span[2]/p[1]";
const dataSourceOtherTextbox = "//textarea[@id='field-911']";
//const noSupplemental = "//p[contains(text(),'No Supplemental Item Sets were included')]";
const otherCAHPSItemSet = "//p[contains(text(),'Other CAHPS Item Set')]";
const noSupplemental =
  "//p[contains(text(),'No Supplemental Item Sets were included')]";
const noSupplementalOther = "//textarea[@id='field-915']";
const ahrqAdministrativeProtocol =
  "//p[contains(text(),'AHRQ CAHPS administrative protocol')]";
const otherAdministrativeProtocolExplain = "//textarea[@id='field-913']";
const surveySampleMedicaidPopulation =
  "//p[contains(text(),'Survey sample includes Medicaid population')]";
const performanceMeasureText =
  "//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/div[1]/form[1]/section[1]/div[6]";
const all_check_box = "//span[ contains(@class, 'check')]/p";
const reporting_yes = "(//span[ contains(@class, 'radio')]/p)[1]";
const reporting_no = "(//span[ contains(@class, 'radio')]/p)[2]";
const sample_text = "This is a test from the QA !";
const radio_all_options = "//span[ contains(@class, 'radio')]/p";
const validateMeasureButton = "//button[contains(text(),'Validate Measure')]";
const completeMeasureButton = "//button[contains(text(),'Complete Measure')]";
const saveStatusUnderSaveButton = "//p[@class='chakra-text css-nr0v7p']";
const additionalNotes = "//textarea[@id='field-832']";
const verifyTextFileIsUploaded =
  // "//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/div[1]/form[1]/section[1]/div[11]/div[2]/div[3]";
  "//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/div[1]/form[1]/section[1]/div[7]/div[2]/div[1]/p[1]/button[1]";
// element is xpath, please use cy.xapth() instead of cy.get();

// -- SECTION: What you are not reporting on this measure?
const check_service_not_covered = "(//span[ contains(@class, 'check')]/p)[1]";
const check_population_not_covered =
  "(//span[ contains(@class, 'check')]/p)[2]";
const radio_partial_popu_not_covered =
  "(//span[ contains(@class, 'radio')]/p)[4]";
const text_explain_partial_popu = "(//textarea)[1]";

const check_data_not_available = "(//span[ contains(@class, 'check')]/p)[3]";
const check_data_inconsistencies = "(//span[ contains(@class, 'check')]/p)[6]";
const text_explain_inconsistencies = "(//textarea)[2]";

const check_source_not_accessible = "(//span[ contains(@class, 'check')]/p)[7]";
const check_source_not_accessible_other =
  "(//span[ contains(@class, 'check')]/p)[10]";
const text_source_not_accessible_other_explain = "(//textarea)[3]";

const check_info_not_collected = "(//span[ contains(@class, 'check')]/p)[11]";
const check_info_not_collected_by_provider =
  "(//span[ contains(@class, 'check')]/p)[12]";

const check_limitation_with_data = "(//span[ contains(@class, 'check')]/p)[15]";
const text_describe_limitation = "(//textarea)[4]";

const check_small_sample_size = "(//span[ contains(@class, 'check')]/p)[16]";
const num_sample_size = "//input[contains(@data-testid, 'number')]";

// -------

export class CPAADPAGE {
  verifycpaADtitle() {
    cy.xpath(cpaADtitle).should("be.visible");
    cy.xpath(cpaADtitle).contains(
      "CPA-AD - Consumer Assessment of Healthcare Providers and Systems (CAHPS®) Health Plan Survey 5.1H, Adult Version (Medicaid)"
    );
  }

  verifysentenceBelowTitle() {
    cy.xpath(sentenceBelowTitle).should("be.visible");
  }
  clickdidYouCollectThisMeasure() {
    cy.xpath(didYouCollectThisMeasure).click();
  }
  clickhowDidYouReportThisMeasure() {
    cy.xpath(howDidYouReportThisMeasure).click();
  }
  clickmeasurementSpecificationAHRQ() {
    cy.xpath(measurementSpecificationAHRQ).click();
  }

  clickdataSource() {
    cy.xpath(dataSource).click();
  }

  clicknoSupplemental() {
    cy.xpath(noSupplemental).click();
  }
  clickahrqAdministrativeProtocol() {
    cy.xpath(ahrqAdministrativeProtocol).click();
    //cy.xpath(otherAdministrativeProtocolExplain).type("test");
  }
  clicksurveySampleMedicaidPopulation() {
    cy.xpath(surveySampleMedicaidPopulation).click();
  }
  verifyperformanceMeasure() {
    cy.xpath(performanceMeasureText).should("be.visible");
  }
  //verifyadditionalNotes(){
  //   cy.xpath(additionalNotes).type("test");
  //}
  //addTextFilesToFUAADPage() {
  //  const filePath = "/files/";
  //cy.xpath(browseBTN).attachFile(filePath + "test3.docx", {
  //subjectType: "drag-n-drop",
  //});
  //}
  //verifyTextIsUploaded() {
  //cy.xpath(verifyTextFileIsUploaded).should("be.visible");
  //}
  verifyvalidateMeasureButton() {
    cy.xpath(validateMeasureButton).should("be.enabled");
    cy.xpath(validateMeasureButton).click();
    cy.xpath(completeMeasureButton).should("be.enabled");
    cy.xpath(completeMeasureButton).click();
    cy.xpath(saveStatusUnderSaveButton).contains("Saved Moments Ago");
  }

  VerifyReportingOnMeasureNo() {
    cy.wait(500);
    cy.xpath(reporting_no).click();
    cy.xpath(check_service_not_covered).click();
    cy.xpath(check_population_not_covered).click();
    cy.xpath(radio_partial_popu_not_covered).click();
    cy.xpath(text_explain_partial_popu).type(sample_text);

    cy.xpath(check_data_not_available).click();
    cy.xpath(check_data_inconsistencies).click();
    cy.xpath(text_explain_inconsistencies).type(sample_text);

    cy.xpath(check_source_not_accessible).click();
    cy.xpath(check_source_not_accessible_other).click();
    cy.xpath(text_source_not_accessible_other_explain).type(sample_text);

    cy.xpath(check_info_not_collected).click();
    cy.xpath(check_info_not_collected_by_provider).click();

    cy.xpath(check_limitation_with_data).click();
    cy.xpath(text_describe_limitation).type(sample_text);

    cy.xpath(check_small_sample_size).click();
    cy.xpath(num_sample_size).type(22);
  }
}
export default CPAADPAGE;