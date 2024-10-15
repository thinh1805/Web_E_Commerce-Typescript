import { Form, Input, Space } from 'antd';
import React, { useContext, useState } from 'react';
import { Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UserAddOutlined } from '@ant-design/icons';
import { Api } from '../../Api/Api';
import { MenuManager } from '../../layout/MenuManager/Menu';
import { Category } from '../Category/Category';
import { Brand } from '../Brand/Brand';
import { Sale } from '../Sales/Sale';
import { DollarOutlined } from '@ant-design/icons';
import { AuthContext } from '../../Context/AuthContext';
export const Add: React.FC = () => {
    const [file, setFile] = useState<any>(null);
    const auth =useContext(AuthContext)
    const [salePercentage, setSalePercentage] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const onFinish = async (values: any) => {
        try {
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ auth?.token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
              };
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('price', values.price);
            formData.append('category', selectedCategory || '');
            formData.append('brand', selectedBrand || '');
            formData.append('company', values.company);
            formData.append('detail', values.detail);

            if (file) {
                formData.append('file', file)
            }
            if (salePercentage !== null) {
                formData.append('sale', salePercentage.toString());  // Thêm giá trị phần trăm vào FormData
            }
            const response = await Api.post('/user/product/add', formData,config)
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }
    const handleUploadChange = (info: any) => {
        if (info.file.status === 'removed') {
            setFile(null);
        } else {
            const avatar = info.fileList[0].originFileObj; // Lấy file gốc từ event upload
            setFile(avatar); // Lưu file vào state
            console.log(avatar);
        }
    };
    return (
        <div>
            <MenuManager />
            <div className="col-sm-9">
                <div className="blog-post-area">
                    <h2 className="title text-center">ADD PRODUCT</h2>
                    <div className="col-sm-10 col-sm-offset-1">
                        <Form
                            name="register"
                            onFinish={onFinish}
                            initialValues={{ remember: true }}  // Đặt giá trị mặc định cho "remember"
                        >
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{
                                    required: true,
                                    message: "Vui lòng nhập tên sản phẩm"
                                }]}>
                                <div className="mb">
                                    <Input placeholder="Name" prefix={<UserAddOutlined />} className="input" />
                                </div>
                            </Form.Item>
                            <Form.Item
                                name="price"
                                label="Price"
                                rules={[{
                                    required: true,
                                    message: 'Vui lòng nhập giá sản phẩm '
                                }]}>
                                <div className="mb">
                                    <Input placeholder="10000000" prefix={<DollarOutlined />} className="input" />
                                </div>
                            </Form.Item>
                            <Form.Item
                                name="category"
                                label="Category"
                                // rules={[{
                                //     required: true,
                                //     message: 'Vui lòng chọn Category!'
                                // }]}
                                >
                                <div className="mb">
                                    <Category CategorySelected={setSelectedCategory}/>
                                </div>
                            </Form.Item>
                            <Form.Item
                                name="brand"
                                label="Brand"
                                // rules={[{
                                //     required: true,
                                //     message: "Vui lòng chọn Brand!"
                                // }]}
                                >
                                <div className="mb">
                                    <Brand BrandSelected={setSelectedBrand}/>
                                </div>
                            </Form.Item>
                            <Form.Item
                                name="sale"
                                label="Sale"
                                // rules={[{
                                //     required: true,
                                //     message: "Vui lòng chọn Sale!"
                                // }]}
                                >
                                <div className="mb">
                                    <Sale onPercentageChange={setSalePercentage}/>
                                </div>
                            </Form.Item>
                            <Form.Item
                                name="image"
                                label="Image"
                                rules={[{
                                    required: true,
                                    message: "Vui lòng chọn ảnh sản phẩm!"
                                }]}
                            >
                                <Upload
                                    listType="picture"
                                    maxCount={3}
                                    beforeUpload={() => false}
                                    onChange={handleUploadChange}
                                    accept="image/png, image/jpeg, image/jpg"
                                >
                                    {/* beforeUpload ={()=>false => không upload file ngay lập tức, xử lý file sau } */}
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                name="company"
                                label="Company"
                                rules={[{
                                    required: true,
                                    message: "Vui lòng nhập tên công ty"
                                }]}>
                                <div className="mb">
                                    <Input placeholder="Company" className="input" />
                                </div>
                            </Form.Item>
                            <Form.Item
                                name="detail"
                                label="Detail"
                                rules={[{
                                    required: true,
                                    message: "Vui lòng nhập chi tiết sản phẩm"
                                }]}>
                                <div className="mb">
                                    <Input  className="input" />
                                </div>
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit" style={{ backgroundColor: "#FE980F", color: "#FFFFF", width: "120px", marginTop: "10px" }}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

            </div>
        </div>

    )
}