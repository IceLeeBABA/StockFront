import React, { Component } from 'react';
import CheckGroup from './components/CheckGroup';
import DataTable from './components/DataTable';

class App extends Component{
  render(){
    return (
        <div className="App">
          <CheckGroup/>
          <DataTable/>
        </div>
    );
  }
}

export default App;
