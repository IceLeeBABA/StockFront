import React, { Component } from 'react';
import DataTable from '../../components/DataTable';
import CheckGroup from '../../components/CheckGroup';

class Detail extends Component {
    render() {
        return (
            <div>
                <CheckGroup/>
                <DataTable style={{marginTop: '20px'}}/>
            </div>
        )
    }
}

export default Detail;
