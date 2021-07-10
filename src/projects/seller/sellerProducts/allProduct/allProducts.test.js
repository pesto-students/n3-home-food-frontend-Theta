import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import AllProducts from "./allProducts";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("All products Dashboard component", () => {
  let wrapper;
  let allApprove = []
  let isLoading = true
  test("render without error", () => {
    wrapper = shallow(<AllProducts products={allApprove} isLoading={isLoading}  />);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<AllProducts products={allApprove} isLoading={isLoading} />);

    expect(component).toMatchSnapshot();
  });
});