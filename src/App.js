import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon, Row, Col} from 'antd';
import {Route, Switch, Link, BrowserRouter} from 'react-router-dom'
import HeaderNav from './common/header';
import Comments from './pages/comments';
import Detail from './pages/detail';
import KPicture from './pages/kPicture';

require ('./App.css');

const { Header, Sider, Content } = Layout;

class App extends Component{
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

  render(){
    return (
        <BrowserRouter>
            <Layout style={{height: '100%', position: 'absolute', width: '100%'}}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div id='logo'/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                        <Menu.Item key="1">
                            <Link to="/">
                                <Icon type="database" />
                                <span>信息对比</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/comments">
                                <Icon type="team" />
                                <span>评论</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/kPicture">
                                <Icon type="line-chart" />
                                <span>k线图</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Row>
                            <Col span={8}>
                                <Icon
                                    id='trigger'
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                />
                            </Col>
                            <Col span={8}>
                                <HeaderNav />
                            </Col>
                        </Row>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >
                        <Route>
                            <Switch>
                                <Route path='/' exact component={Detail}/>
                                <Route path='/comments' exact component={Comments}/>
                                <Route path='/kPicture' exact component={KPicture}/>
                            </Switch>
                        </Route>

                    </Content>
                </Layout>
            </Layout>
        </BrowserRouter>

    );
  }

}

export default App;
