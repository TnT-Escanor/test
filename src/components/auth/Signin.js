import React, { Component } from 'react';
import { Form, Input, Button, Layout, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect, Link } from 'react-router-dom';
import '../../App.css';
import NavBar from "../navbar/NavBar";

import AuthService from "../../services/auth.service";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 18, offset: 3 },

};


class Signin extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: "",
            loggedIn: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                loggedIn: true,
            });
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });


        AuthService.login(this.state.username, this.state.password).then(
            () => {
                this.setState({
                    loggedIn: true
                });
                notification.open({
                    type: 'success',
                    message: 'Success',
                    description: 'You are logged in!',
                    duration: 5

                });
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    loading: false,
                    message: resMessage
                });
                notification.open({
                    type: 'error',
                    message: 'Incorrect username or password.',
                    description: 'Please try again',
                    duration: 5

                });
            }
        );

        console.log(this.state.loggedIn)

    }
    render() {
        if (this.state.loggedIn) {
            return <Redirect to="/home" />
        }
        return (
            <>
                {/* <Layout className="layout"> */}
                <NavBar />
                <Layout className="layout" style={{ background: "#fff", marginLeft: 50, marginRight: 50 }}>
                    {/* <Content className='main'> */}
                    <div className="site-layout-content" style={{ width: "30%", marginTop: 100 }}>

                        <Form
                            {...layout}
                            name="basic"
                            onFinish={e => this.handleLogin(e)}
                            ref={c => {
                                this.form = c;
                            }}
                        >
                            <h1 style={{ textAlign: "center" }}>WELCOME TO REVIEWTEST</h1>
                            <br />
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập" onChange={e => this.onChangeUsername(e)} style={{ height: '3em' }} />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Mật khẩu" onChange={e => this.onChangePassword(e)} style={{ height: '3em' }} />
                            </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
                                <Button type="primary" size="large" htmlType="submit" onClick={e => this.handleLogin(e)} className="login-form-button" style={{ width: '10em' }} >
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                                Bạn chưa có tài khoản ? <Link to="/register">Đăng ký ngay!</Link>
                            </Form.Item>

                        </Form>
                    </div>
                    {/* </Content> */}

                </Layout>
            </>
        );
    }
}

export default Signin;
