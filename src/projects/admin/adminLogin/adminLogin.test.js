import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import adminLogin from "./adminLogin";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Admin Login component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<adminLogin />);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<adminLogin />);

    expect(component).toMatchSnapshot();
  });
});