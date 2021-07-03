import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Cart from "./cart";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Cart component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<Cart/>);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<Cart />);

    expect(component).toMatchSnapshot();
  });
});