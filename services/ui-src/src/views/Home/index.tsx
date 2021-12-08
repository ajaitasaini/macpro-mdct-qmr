import { Navigate } from "react-router-dom";
import { CognitoUser } from "@aws-amplify/auth";
import config from "config";
import * as CUI from "@chakra-ui/react";
import "./index.module.scss";

interface Props {
  user: CognitoUser;
}

export function Home({ user }: Props): JSX.Element {
  // this is absolutely the wrong way to do this. So its just a placeholder for now
  // @ts-ignore
  const role = user?.signInUserSession?.idToken?.payload?.["custom:cms_roles"];
  if (role === "mdctqmr-approver") {
    return <Navigate to={`/admin`} />;
  }
  // this is absolutely the wrong way to do this. So its just a placeholder for now
  // @ts-ignore
  const state = user?.signInUserSession?.idToken?.payload?.["custom:cms_state"];
  if (!state) {
    return (
      <CUI.Box data-testid="Home-Container">
        <CUI.Text>Ooooh! no state for you</CUI.Text>
      </CUI.Box>
    );
  }
  return <Navigate to={`/${state}/${config.currentReportingYear}`} />;
}