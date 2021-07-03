import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Login from "./login";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Login component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<Login/>);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<Login />);

    expect(component).toMatchSnapshot();
  });
});