import axios from 'axios';
import { UPDATE_TABLE_DATA, UPDATE_COMMENTS_DATA } from './actionTypes';

const updateTableAction = (value) => ({
    type: UPDATE_TABLE_DATA,
    value
});

const updateCommentsAction = (value) => ({
    type: UPDATE_COMMENTS_DATA,
    value
});

export const getTableData = (exchange, page, number) => {
    return (dispatch) => {
        axios.get('/api/getTableData.json', {
            params: {
                exchange: 'sh_a',
                page: 5,
                number: 8
            },
        },)
            .then((res) => {
                const tableData = res.data;
                const currentPage = page;
                const loading = false;
                const dataSource = {
                    tableData: tableData.data,
                    currentPage : page,
                    loading: loading,
                }
                const action = updateTableAction(dataSource);
                console.log(tableData.data);
                dispatch(action);
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const getCommentsData = (code) => {
    return (dispatch) => {
        axios.get('http://123.207.12.156:5000/comment', {params: {code: code}})
            .then((res) => {
                let commentsData = res.data;
                console.log(commentsData.data);
                const action = updateCommentsAction(commentsData.data);
                dispatch(action);
            })
    }
}

