import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import SellerProducts from "./sellerProducts";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Seller products Dashboard component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<SellerProducts   />);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<SellerProducts  />);

    expect(component).toMatchSnapshot();
  });
});