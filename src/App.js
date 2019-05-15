import React, { Component } from 'react';
import {Button, Layout} from 'antd';
import { BrowserRouter, Route } from 'react-router-dom';
import HeaderNav from './common/header';
import Comments from './pages/comments';
import Detail from './pages/detail';
import KPicture from './pages/kPicture'

const { Header, Footer, Content } = Layout;

class App extends Component{
  render(){
    return (
            <div>
                <Layout>
                    <Header>
                        <HeaderNav/>
                    </Header>
                    <Content style={{marginTop: '80px'}}>
                        <BrowserRouter>
                            <div>
                                <Route path='/' exact component={Detail}/>
                                <Route path='/comments' exact component={Comments}/>
                                <Route path='/kPicture' exact component={KPicture}/>
                            </div>
                        </BrowserRouter>
                    </Content>
                    <Footer>
                        皮卡皮卡~
                    </Footer>
                </Layout>
            </div>

    );
  }

}

export default App;
