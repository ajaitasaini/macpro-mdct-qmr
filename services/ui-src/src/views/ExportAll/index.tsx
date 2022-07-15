import { useState } from "react";
import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import Measures, { QualifierData } from "measures";
import { useGetMeasures } from "hooks/api";
import { SPA } from "libs/spaLib";
import { createElement } from "react";
import "index.scss";
import { getPDF } from "libs/api";
import { useParams } from "react-router-dom";

export const ExportAll = () => {
  const { state, coreSetId, year } = useParams();
  const [isLoadingPDF, setIsLoadingPDF] = useState(false);

  const coreSetInfo = coreSetId?.split("_") ?? [coreSetId];
  const tempSpa =
    coreSetInfo.length > 1
      ? SPA[year!].filter(
          (s) => s.id === coreSetInfo[1] && s.state === state
        )[0]
      : undefined;
  const spaName =
    tempSpa && tempSpa?.id && tempSpa?.name && tempSpa.state
      ? `${tempSpa.state} ${tempSpa.id} - ${tempSpa.name}`
      : undefined;

  const openPdf = (basePdf: string) => {
    let byteCharacters = atob(basePdf);
    let byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    let file = new Blob([byteArray], { type: "application/pdf;base64" });
    let fileURL = URL.createObjectURL(file);

    window.open(fileURL);
  };

  const makePrinceRequest = async () => {
    // gather chakra css variables and make available for the body
    for (let i = 0; i < document.styleSheets.length - 1; i++) {
      if (
        !document.styleSheets[i].href &&
        document.styleSheets[i]?.cssRules[0]?.cssText.includes("--chakra") &&
        document.styleSheets[i]?.cssRules[0]?.cssText.includes(":root")
      ) {
        const chakraVars = document.styleSheets[i];
        document.body.setAttribute(
          "style",
          chakraVars.cssRules[0].cssText.split(/(\{|\})/g)[2]
        );
      }
    }

    const styleString = [
      //@ts-ignore
      ...document.querySelectorAll("[data-emotion]"),
    ].flatMap(({ sheet }) =>
      [...sheet.cssRules].map((rules) => {
        // any mass changes to chakra-css rules should go here
        return rules.cssText.replace(
          /text-align: right/g,
          "text-align: center"
        );
      })
    );

    // emotion tags put into the body
    for (const style of styleString) {
      const styleTag = document.createElement("style");
      document.body.appendChild(styleTag);
      styleTag.appendChild(document.createTextNode(style));
    }

    // any additional css to adjust page
    const styleTag = document.createElement("style");
    document.body.appendChild(styleTag);
    styleTag.appendChild(
      document.createTextNode(
        `@page {}\n` +
          ` * { box-decoration-break: slice !important; }\n` +
          ` extra-left-margin-print { padding: 20px 10px 10px 60px !important; }\n` +
          ` print-padding-box { margin: 20px 10px 50px 10px !important; }\n` +
          ` h1 { margin: auto !important; align-text: center !important; width: fitcontent !important; }\n`
      )
    );

    // remove to top links and no script tag
    const html = document.querySelector("html")!;
    document
      .querySelectorAll('[data-cy="surfaceLinkTag"]')
      .forEach((v) => v.remove());
    html.querySelector("noscript")?.remove();

    // fixing non standard characters
    const htmlString = html
      .outerHTML!.replaceAll(
        '<link href="',
        `<link href="https://${window.location.host}`
      )
      .replaceAll(`src="/`, `src="https://${window.location.host}/`)
      .replaceAll(`’`, `'`)
      .replaceAll(`‘`, `'`)
      .replaceAll(`”`, `"`)
      .replaceAll(`“`, `"`)
      .replaceAll("\u2013", "-")
      .replaceAll("\u2014", "-")
      .replaceAll(" flex;", " block;")
      .replaceAll(" inline;", " block;");

    const base64String = btoa(unescape(encodeURIComponent(htmlString)));

    const pdf = await getPDF({
      body: base64String,
      state,
      coreSet: coreSetId,
      year,
    });

    openPdf(pdf);
  };

  const { data, isLoading } = useGetMeasures();
  if (isLoading || !data.Items) {
    return <QMR.LoadingWave />;
  }

  const csqMeasure = data?.Items?.find((d: any) => d.measure === "CSQ");
  const regMeasures = data?.Items?.filter((d: any) => d.measure !== "CSQ")
    // filter out non-created State Specific measures
    ?.filter((m: any) => !/SS-\d-HH/g.test(m.measure) || m?.userCreated)
    .sort((a: any, b: any) => a?.measure?.localeCompare(b?.measure));
  const sortedData = [csqMeasure, ...regMeasures];

  return (
    <>
      <style key="printerPreviewStyles">
        {`.disabled-print-preview-items { display: none !important; }\n` +
          `select option { display: none }` +
          `select option[selected] { display: table-row; }\n`}
      </style>
      <CUI.Container maxW={"xs"} key="printPageButtonWrapper">
        <CUI.Button
          disabled={isLoadingPDF}
          isFullWidth={true}
          type="button"
          className="hidden-print-items"
          margin="1"
          isLoading={isLoadingPDF}
          loadingText="Preparing"
          colorScheme="orange"
          variant="solid"
          fontWeight="700"
          fontSize="large"
          onClick={async () => {
            setIsLoadingPDF(true);
            await makePrinceRequest();
            setIsLoadingPDF(false);
          }}
        >
          PRINT PDF
        </CUI.Button>
      </CUI.Container>
      <CUI.Center key="buttonGridLabel">
        <CUI.Text
          gridColumn={"1 / -1"}
          fontSize={"xl"}
          style={
            { fontWeight: "bold", "--testing": "red" } as React.CSSProperties
          }
          id="top-of-page"
          as="h2"
          my="4"
        >
          Click on one of the measures below to navigate to it.
        </CUI.Text>
      </CUI.Center>
      <CUI.Center key="buttonGridWrapper">
        <CUI.SimpleGrid
          columns={{ sm: 2, md: 4, lg: 6, xl: 8 }}
          spacingX={5}
          spacingY={10}
        >
          {sortedData?.map((measure: any) => {
            return (
              <CUI.Button
                as="a"
                width={"28"}
                href={`#${measure?.measure}`}
                key={`buttonLink.${measure?.measure}`}
              >
                {measure?.measure}
              </CUI.Button>
            );
          })}
        </CUI.SimpleGrid>
      </CUI.Center>
      {sortedData?.map((measure: any) => {
        const Comp =
          measure.measure === "CSQ"
            ? Measures?.[measure.year]?.["Qualifier"]
            : Measures[measure.year][measure.measure];

        const defaultData =
          measure.measure === "CSQ"
            ? QualifierData.find((d) => d.year === measure.year + "")?.data
            : undefined;

        return (
          <CUI.Box key={`measure-${measure.measure}-wrapper`}>
            <QMR.PrintableMeasureWrapper
              measure={createElement(Comp)}
              measureData={measure}
              measureId={measure.measure}
              name={measure.description}
              year={measure.year}
              key={measure.compoundKey}
              defaultData={defaultData}
              spaName={spaName}
            />
            <CUI.Center key={`returnButton.${measure.measure}`} mt="2">
              <a data-cy="surfaceLinkTag" href="#top-of-page">
                Back to top
              </a>
            </CUI.Center>
          </CUI.Box>
        );
      })}
    </>
  );
};
