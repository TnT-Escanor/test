import React from "react";
// import AddTag from "./components/addTag";

import Place from "../../components/place/Place";
import NavBar from "../../components/navbar/NavBar";
import "./PlaceList.css";
import { Layout, Carousel, Row, Col, Menu, Dropdown, Button, Tabs } from 'antd';
import { message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import orderBy from "lodash/orderBy";
import axios from "axios";
import SearchBar from '../../components/searchBar/searchBar';
// import AuthService from "../../services/auth.service";

// import UserService from "../../services/user.service";

const { TabPane } = Tabs;

const key = 'updatable';
const { Content, Footer } = Layout;

class PlaceList extends React.Component {
    constructor() {
        super();
        this.state = {
            userInfo: {
                name: "Lynn"
            },
            filterTagList: ["All"],
            isAddTag: false,
            isUpdatePost: false,
            isCreatePost: true,
            currentPage: 'index',
            placeList: [],
            idUpdatePost: -1,
            query: "",
            tabPosition: "palace",
            priceFilter: "Tất cả",
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            currentUser: undefined,
            visible: false,
        };

        this.handleChangeFilterTag = this.handleChangeFilterTag.bind(this);
    }

    componentDidMount() {
        axios.get(`https://enigmatic-everglades-66523.herokuapp.com/palace`)
            .then(res => {
                if (res.data) {
                    let places = res.data.allPalace
                    places.map(place => {
                        return place
                    })
                    // console.log(places)
                    this.setState({
                        placeList: places,
                    });
                }

            })
            .catch(error => console.log(error));
        // const user = AuthService.getCurrentUser();

        window.addEventListener('resize', this.updateScreenSize);
    }

    updateScreenSize = () => {
        this.setState({ screenWidth: window.innerWidth, screenHeight: window.innerHeight })
    }

    handleChangeFilterTag(tag, checked) {
        const { filterTagList } = this.state;
        let nextSelectedTags = [];
        if (checked && tag === "All") {
            nextSelectedTags = ["All"];
        }
        else if (checked && tag !== "All") {
            let temp = filterTagList.filter(t => t !== "All");
            nextSelectedTags = [...temp, tag];
        }
        else {
            nextSelectedTags = filterTagList.filter(t => t !== tag);
        }
        if (nextSelectedTags.length === 0) {
            nextSelectedTags = ["All"];
        }
        this.setState({ filterTagList: nextSelectedTags });
    }

    searchIndex = (id) => {
        let result = -1;
        this.state.placeList.forEach((postList, index) => {
            if (postList.id === id) result = index;
        });
        return result;
    };

    findMaxIndex = () => {
        const { placeList } = this.state;
        let idArray = placeList.map(post => post.id);

        return Math.max(...idArray);
    };

    renderPlaceNotFound = () => {
        return (<Col span={24} key={1}><h2>Không tìm thấy cửa hàng</h2></Col>);
    }



    renderPostList = (filterTagList, data) => {
        let renderPostList = data;

        return (data ? renderPostList.map((post, index) => (
            // <Link to={`/place/${post.id}`}>
            <Col span={8} key={index}>
                <a href={"/place/" + post.id}>
                    <Place
                        key={index}
                        post={post}
                        createPost={(value1, value2) => this.setState({ isUpdatePost: value1, idUpdatePost: value2 })}
                    />
                </a>
            </Col>
            // </Link>
        ))
            : (<Col><h2>Không tìm thấy cửa hàng</h2></Col>)
        );
    };

    onClickChangePage = e => {
        this.setState({
            currentPage: e.key,
        });
    };

    handleSearch = value => {
        this.setState({
            query: value,
        });
    }

    changeTabPosition = e => {
        this.setState({
            tabPosition: e,
            priceFilter: "Tất cả",
            type: "Tất cả"
        });
        console.log(this.state.tabPosition);
    };

    changePriceDropDown = e => {
        // console.log(e.key)
        this.setState({ priceFilter: e.key });
    };

    changeType = e => {
        this.setState({ type: e.key });
    };

    changeEvent = e => {
        this.setState({ type: e.key });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    openMessage = () => {
        message.loading({ content: 'Loading...', key });
        setTimeout(() => {
            message.success({ content: 'Loaded!', key, duration: 2 });
        }, 1000);
    };


    render() {
        console.log(this.state.typeRestaurant)
        var FilteredData, rawData;
        const lowerCaseQuery = this.state.query.toLowerCase();

        // Filter theo tab
        if (this.state.tabPosition === "palace") {
            rawData = this.state.placeList;
        }
        // Filter theo giá
        if (this.state.priceFilter === "Tất cả") {
            FilteredData = rawData;
        }
        else if (this.state.priceFilter === "0 - 100.000đ") {
            FilteredData = rawData.filter(x => x["cost"] < 100000);
        }
        else if (this.state.priceFilter === "100.000đ - 300.000đ") {
            FilteredData = rawData.filter(x => x["cost"] < 300000 & x["cost"] >= 100000);
        }
        else if (this.state.priceFilter === "300.000đ - 500.000đ") {
            FilteredData = rawData.filter(x => x["cost"] < 500000 & x["cost"] >= 300000);
        }
        else if (this.state.priceFilter === "500.000đ - 1.000.000đ") {
            FilteredData = rawData.filter(x => x["cost"] < 1000000 & x["cost"] >= 500000);
        }
        else if (this.state.priceFilter === "1.000.000đ+") {
            FilteredData = rawData.filter(x => x["cost"] >= 1000000);
        }

        let data = orderBy(this.state.query ? FilteredData.filter(x => String(x["name"]).toLowerCase().includes(lowerCaseQuery)) : FilteredData);

        const priceMenu = (
            <Menu key={this.state.priceFilter} onClick={this.changePriceDropDown}>
                <Menu.Item key="Tất cả" value="">Tất cả</Menu.Item>
                <Menu.Item key="0 - 100.000đ" value="">0 - 100.000đ</Menu.Item>
                <Menu.Item key="100.000đ - 300.000đ" value="">100.000đ - 300.000đ</Menu.Item>
                <Menu.Item key="300.000đ - 500.000đ" value="">300.000đ - 500.000đ</Menu.Item>
                <Menu.Item key="500.000đ - 1.000.000đ" value="">500.000đ - 1.000.000đ</Menu.Item>
                <Menu.Item key="1.000.000đ+" value="">1.000.000đ+</Menu.Item>
            </Menu>
        )

        return (
            <Layout className="layout" style={{ background: "#ffd8bf" }}>
                <NavBar
                    currentPage={this.state.currentPage}
                    onClickChangePage={this.onClickChangePage}
                    value={this.state.query}
                    handleSearch={this.handleSearch}
                />
                {
                    <>
                        <Carousel style={{ marginTop: 50 }} autoplay="true">
                            <div>
                                <h1 style={{
                                    textAlign: 'center',
                                    height: `${window.innerHeight * 0.55 - 50}px`,
                                    color: '#fff',
                                    lineHeight: `${window.innerHeight * 0.55 - 50}px`,
                                    background: '#364d79',
                                }}>Welcome to ReviewTest</h1>
                            </div>
                            <div>
                                <img
                                    alt="Landing 1"
                                    src="https://cdn.smassets.net/assets/cms/cc/uploads/holding-hands.jpg"
                                    style={{ verticalAlign: 'middle', width: '100%' }}
                                ></img>
                            </div>
                        </Carousel>

                    </>
                }
                <br />
                <br />
                <br />
                <Content style={{ width: "100%", padding: '0 200px', margin: "auto", minHeight: '90vh' }}>
                    <Tabs defaultActiveKey={this.state.tabPosition} style={{ fontSize: "1.3em", }} size="large" onChange={e => this.changeTabPosition(e)} centered>
                        <TabPane tab="Review palace" key="palace">
                            <div className="search-bar" style={{ width: "80%", margin: "auto", marginBottom: "2em" }}>
                                <SearchBar
                                    value={this.state.query}
                                    handleSearch={this.handleSearch}
                                >
                                </SearchBar>
                            </div>

                            <div style={{ width: "80%", margin: "auto", marginBottom: "2em" }}>
                                <div style={{ margin: "auto", width: "100%" }}>
                                    Giá: <Dropdown overlay={priceMenu} trigger={['click']}>
                                        <Button shape="round" style={{ marginRight: "0.5em" }}>{this.state.priceFilter} <DownOutlined /> </Button>
                                    </Dropdown>
                                </div>
                            </div>
                            <Row>
                                <>
                                    {this.renderPostList(this.state.filterTagList, data)}
                                </>
                            </Row>
                        </TabPane>
                    </Tabs>
                </Content>
                <Footer style={{ textAlign: 'center' }}> Test </Footer>
            </Layout>
        );
    }
}

export default PlaceList;