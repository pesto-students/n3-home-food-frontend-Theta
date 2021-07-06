import React from "react";
import renderer from "react-test-renderer";
import DataNotFound from "../dataNotFound";

it("renders correctly when there are no items", () => {
  const tree = renderer.create(<DataNotFound text="kapil" />).toJSON();
  expect(tree).toMatchSnapshot();
});
