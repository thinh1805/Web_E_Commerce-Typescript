import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { Button, Checkbox, Form, Input, Flex, message } from 'antd';
import { Api } from "../../../Api/Api";
import { useParams } from "react-router-dom";
export const Comment:React.FC = () => {
    const auth = useContext(AuthContext);
    const [form] = Form.useForm();
    const param = useParams<{id:string}>()
    
    const onFinish = async (values: any) => {
        if (!auth?.token) {
            message.error("Vui lòng đăng nhập để bình luận")
            return;
        } else {

            let config = {
                headers: {
                    'Authorization': 'Bearer ' + auth?.token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            let url = "blog/comment/" + param.id
            const formData = new FormData();
            formData.append('id_blog', param.id ?? "");
            formData.append('id_user', auth.user?.id ?? "");
            formData.append('id_comment', String(0))
            formData.append('comment', values.comment);
            formData.append('image_user', auth.user?.avatar ?? "");
            formData.append('name_user', auth.user?.name ?? "");
            try {
                const response = await Api.post(url, formData, config)
                console.log(response)
                form.resetFields();
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <div className="replay-box">
            <div className="row">
                <div className="col-sm-12">
                    <h2>Leave a replay</h2>
                    <div className="text-area">
                        <div className="blank-arrow">
                            <label>Comment</label>
                        </div>
                    </div>
                    <div>
                        <Form
                            form={form}
                            name="comment"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="comment"
                                rules={[{ required: true, message: 'Please input Comment' }]}>
                                <Input.TextArea showCount maxLength={100} rows={6} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="btn-comment">
                                    Enter
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}