import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import AdminDashboard from "../adminDashboard/adminDashboard";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Admin Dashboard component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<AdminDashboard />);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<AdminDashboard />);

    expect(component).toMatchSnapshot();
  });
});