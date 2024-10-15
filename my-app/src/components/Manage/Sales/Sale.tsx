import React, { useState } from 'react';
import { Select , Input} from 'antd';
import type { SelectProps } from 'antd';
type LabelRender = SelectProps['labelRender'];

const options = [
  { label: 'Sale', value: 'Sale' },
  { label: 'New', value: 'New' },
];

const labelRender: LabelRender = (props) => {
  const { label, value } = props;

  if (label) {
    return value;
  }
  return <span>No option match</span>;
};
interface SaleProps {
  onPercentageChange: (value: number | null) => void; // Thêm prop để truyền callback
}
export const Sale: React.FC<SaleProps> = ({ onPercentageChange }) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>('new')
  const [salePercentage, setSalePercentage] = useState<number | undefined>(undefined)
  const handleSelectChange = (value:string) =>{
    setSelectedValue(value);
    if(value !== 'Sale'){
      setSalePercentage(undefined);
      onPercentageChange(null);
    }
  }
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const percentage = Number(e.target.value);
    setSalePercentage(percentage);
    onPercentageChange(percentage); 
  }
  return (
    // <Select labelRender={labelRender} defaultValue="1" style={{ width: '100%' }} options={options} />
    <div>
      <Select
        labelRender={labelRender}
        defaultValue="New"
        style={{ width: '100%', marginBottom: '16px' }}
        options={options}
        onChange={handleSelectChange}
      />
      {selectedValue === 'Sale' && (
        <Input
          type="number"
          placeholder="Enter percentage (%)"
          value={salePercentage}
          onChange={handleInputChange}
          style={{ width: '100%' }}
        />
      )}
    </div>
  )
};