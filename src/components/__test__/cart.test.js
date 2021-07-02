import * as React from "react";
import renderer from "react-test-renderer";
import Cart from "cart/cart";

it("check cart test", () => {
  const tree = renderer.create(<Cart />).toJSON();
  expect(tree).toMatchSnapshot();
});
