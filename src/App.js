import React, { Component } from 'react';
import { Layout, Button } from 'antd';
import NavBar from "./components/navbar/NavBar";
import './App.css';

const { Content } = Layout;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {

    return (
      <div className="App">
        <Layout className="layout">
          <NavBar/>
          <Content className='main'>
            <div className="site-layout-content">
              <br />
              <br />
            </div>
          </Content>
        </Layout>
      </div>
    )
  }
}
export default App;
