import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import CustomerHome from "./customerHome";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Customer Home component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<CustomerHome />);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<CustomerHome />);

    expect(component).toMatchSnapshot();
  });
});