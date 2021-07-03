import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import ProductCatalogue from "./index";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Product catalogue component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<ProductCatalogue />);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<ProductCatalogue />);

    expect(component).toMatchSnapshot();
  });
});