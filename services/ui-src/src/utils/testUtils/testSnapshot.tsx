import { renderWithHookForm } from "./reactHookFormRenderer";
import { useApiMock } from "utils/testUtils/useApiMock";

interface AdditionalOptions {
  defaultValues?: Object;
}

// interface APIData {}

interface Props {
  component: JSX.Element;
  defaultValues?: AdditionalOptions["defaultValues"];
  apiData?: any;
}
/**
 * Compare a component with a stored snapshot.
 * @param {JSX.Element} component Component to be compared with snapshot
 * @param {AdditionalOptions} defaultValues ReactHookForm data to be passed to the render function
 */
export const testSnapshot = ({
  component,
  defaultValues = {},
  apiData = {},
}: Props) => {
  useApiMock(apiData);
  const { container } = renderWithHookForm(component, defaultValues);
  cleanAttributes(container);
  expect(container).toMatchSnapshot();
};

/**
 * Clean up attributes from the rendered component by removing the ids generated by Chakra.
 *
 * Before:
 *   for="field-1379718737-40"
 *   id="field-1379718737-40-label"
 *
 * After:
 *   for="field-40"
 *   id="field-40-label"
 *
 * This is useful during snapshot testing. Snapshot comparisons will fail without addressing these items.
 *
 * @param {HTMLElement} container The component to clean up.
 */
const cleanAttributes = (container: HTMLElement) => {
  const attributes = [
    "id",
    "for",
    "aria-controls",
    "aria-describedby",
    "aria-labelledby",
  ];
  const prefixes = ["field", "radio", "popover"];

  const clean = (attr: string) => {
    const attrList = attr.split("-");
    // I can't find a better way to do this in the Chakra docs. If there is though, we should use it.
    if (prefixes.includes(attrList[0])) {
      if (attrList[0] === "popover") {
        attrList.splice(2, 1);
      } else {
        attrList.splice(1, 1);
      }
      return attrList.join("-");
    } else {
      return attr;
    }
  };

  attributes.forEach((attr) => {
    if (container.hasAttribute(attr)) {
      const value = clean(container.getAttribute(attr)!);
      container.setAttribute(attr, value);
    }
  });

  Array.from(container.children).forEach((child) => {
    cleanAttributes(child as HTMLElement);
  });
};
