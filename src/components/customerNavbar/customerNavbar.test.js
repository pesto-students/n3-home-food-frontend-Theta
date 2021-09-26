import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import CustomerNavbar from "./customerNavbar";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Customer Navbar component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<CustomerNavbar/>);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<CustomerNavbar />);

    expect(component).toMatchSnapshot();
  });
});