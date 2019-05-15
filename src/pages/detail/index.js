import React, { Component } from 'react';
import DataTable from '../../components/DataTable';
import DataList from '../../components/DataList';
import { Row, Col } from 'antd';

class Detail extends Component {
    render() {
        return (
            <div style={{marginLeft: '50px'}}>
                <p>新浪财经</p>
                <DataTable/>


                <Row>
                    <Col span={8}><h2>雪球</h2></Col>
                    <Col span={8}><h2>新浪财经</h2></Col>
                    <Col span={8}><h2>雪球</h2></Col>
                </Row>
                <Row>
                    <Col span={8}><DataList/></Col>
                    <Col span={8}><DataList/></Col>
                    <Col span={8}><DataList/></Col>
                </Row>

            </div>
        )
    }
}

export default Detail;
