import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { AddHHCoreSet } from ".";
import { QueryClient, QueryClientProvider } from "react-query";
import { useApiMock } from "utils/testUtils/useApiMock";

const queryClient = new QueryClient();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    year: "2021",
    state: "DC",
  }),
}));

beforeEach(() => {
  useApiMock({});
  render(
    <QueryClientProvider client={queryClient}>
      <RouterWrappedComp>
        <AddHHCoreSet />
      </RouterWrappedComp>
    </QueryClientProvider>
  );
});

describe("Test HealthHome coreset component", () => {
  test("Check that the nav renders", () => {
    expect(screen.getByTestId("state-layout-container")).toBeVisible();
  });

  it("renders the correct child components", () => {
    expect(
      screen.getByLabelText(/Select the SPA you are reporting on/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /remember to complete all Health Home Core Set Questions and Health Home Core Set Measures to submit for CMS review./i
      )
    ).toBeInTheDocument();
  });
});
