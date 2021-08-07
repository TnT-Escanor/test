import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import { Layout, Descriptions } from 'antd';
import NavBar from "../navbar/NavBar";
import { PageHeader } from 'antd';
import { UserOutlined, MailOutlined, CrownOutlined } from '@ant-design/icons';

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            visible: false,
        };

    }

    componentDidMount() {
        if (this.state.currentUser) {
        }

    }

    render() {
        const { currentUser } = this.state;
        return (
            <>
                <NavBar
                    currentPage={this.state.currentPage}
                    onClickChangePage={this.onClickChangePage}
                />
                <Layout className="layout" style={{ background: "#ffd8bf" }}>
                    <div className="ml-auto mr-auto col-md-8" style={{ margin: "auto", marginTop: 100, width: "92.5%" }}>

                        <h1 style={{ textAlign: "center" }}>Trang cá nhân của <strong>{currentUser.username}</strong></h1>

                        <div>
                            <PageHeader
                                style={{
                                    boxShadow: "5px 5px 20px rgba(0,0,0,0.12), 1px 1px 2px rgba(0,0,0,0.24)",
                                    margin: 20,
                                    background: "#fff",
                                    // height: "420px",
                                }}
                            >
                                <Descriptions title="Thông tin người dùng" >
                                    <Descriptions.Item label=""><UserOutlined style={{ marginRight: "1em", fontSize: "1.5em" }} /><span style={{ marginRight: "1em" }}>Tên người dùng:</span><strong>{currentUser.username}</strong></Descriptions.Item>
                                    <Descriptions.Item label=""><MailOutlined style={{ marginRight: "1em", fontSize: "1.5em" }} /><span style={{ marginRight: "1em" }}>Địa chỉ email:</span><strong>{currentUser.email}</strong></Descriptions.Item>
                                    <Descriptions.Item label=""><CrownOutlined style={{ marginRight: "1em", fontSize: "1.5em" }} /><strong>{currentUser.roles}</strong></Descriptions.Item>
                                </Descriptions>
                            </PageHeader>
                        </div>

                    </div>

                </Layout>
            </>
        );
    }
}
