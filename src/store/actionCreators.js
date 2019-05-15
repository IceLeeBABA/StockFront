import axios from 'axios';
import { UPDATE_TABLE_DATA } from './actionTypes';

export const updateTableAction = (value) => ({
    type: UPDATE_TABLE_DATA,
    value
});

export const getTableData = (data) => {
    return (dispatch) => {
        axios.get('/getData')
            .then((res) => {
                const tableData = res.data;
                const action = updateTableAction(tableData);
                dispatch(action);
            })
    }
}
