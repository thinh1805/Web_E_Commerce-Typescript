import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { MenuAccount } from '../../layout/MenuAccount/Menu';
import { Api } from '../../Api/Api';
import { AuthContext } from '../../Context/AuthContext';

// interface DataType {
//     key: React.Key;
//     name: string;
//     chinese: number;
//     math: number;
//     english: number;
// }
interface DataType {
    key: React.Key;
    id: number;
    name: string;
    image: string;
    price: number;
}
const columns: TableColumnsType<DataType> = [
    {
        title: 'ID',
        dataIndex: 'id',
        key:'id'
    },
    {
        title: 'Product Name',
        dataIndex: 'name',
        key:'name',
        // sorter: {
        //     compare: (a, b) => a.chinese - b.chinese,
        //     multiple: 3,
        // },
        sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key:'price',
        render: (price: number) => `$${price.toFixed(2)}`,
        // sorter: {
        //     compare: (a, b) => a.english - b.english,
        //     multiple: 1,
        // },
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Image',
        dataIndex: 'image',
        key:'image',
        render:(image:string) =><img src={image} alt="product" style={{ width: '50px', height: '50px' }}></img>
        // sorter: {
        //     compare: (a, b) => a.math - b.math,
        //     multiple: 2,
        // },
    },
    {
        title: 'Action', // Cột Action
        key: 'action',
        //: Ký hiệu dấu gạch dưới đại diện cho tham số đầu tiên của hàm. 
        // Trong trường hợp này, tham số đầu tiên là giá trị của ô (text), 
        // nhưng không cần sử dụng nó, nên dùng dấu gạch dưới để bỏ qua nó 
        // (đây là một cách làm sạch code)
        // record: Đây là tham số thứ hai, đại diện cho đối tượng dòng (row) hiện tại. 
        // Nó chứa toàn bộ dữ liệu của dòng tương ứng.
        render: (_, record) => (
            <span>
                <button
                    onClick={() => handleEdit(record.id)} 
                    style={{ marginRight: 8 }}>
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(record.id)} 
                    style={{ color: 'red' }}>
                    Delete
                </button>
            </span>
        ),
    },
];
const handleEdit = (id: number) => {
    console.log('Edit product with ID:', id);
    // Xử lý logic chỉnh sửa sản phẩm
};

const handleDelete = (id: number) => {
    console.log('Delete product with ID:', id);
    // Xử lý logic xoá sản phẩm
    // Bạn có thể gọi API để xoá sản phẩm từ database
};

export const Product: React.FC = () => {
    
    const auth = useContext(AuthContext)
    const [data, setData] = useState<DataType[]>([]);
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    useEffect(()=>{
        if(auth?.token){
            getData();
        }
    },[auth?.token]);
    const getData = async()=> {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + auth?.token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };
        try{
            const response = await Api.get("/user/my-product", config)
            const products = response.data.data.map((item:any)=>({
                key:item.id,
                id:item.id,
                name:item.name,
                image:item.image,
                price:item.price
            }));
            setData(products)
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div>
            <MenuAccount/>
            <div className="col-sm-9">
                <div className="blog-post-area">
                    <h2 className="title text-center">My Product</h2>
                    {/* <Table<DataType> columns={columns} dataSource={data} onChange={onChange} /> */}
                    <Table<DataType> columns={columns} onChange={onChange} />
                </div>
            </div>
        </div>
        
    
    )
}