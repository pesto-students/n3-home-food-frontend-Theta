import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import payment from "./payment";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Payment component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<payment />);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<payment />);

    expect(component).toMatchSnapshot();
  });
});