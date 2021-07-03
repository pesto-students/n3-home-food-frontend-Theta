import * as React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import SellerProducts from "./order";
import PastOrders from "./pastOrder";
import CurrentOrders from "./currentOrder";
Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Orders component", () => {
  let wrapper;
  test("render without error", () => {
    wrapper = shallow(<SellerProducts />);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<SellerProducts />);

    expect(component).toMatchSnapshot();
  });
});

describe("Past Order Component", () => {
  let wrapper;
  let pastOrdersItem = []
  test("render without error", () => {
    wrapper = shallow(<PastOrders orders={pastOrdersItem} />);
    expect(wrapper.length).toBe(1);
  });

  test('should render correctly in "debug" mode', () => {
    const component = shallow(<PastOrders orders={pastOrdersItem} />);

    expect(component).toMatchSnapshot();
  });
});

describe("current Order Component", () => {
    let wrapper;
    let pastOrdersItem = []
    test("render without error", () => {
      wrapper = shallow(<CurrentOrders orders={pastOrdersItem} />);
      expect(wrapper.length).toBe(1);
    });
  
    test('should render correctly in "debug" mode', () => {
      const component = shallow(<CurrentOrders orders={pastOrdersItem} />);
  
      expect(component).toMatchSnapshot();
    });
  });
  
