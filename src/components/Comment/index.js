import React, { Component } from 'react';

import { Comment, List } from 'antd';
import store from "../../store";
require('./style.css');

class Comments extends Component {
    constructor(props){
        super(props);
        this.handleStoreChange = this.handleStoreChange.bind(this);
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
                    header={`${this.state.comments.length} 条评论`}
                    itemLayout="horizontal"
                    dataSource={this.state.comments}
                    renderItem={item => (
                        <li>
                            <Comment
                                author={item.username}
                                avatar={item.user_avatar}
                                content={item.content}
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
}

export default Comments;
