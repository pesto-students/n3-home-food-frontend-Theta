import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import MyProducts from "./myProducts";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("My products Dashboard component", () => {
  let wrapper;
  let allApprove = []
  let isLoading = true
  test("render without error", () => {
    wrapper = shallow(<MyProducts products={allApprove} isLoading={isLoading}  />);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<MyProducts products={allApprove} isLoading={isLoading} />);

    expect(component).toMatchSnapshot();
  });
});