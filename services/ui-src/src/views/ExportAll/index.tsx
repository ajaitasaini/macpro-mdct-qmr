import * as QMR from "components";
import Measures from "measures";
import { useGetMeasures } from "hooks/api";
import { createElement } from "react";
import { getPDF } from "libs/api";
import { useParams } from "react-router-dom";
import base64 from "base-64";

// type CoreSetType = "A" | "C" | "H";

export const ExportAll = () => {
  const { state, coreSetId, year } = useParams();

  const { data, isLoading } = useGetMeasures();
  if (isLoading || !data.Items) {
    return <QMR.LoadingWave />;
  }

  const sortedData = data?.Items?.sort((a: any, b: any) =>
    a?.measure?.localeCompare(b?.measure)
  ).filter((item: any) => item?.measure !== "CSQ");

  return (
    <>
      <button
        type="button"
        onClick={async () => {
          const html = document.querySelector("html")!.innerHTML!;

          const base64String = base64.encode(escape(html));

          const test = await getPDF({
            body: base64String,
            state,
            coreSet: coreSetId,
            year,
          });
          console.log(test);
        }}
      >
        Testing
      </button>
      {sortedData?.map((measure: any) => {
        const Comp = Measures[measure.year][measure.measure];

        return (
          <QMR.PrintableMeasureWrapper
            measure={createElement(Comp)}
            measureData={measure}
            measureId={measure.measure}
            name={measure.description}
            year={measure.year}
            key={measure.compoundKey}
          />
        );
      })}
    </>
  );
};
