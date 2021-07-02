import * as React from "react";
import renderer from "react-test-renderer";
import DataNotFound from "../dataNotFound/dataNotFound";

it("data not found", () => {
  const tree = renderer.create(<DataNotFound text="No Data Found!" />).toJSON();
  expect(tree).toMatchSnapshot();
});
