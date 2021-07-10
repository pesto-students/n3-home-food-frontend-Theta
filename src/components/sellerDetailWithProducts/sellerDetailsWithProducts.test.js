import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import sellerDetailWithProducts from "./sellerDetailWithProducts";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Seller Card component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<sellerDetailWithProducts/>);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<sellerDetailWithProducts />);

    expect(component).toMatchSnapshot();
  });
});