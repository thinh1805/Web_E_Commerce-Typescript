import { AppstoreOutlined, MailOutlined, PlusOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { UserOutlined, LockOutlined, } from '@ant-design/icons';
import { PlusCircleOutlined } from '@ant-design/icons';
type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
    {
        key: 'sub1',
        label: (
            <div className="sub1">
                <span>Product {/* Icon nằm bên phải */}</span>
            </div>
        ),
        icon: <MailOutlined />,
        // children: [
        //     {
        //         key: 'g1',
        //         label:
        //             <div className="sub">
        //                 <Link to="/information"><UserOutlined className="sub-icon" /> Product {/* Icon nằm bên phải */}</Link>
        //             </div>,
        //         // children: [
        //         //     { key: '1', label: 'Option 1' },
        //         //     { key: '2', label: 'Option 2' },
        //         // ],
        //     },
        //     {
        //         key: 'g2',
        //         label:
        //             <div className="sub">
        //                 <Link to="/ChangePassword"> <LockOutlined className="sub-icon" /> Change Password {/* Icon nằm bên phải */}</Link>
        //             </div>,
        //         // children: [
        //         //     { key: '3', label: 'Option 3' },
        //         //     { key: '4', label: 'Option 4' },
        //         // ],
        //     },
        // ],
    },
    {
        key: 'sub2',
        label:
            <div>
                <Link to="">Manager</Link>
            </div>,

        icon: <AppstoreOutlined />,
        children: [
            {
                key: 'g1',
                label:
                    <div className="sub">
                        <Link to="/add"><PlusCircleOutlined className="sub-icon" /> Add Product {/* Icon nằm bên phải */}</Link>
                    </div>,
                // children: [
                //     { key: '1', label: 'Option 1' },
                //     { key: '2', label: 'Option 2' },
                // ],
            },
            // {
            //     key: 'g2',
            //     label:
            //         <div className="sub">
            //             <Link to="/ChangePassword"> <LockOutlined className="sub-icon" /> Change Password {/* Icon nằm bên phải */}</Link>
            //         </div>,
            //     // children: [
            //     //     { key: '3', label: 'Option 3' },
            //     //     { key: '4', label: 'Option 4' },
            //     // ],
            // },
        ],
        // children: [
        //     { key: '5', label: 'Option 5' },
        //     { key: '6', label: 'Option 6' },
        //     {
        //         key: 'sub3',
        //         label: 'Submenu',
        //         children: [
        //             { key: '7', label: 'Option 7' },
        //             { key: '8', label: 'Option 8' },
        //         ],
        //     },
        // ],
    },

];
export const MenuManager: React.FC = () => {
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };
    return (
        <div className="col-sm-3">
            <div className="left-sidebar">
                <div className="center">
                    <h4 className="account">DASH BOARD</h4>
                </div>
                <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
                    <Menu
                        onClick={onClick}
                        style={{ width: 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        items={items}
                    />
                </div>
            </div>
        </div>
    )
}