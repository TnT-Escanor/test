import React, { createElement, Component } from 'react';
import { Comment, Tooltip, Avatar, Popconfirm } from 'antd';
import "./Comment.css";
import { DeleteOutlined } from '@ant-design/icons';



class CommentInstance extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        const {
            content,
            avatar,
            author,
            cmtid,
            userid,
            currentUser,
            handleDelete,
        } = this.props;

        var actions = [];
        if (currentUser)
            if (currentUser.roles == "ROLE_ADMIN" | currentUser.id === userid) {
                actions = [
                    <Popconfirm title="Bạn muốn xóa bình luận này?" onConfirm={() => handleDelete(cmtid)}>
                        <Tooltip key="comment-basic-like" title="Delete">
                            <span >
                                {createElement(DeleteOutlined)}
                                <span className="comment-action">Xóa</span>
                            </span>
                        </Tooltip>
                    </Popconfirm>

                ];
            }

            else {
                actions = [
                ];
            }



        return (
            <>
                <Comment
                    actions={actions}
                    author={<a href="/#">{author}</a>}
                    avatar={
                        <Avatar
                            src={avatar}
                            alt={author}
                        />
                    }
                    content={
                        <p>
                            {content}
                        </p>
                    }
                // datetime={
                //     <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                //     <span>{moment().fromNow()}</span>
                //     </Tooltip>
                // }
                />
            </>
        );
    }
}

export default CommentInstance;