import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import SellerLanding from "./sellerLanding";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Seller Dashboard component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<SellerLanding />);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<SellerLanding />);

    expect(component).toMatchSnapshot();
  });
});