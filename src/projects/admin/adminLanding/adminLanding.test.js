import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import AdminLanding from "./adminLanding";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Admin Landing component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<AdminLanding />);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<AdminLanding />);

    expect(component).toMatchSnapshot();
  });
});