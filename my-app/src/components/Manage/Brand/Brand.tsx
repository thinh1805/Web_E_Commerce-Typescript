import React, { useEffect, useState } from 'react';
import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd';
import { Api } from '../../Api/Api';
type LabelRender = SelectProps['labelRender'];


const labelRender: LabelRender = (props) => {
  const { label, value } = props;

  if (label) {
    return value;
  }
  return <span>No option match</span>;
};
interface BrandProps{
  BrandSelected:(value:string | null) =>void;
}
export const Brand: React.FC<BrandProps> = ({BrandSelected}) => {
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedValue,setSelectedValue] = useState<string| undefined>();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await Api.get('/category-brand')
      console.log(response)
      const data = response.data.brand.map((item: any) => ({
        label: item.brand,
        value: item.id,
      }));
      setOptions(data)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }
  const handleSelectChange = (value:any)=>{
    setSelectedValue(value);
    BrandSelected(value);
    console.log(value)
  }
  return (
    <Select
      labelRender={(option) => option?.label}
      value={selectedValue}
      style={{ width: '100%' }}
      options={options || []}
      loading={loading}
      onChange={handleSelectChange}
      notFoundContent={loading ? <Spin size="small" /> : <span>No data</span>}
    />
  )
};