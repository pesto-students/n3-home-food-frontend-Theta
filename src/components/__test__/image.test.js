import * as React from "react";
import renderer from "react-test-renderer";
import Image from "image/image";

it("data not found", () => {
  const tree = renderer
    .create(<Image height={200} width={200} url="" redius="20px" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
