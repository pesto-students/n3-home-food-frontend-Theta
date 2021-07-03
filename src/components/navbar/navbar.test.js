import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { RejectProductModal } from "components/manageProductmodal/rejectProduct";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Navbar component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<RejectProductModal/>);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<RejectProductModal />);

    expect(component).toMatchSnapshot();
  });
});