import axios from 'axios';
import {UPDATE_TABLE_DATA, UPDATE_COMMENTS_DATA, UPDATE_K_DATA, UPDATE_EXCHANGE_DATA} from './actionTypes';

const updateTableAction = (value) => ({
    type: UPDATE_TABLE_DATA,
    value
});

const updateCommentsAction = (value) => ({
    type: UPDATE_COMMENTS_DATA,
    value
});

const updateKDataAction = (value) => ({
    type: UPDATE_K_DATA,
    value
});

export const updateExchangeAction = (value) => ({
    type: UPDATE_EXCHANGE_DATA,
    value
});

export const getTableData = (exchange, page, number) => {
    return (dispatch) => {
        axios.get('http://123.207.12.156:5000/list', {
            params: {
                exchange: exchange,
                page: page,
                number: number
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
                };
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
};

export const getKData = (code, begin, end) => {
    return (dispatch) => {
        axios.get('http://123.207.12.156:5000/history', {params: {code: code, begin: begin, end: end}})
            .then((res) => {
                let historyData = res.data;
                console.log(historyData.data);
                const action = updateKDataAction(historyData.data);
                dispatch(action);
            }).then(() => {
                axios.get('http://123.207.12.156:5000/prediction', {params: {code: code}})
                    .then((res) => {
                        let predictionData = res.data
                    })
            })
    }
};

