import React, { Component } from 'react';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

class TagList extends Component {

    render() {
        return (
            <div className="text-center">
                <span style={{ marginRight: 8 }}>Tag:</span>
                {this.props.tagList.map(tag => (
                    <CheckableTag
                        key={tag}
                        checked={this.props.filterTagList.indexOf(tag) > -1}
                        onChange={checked => this.props.handleChangeFilterTag(tag, checked)}
                    >
                        {tag}
                    </CheckableTag>
                ))}
            </div>
        );
    }
}

export default TagList;

