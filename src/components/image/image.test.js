import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Image from "./image";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Image component", () => {
  let wrapper;
  let url = ''
  test("render without error", () => {
    wrapper = shallow(<Image url={url}/>);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<Image url={url}/>);

    expect(component).toMatchSnapshot();
  });
});