import { Select } from "antd";
const { Option } = Select;

const SelectBox= () => {
 
    const handleChange = () =>{
        
    }

  return <Select defaultValue="English" style={{ width: 120 }} onChange={handleChange}>
    <Option value="English">English</Option>
    <Option value="Hindi">Hindi</Option>
    </Select>
  
};

export default SelectBox