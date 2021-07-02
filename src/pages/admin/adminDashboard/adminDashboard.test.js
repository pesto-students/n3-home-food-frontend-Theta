import * as React from "react";
import renderer from "react-test-renderer";
import  AdminDashboard from './adminDashboard'

describe('snapshot testing admin dashboard component', ()=> {
   
    it('line cart component',()=> {
        const tree = renderer.create(<AdminDashboard />).toJSON();
        expect(tree).toMatchSnapshot();
    } )
} )

