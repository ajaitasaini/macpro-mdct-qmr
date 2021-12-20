import { ReactElement } from "react";
import { createElement } from "react";
import { Route, Routes } from "react-router-dom";
import { CognitoUser } from "@aws-amplify/auth";
import * as Views from "views";
import * as QMR from "components";
import Measures from "measures";
import { measuresList, MeasuresListItem } from "measures/measuresList";

export type Params = "state" | "year" | "coreset" | "measure";

// Todo: Uncomment this segment when need to run S3 locally
///////////////////////////////////////////////////////////
// import AWS from "aws-sdk";
// import {
//   s3AmplifyUpload,
//   s3LocalUploader,
//   s3AmplifyGetURL,
//   s3LocalGetURL,
// } from "libs/awsLib";
// import config from "config";

interface MeasureRoute {
  path: string;
  el: ReactElement;
}

// For each year we want a route for each measure.
// The measures available for each year are defined in the measuresList
// eg. http://localhost:3000/:state/2021/:coreset/AMM-AD

const measureRoutes: MeasureRoute[] = [];

Object.keys(measuresList).forEach((year: string) => {
  measuresList[year].forEach(({ measure, name }: MeasuresListItem) => {
    // @ts-ignore
    if (measure in Measures[year]) {
      // @ts-ignore
      const Comp = Measures[year][measure];

      measureRoutes.push({
        path: `:state/${year}/:coreset/${measure}`,
        el: createElement(QMR.MeasureWrapper, { name }, createElement(Comp)),
      });
    }
  });
});

export function AppRoutes({ user }: { user: CognitoUser }) {
  return (
    <main id="main-wrapper">
      <Routes>
        <Route path="/" element={<Views.Home user={user} />} />
        <Route path=":state/:year" element={<Views.StateHome />} />
        <Route
          path=":state/:year/add-child"
          element={<Views.AddChildCoreSet />}
        />
        <Route path=":state/:year/add-hh" element={<Views.AddHHCoreSet />} />
        <Route path=":state/:year/:coreset" element={<Views.CoreSet />} />
        <Route path="OH/2021/ACS/AIF-HH" element={<Views.DemoMeasure />} />
        {measureRoutes.map((m: MeasureRoute) => (
          <Route path={m.path} element={m.el} key={m.path} />
        ))}
        <Route path="components" element={<Views.DemoComponents />} />
        <Route path="*" element={<Views.NotFound />} />
      </Routes>
    </main>
  );
}
