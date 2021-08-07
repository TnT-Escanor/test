import React, { Component } from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import CommentInstance from "./CommentInstance";

const { TextArea } = Input;

const CommentList = ({ comments, handleDelete, currentUser }) => (
    <List
        dataSource={comments}
        // header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <CommentInstance {...props} handleDelete={handleDelete} currentUser={currentUser} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
      </Button>
        </Form.Item>
    </>
);

class CommentAddBox extends Component {


    render() {
        const { comments, submitting, handleChange, handleSubmit, handleDelete, value, currentUser } = this.props;

        return (
            <>
                {currentUser && <Comment
                    avatar={
                        <Avatar
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv4Hviqmchu_hUMBjF-CWJaFVpNVbS05hI5w&usqp=CAU"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />}
                {comments.length > 0 && <><div style={{ marginLeft: "3em" }}><CommentList comments={comments} handleDelete={handleDelete} currentUser={currentUser} /></div></>}


            </>
        );
    }
}

export default CommentAddBox;