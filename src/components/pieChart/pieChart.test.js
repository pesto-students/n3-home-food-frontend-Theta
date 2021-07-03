import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import PieChart from "./pieChart";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("PieChart component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<PieChart/>);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<PieChart />);

    expect(component).toMatchSnapshot();
  });
});