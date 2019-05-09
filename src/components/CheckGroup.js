import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';

class CheckGroup extends Component{
    render() {
        return(
            <div>
                <Button type="primary" icon="search">查找</Button>
            </div>
        )
    }
}

export default CheckGroup;
