import React, { Component } from 'react';
import { PageHeader, Row, Rate } from 'antd';
import "./Place.css";

const Content = ({ children, extraContent }) => {
    return (
        <Row>
            <div style={{ height: "24em", display: "flex", flexDirection: "Column", justifyContent: "space-between" }}>{children}</div>
            <div className="image">{extraContent}</div>
        </Row>
    );
};

class Place extends Component {

    render() {
        const {
            post,
        } = this.props;

        return (
            <PageHeader
                style={{
                    boxShadow: "5px 5px 20px rgba(0,0,0,0.12), 1px 1px 2px rgba(0,0,0,0.24)",
                    margin: 20,
                    background: "#fff",
                    height: "420px",
                }}
                title={post.name}
                className="site-page-header post-container"
            >
                <Content>
                    <div>
                        <img
                            src={post.image}
                            alt="content"
                            width="100%"
                            height="240px"
                        />
                    </div>
                    <div>
                        <span style={{ fontSize: "1.18em" }}>{this.props.post.address}</span>
                    </div>
                    <div>
                        <Rate allowHalf disabled defaultValue={0} value={this.props.post.vote} />
                    </div>

                    {/* </div>     */}
                </Content>
            </PageHeader>
        );
    }
}

export default Place;

