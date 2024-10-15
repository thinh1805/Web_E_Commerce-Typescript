import { Register } from "../Register/Register"
import { Form, Input, Space } from 'antd';
import React, { useContext, useState } from 'react';
import { Button, message, Upload } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import { PhoneOutlined } from '@ant-design/icons';
import { EnvironmentOutlined } from '@ant-design/icons';
import { LockFilled } from '@ant-design/icons';
import { UserAddOutlined } from '@ant-design/icons';
import { Api } from '../../Api/Api';
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
export const Login: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const onFinish = async (values: any) => {
    console.log(values)
    try {
      const response = await Api.post('/login', {
        email: values.email,
        password: values.password
      })
      if (response.data.errors) {
        message.error("Đăng nhập thất bại")
      } else {
        message.success('Đăng nhập thành công')
        authContext?.setToken(response.data.token)
        authContext?.setUser(response.data.Auth) 
        navigate('/') 
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section id="form">{/*form*/}
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-1">
            <div className="login-form">{/*login form*/}
              <h2>Login to your account</h2>
              <Form
                name="login"
                onFinish={onFinish}
                initialValues={{ remember: true }}  // Đặt giá trị mặc định cho "remember"
              >
                <Form.Item
                  name="email"
                  rules={[{
                    required: true,
                    message: 'Vui lòng nhập email!'
                  }]}>
                  <div className="mb">
                    <Input placeholder="Email" prefix={<UserOutlined />} />
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
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit" style={{ backgroundColor: "#FE980F", color: "#FFFFF", width: "120px", marginTop: "10px" }}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>{/*/login form*/}
          </div>
          <div className="col-sm-2">
            <div className="center">
              <h2 className="or">OR</h2>
            </div>
          </div>
          <Register />
        </div>
      </div>
    </section>
  )
}