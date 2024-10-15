import React, { useEffect, useState } from 'react';
import type { SelectProps } from 'antd';
import { Select, Spin } from 'antd';
import { Api } from '../../Api/Api';

type LabelRender = SelectProps['labelRender'];


const labelRender: LabelRender = (props) => {
    const { label, value } = props;

    if (label) {
        return value;
    }
    return <span>No option match</span>;
};
interface CategoryProps{
    CategorySelected:(value: string | null) => void;
}

export const Category: React.FC<CategoryProps> = ({CategorySelected}) => {
    const [options, setOptions] = useState<SelectProps['options']>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedValue,setSelectedValue] = useState<string| undefined>()
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        try{
            const response = await Api.get('/category-brand')
            console.log(response)
            const data = response.data.category.map((item:any)=>({
                label:item.category,
                value:item.id,
            }));
            setOptions(data)
            setLoading(false);
            console.log(response)
        }catch(error){
            console.log(error)
            setLoading(false);
        }
    }
    const handleSelectChange = (value: string) => {
        setSelectedValue(value);
        CategorySelected(value); // Gửi giá trị được chọn về component Add
      };
    return (
        <Select
            labelRender={(option) => option?.label}
            value={selectedValue}
            style={{ width: '100%' }}
            options={options || []}
            onChange={handleSelectChange}
            loading={loading}
            notFoundContent={loading ? <Spin size="small" /> : <span>No data</span>}
        />
    )
};
