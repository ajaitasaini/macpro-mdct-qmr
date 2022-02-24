import * as CUI from "@chakra-ui/react";

interface Props {
  show: boolean;
  children?: React.ReactNode;
}

export const QuestionChild = ({ show, children }: Props) => {
  return (
    <CUI.Box
      display={show ? "block" : "none"}
      pl={6}
      ml={2}
      borderLeft="4px"
      borderColor="blue.500"
      py={3}
    >
      {children}
    </CUI.Box>
  );
};
