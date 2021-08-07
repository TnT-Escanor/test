import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

// import { Link } from "react-router-dom";


import './NavBar.css';

class NavBar extends Component {
	render() {
		return (
			<div>
				<Menu theme="light" selectedKeys={[]} mode="horizontal" style={{position: "absolute",zIndex: 1, fontSize: "1.2em", width: '100%', padding: 12, height: 90 , marginLeft: "auto", marginRight: "auto" }}>
					<Menu.Item key="index"><a href="/home"><img src="../../logo512.png" style={{ width: "15%"}} /></a></Menu.Item>
					<Menu.Item key="blog" style={{ float: 'right', paddingTop: 10 , paddingBottom: 10 }}><Link to="#">Blog</Link></Menu.Item>
					<Menu.Item key="registrar" style={{ float: 'right', paddingTop: 10 , paddingBottom: 10}}><Link to="#">Nhà đăng ký</Link></Menu.Item>
					<Menu.Item key="home" style={{ float: 'right',  paddingTop: 10 , paddingBottom: 10 }}><a href="/home">Trang chủ</a></Menu.Item>
				</Menu>
			</div>

		);
	}
}
export default NavBar;

