import React, { Component } from 'react';

import { Comment, Tooltip, List } from 'antd';
import moment from 'moment';
require('./style.css');

const data = [
    {
        author: '作者1',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                评论1
            </p>
        ),
        datetime: (
            <Tooltip
                title={moment()
                    .subtract(1, 'days')
                    .format('YYYY-MM-DD HH:mm:ss')}
            >
        <span>
          {moment()
              .subtract(1, 'days')
              .fromNow()}
        </span>
            </Tooltip>
        ),
    },
    {
        author: '作者2',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                评论2
            </p>
        ),
        datetime: (
            <Tooltip
                title={moment()
                    .subtract(2, 'days')
                    .format('YYYY-MM-DD HH:mm:ss')}
            >
        <span>
          {moment()
              .subtract(2, 'days')
              .fromNow()}
        </span>
            </Tooltip>
        ),
    },
];

class Comments extends Component {
    render() {
        return (
            <div id='body'>
                <List
                    className="comment-list"
                    header={`${data.length} 条评论`}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <li>
                            <Comment
                                author={item.author}
                                avatar={item.avatar}
                                content={item.content}
                                datetime={item.datetime}
                            />
                        </li>
                    )}
                />
            </div>

        )
    }
}

export default Comments;
