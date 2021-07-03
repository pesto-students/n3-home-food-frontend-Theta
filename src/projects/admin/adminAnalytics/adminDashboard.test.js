import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import AdminAnalytics from "./AdminAnalytics";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Admin Dashboard component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<AdminAnalytics />);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<AdminAnalytics />);

    expect(component).toMatchSnapshot();
  });
});
