import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { Checkout } from "./checkout";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Checkout component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<Checkout />);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<Checkout />);

    expect(component).toMatchSnapshot();
  });
});