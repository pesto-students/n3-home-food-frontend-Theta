import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import SellerGraphs from "./sellerGraphs";
import EnzymeAdapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("testing seller graphs component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<SellerGraphs />);
    expect(wrapper.length).toBe(1);
  });

  describe("Seller Graph Component", () => {
    it('should render correctly in "debug" mode', () => {
      const component = shallow(<SellerGraphs />);

      expect(component).toMatchSnapshot();
    });
  });
});
