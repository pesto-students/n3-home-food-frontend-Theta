import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import SelectBox from "./selectBox";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Selectbox component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<SelectBox/>);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<SelectBox />);

    expect(component).toMatchSnapshot();
  });
});