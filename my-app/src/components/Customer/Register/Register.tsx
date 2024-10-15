import { Form, Input, Space } from 'antd';
import React, { useState } from 'react';
import { Button, message, Upload } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import { PhoneOutlined } from '@ant-design/icons';
import { EnvironmentOutlined } from '@ant-design/icons';
import { LockFilled } from '@ant-design/icons';
import { UserAddOutlined } from '@ant-design/icons';
import { Api } from '../../Api/Api';
export const Register: React.FC = () => {
    
    const [file, setFile] = useState<any>(null);

    const onFinish = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name)
            formData.append('email', values.email)
            formData.append('password', values.password)
            formData.append('phone', values.phone)
            formData.append('address', values.address)
            console.log(values.password)
            if (file) {
                formData.append('avatar', file)
            }
            const response = await Api.post('/register', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            if (response.data.errors) {
                message.error("Đăng ký thất bại")
                console.log(response)
            } else {
                message.success("Đăng ký thành công")

            }
        } catch (error) {
            console.log(error);
            message.error("Lỗi, vui lòng thử lại")
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
        <div className="col-sm-4">
            <div className="signup-form">{/*sign up form*/}
                <h2>New User Signup!</h2>
                <Form
                    name="register"
                    onFinish={onFinish}
                    initialValues={{ remember: true }}  // Đặt giá trị mặc định cho "remember"
                >
                    <Form.Item
                        name="name"
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập name"
                        }]}>
                        <div className="mb">
                            <Input placeholder="Name" prefix={<UserAddOutlined />} className="input" />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập email!'
                        }]}>
                        <div className="mb">
                            <Input placeholder="Email" prefix={<UserOutlined />} className="input" />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập số điện thoại!'
                        }]}>
                        <div className="mb">
                            <Input placeholder="Phone" prefix={<PhoneOutlined />} className="input" />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="address"
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập địa chỉ!"
                        }]}>
                        <div className="mb">
                            <Input placeholder="Address" prefix={<EnvironmentOutlined />} className="input" />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập mật khẩu!"
                        }]}>
                        <div className="mb">
                            <Input.Password prefix={<LockFilled />} placeholder="Password" className='input' />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="avatar"
                    >
                        <Upload
                            listType="picture"
                            maxCount={1}
                            beforeUpload={() => false}
                            onChange={handleUploadChange}
                            accept="image/png, image/jpeg, image/jpg"
                        >
                            {/* beforeUpload ={()=>false => không upload file ngay lập tức, xử lý file sau } */}
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: "#FE980F", color: "#FFFFF", width: "120px", marginTop: "10px" }}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div >
    )
}