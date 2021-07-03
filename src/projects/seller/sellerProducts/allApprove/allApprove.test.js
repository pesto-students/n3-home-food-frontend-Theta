import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import AllApprove from "./allApprove";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Seller Dashboard component", () => {
  let wrapper;
  let allApprove = []
  let isLoading = true
  test("render without error", () => {
    wrapper = shallow(<AllApprove products={allApprove} isLoading={isLoading} />);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<AllApprove products={allApprove} isLoading={isLoading} />);

    expect(component).toMatchSnapshot();
  });
});