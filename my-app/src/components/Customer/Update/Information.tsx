import { Form, Input, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { PhoneOutlined } from '@ant-design/icons';
import { EnvironmentOutlined } from '@ant-design/icons';
import { UserAddOutlined } from '@ant-design/icons';
import { Api } from '../../Api/Api';
import { UserOutlined, LockOutlined, } from '@ant-design/icons';
import { AuthContext } from '../../Context/AuthContext';
import { Avatar } from 'antd';
import { MenuAccount } from '../../layout/MenuAccount/Menu';
export const Information: React.FC = () => {
    const [file, setFile] = useState<any>(null);
    const [form] = Form.useForm();
    const auth = useContext(AuthContext)
    const [fileList, setFileList] = useState<any[]>([]); 
    const onFinish = async (values:any) => {
        const url = "user/update/" + auth?.user?.id;
        const config = {
            headers: {
                'Authorization': `Bearer ${auth?.token}`,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            },
        };
        try{
            const formData = new FormData();
            formData.append('name', values.name)
            formData.append('email', values.email)
            formData.append('password',"")
            formData.append('phone', values.phone)
            formData.append('address', values.address)
            if (file) {
                formData.append('avatar', file)
            }
            const response = await Api.post(url,formData,config)
            message.success("Change information successfully")
            setTimeout(async () => {
                const updatedUser = await Api.get("user/information/" + auth?.user?.id, config); // Giả sử bạn có API để lấy lại thông tin người dùng sau khi cập nhật
                console.log(updatedUser)
                auth?.setUser(updatedUser.data.information); // Cập nhật lại thông tin user trong AuthContext hoặc thực hiện hành động cần thiết
                setFile(null); 
                setFileList([]);
            }, 3000); // 3000ms = 3 giây
            
        }catch(error){
            console.log(error)
        }
    }
    const handleUploadChange = (info: any) => {
        if (info.file.status === 'removed') {
            setFile(null);
            setFileList([]);
        } else {
            const avatar = info.fileList[0].originFileObj; // Lấy file gốc từ event upload
            setFile(avatar); // Lưu file vào state
            setFileList([info.fileList[0].originFileObj])
            console.log(avatar);
        }
    };
    useEffect(() => {
        form.setFieldsValue({
            name: auth?.user?.name,
            email: auth?.user?.email,
            phone: auth?.user?.phone,
            address: auth?.user?.address
        });
    }, [auth?.user]);
    return (
        <div>
            <MenuAccount/>
            <div className="col-sm-9">
                <div className="blog-post-area">
                    <h2 className="title text-center">User Update</h2>
                    <div className="col-sm-9 col-sm-offset-1">
                        <Form
                            form={form}
                            name="Information"
                            onFinish={onFinish}
                        >
                            <Form.Item name="name" label="Name">
                                <Input placeholder="Name" prefix={<UserAddOutlined />} className="input" />
                            </Form.Item>
                            <Form.Item name="email" label="Email:">
                                <Input placeholder="Email" prefix={<UserOutlined />} className="input" readOnly disabled />
                            </Form.Item>

                            <Form.Item name="phone" label="Phone:">
                                <Input placeholder="Phone" prefix={<PhoneOutlined />} className="input" />
                            </Form.Item>

                            <Form.Item name="address" label="Address:" >
                                <Input placeholder="Address" prefix={<EnvironmentOutlined />} className="input" />
                            </Form.Item>
                            <Form.Item name="avatar" label="Avatar:">
                                <Upload
                                    listType="picture"
                                    maxCount={1}
                                    beforeUpload={() => false}
                                    onChange={handleUploadChange}
                                    fileList={fileList}
                                    accept="image/png, image/jpeg, image/jpg"
                                >
                                    {/* beforeUpload ={()=>false => không upload file ngay lập tức, xử lý file sau } */}
                                    <Button icon={<UploadOutlined />}>Change avatar</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit" style={{ backgroundColor: "#FE980F", color: "#FFFFF", width: "120px", marginTop: "20px", marginBottom:"100px" }}>
                                    Change 
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div >
    );
}