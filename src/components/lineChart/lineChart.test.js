import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import LineChart from "./lineChart";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Line Chart component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<LineChart/>);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<LineChart />);

    expect(component).toMatchSnapshot();
  });
});