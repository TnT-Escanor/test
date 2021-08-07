import React, { Component } from 'react';
import { Input } from 'antd';
import "./searchBar.css";

const { Search } = Input;

class SearchBar extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        const {
            handleSearch,
        } = this.props;

        return (
            <>
                <Search
                    placeholder="Nhập tên địa điểm"
                    allowClear
                    enterButton="Tìm kiếm"
                    size="large"
                    onSearch={value => handleSearch(value)}
                />
            </>
        );
    }
}

export default SearchBar;
