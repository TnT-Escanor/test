import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button, Form, Input, Layout, notification } from 'antd';
import { Redirect } from "react-router-dom";
import NavBar from "../navbar/NavBar";
// import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";

const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
};

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            repassword: "",
            successful: false,
            message: "",
            clickedCancel: false,
            currentUser: undefined,
            loggedIn: false,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                loggedIn: user,
            });
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeRePassword(e) {
        this.setState({
            repassword: e.target.value
        });
    }

    onCancel = () => {
        this.setState({
            clickedCancel: true
        })
    };

    handleRegister = e => {

        this.setState({
            message: "",
            successful: false
        });


        if (this.state.password !== this.state.repassword) {
            notification.open({
                type: 'error',
                message: 'Error',
                description: 'Confirm password incorrect',
                duration: 2
            });
        }
        else {
            if (this.state.password === this.state.repassword) {

                AuthService.register(
                    this.state.username,
                    this.state.email,
                    this.state.password
                ).then(
                    response => {
                        this.setState({
                            message: response.data.message,
                            successful: true
                        });
                        notification.open({
                            type: 'success',
                            message: 'Success',
                            description: 'Created new account successfully',
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
                            successful: false,
                            message: resMessage
                        });
                        notification.open({
                            type: 'error',
                            message: 'Error',
                            description: this.state.message,
                            duration: 2
                        });
                    }
                );
                console.log(this.state.message)
            }
        }


    }

    render() {
        if (this.state.loggedIn) {
            return <Redirect to="/home" />
        }
        const validateMessages = {
            required: 'H??y ??i???n ${label}!',
            types: {
                email: '${label} is not a valid email!',
                number: '${label} is not a valid number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };
        return (
            <>
                <NavBar />
                <Layout className="layout" style={{ background: "#fff", marginLeft: 50, marginRight: 50 }}>
                    <div className="site-layout-content" style={{ width: "40%", marginTop: 100 }}>

                        <Form
                            {...layout}
                            name="nest-messages"
                            onFinish={e => this.handleRegister(e)}
                            ref={c => {
                                this.form = c;
                            }}
                            validateMessages={validateMessages}
                        >

                            <h1 style={{ textAlign: "center" }}>JOIN WITH US</h1>
                            <br />

                            <Form.Item
                                label="T??n ????ng nh???p"
                                name="Name"
                                rules={[{ min: 8, message: 'T??n ????ng nh???p ph???i bao g???m ??t nh???t 8 k?? t???!' }, { required: true, message: 'H??y ??i???n t??n ????ng nh???p c???a b???n!' }]}

                            >
                                <Input onChange={e => this.onChangeUsername(e)} />
                            </Form.Item>

                            <Form.Item
                                label="?????a ch??? email"

                                name="Email"
                                rules={[{
                                    type: 'email',
                                    message: 'Email kh??ng h???p l???!',
                                }, { required: true, message: 'H??y ??i???n ?????a ch??? email c???a b???n!' }]}
                            >
                                <Input onChange={e => this.onChangeEmail(e)} />
                            </Form.Item>
                            <Form.Item
                                label="M???t kh???u"
                                name="password"
                                rules={[{ min: 8, message: 'M???t kh???u ph???i bao g???m ??t nh???t 8 k?? t???!' }, { required: true, message: 'H??y ??i???n m???t kh???u!' }]}

                            >
                                <Input.Password
                                    //   value={pass}
                                    onChange={e => this.onChangePassword(e)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="X??c nh???n m???t kh???u"
                                name="Confirm password"
                                rules={[{ required: true, message: 'H??y ??i???n l???i m???t kh???u!' }]}
                            >
                                <Input.Password
                                    //   value={repass}
                                    onChange={e => this.onChangeRePassword(e)}
                                />
                            </Form.Item>

                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
                                <Button type="primary" htmlType="submit" style={{ width: '8em' }}>
                                    ????ng k??
                                </Button >
                                <Button onClick={this.onCancel} style={{ width: '8em' }}>
                                    H???y
                                </Button >

                            </Form.Item>
                        </Form>
                    </div>
                    {
                        this.state.successful || this.state.clickedCancel ? <Redirect to={{ pathname: '/login' }} /> : null
                    }
                </Layout>
            </>
        )
    }
}
