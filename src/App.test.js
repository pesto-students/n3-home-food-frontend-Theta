import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("App component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<App/>);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<App />);

    expect(component).toMatchSnapshot();
  });
});