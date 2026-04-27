import { render } from "@testing-library/react-native";
import * as React from "react";

import { MonoText } from "../StyledText";

it("renders correctly", () => {
  const { toJSON } = render(<MonoText>Snapshot test!</MonoText>);
  expect(toJSON()).toMatchSnapshot();
});
