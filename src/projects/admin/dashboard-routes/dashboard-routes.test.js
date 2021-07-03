import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import DashboardRoutes from "./dashboardRoutes";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Admin Routes component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<DashboardRoutes />);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<DashboardRoutes />);

    expect(component).toMatchSnapshot();
  });
});