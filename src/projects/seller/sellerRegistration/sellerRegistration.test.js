import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import sellerRegistration from "./sellerRegistration";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Seller Registration Dashboard component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<sellerRegistration />);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<sellerRegistration />);

    expect(component).toMatchSnapshot();
  });
});