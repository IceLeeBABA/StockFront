import React, { Component } from 'react';

import { Comment, List } from 'antd';
import store from "../../store";
require('./style.css');

class Comments extends Component {
    constructor(props){
        super(props);
        this.state = store.getState();
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.showhtml = this.showhtml.bind(this);
        this.state = {
            comments: []
        };
        store.subscribe(this.handleStoreChange);
    }
    render() {
        return (
            <div id='comment-style'>
                <List
                    className="comment-list"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    header={`${this.state.comments.length} 条评论`}
                    itemLayout="horizontal"
                    dataSource={this.state.comments}
                    renderItem={item => (
                        <li>
                            <Comment
                                author={item.username}
                                avatar={item.user_avatar}
                                content={this.showhtml(item.content)}
                                datetime={item.date}
                            />
                        </li>
                    )}
                />
            </div>

        )
    }

    handleStoreChange(){
        this.setState(store.getState());
        console.log('update comments');
        console.log(this.state.comments);
    }

    showhtml(content) {
        let html = {__html: content}
        return <div dangerouslySetInnerHTML={html}></div>
    }
}

export default Comments;
