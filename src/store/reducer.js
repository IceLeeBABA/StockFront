import { UPDATE_TABLE_DATA, UPDATE_COMMENTS_DATA } from './actionTypes';

const defaultState = {
    comments: [],
    dataSource: {
        tableData: [],
        currentPage : 1,
        loading: false,
    }
};

export default (state = defaultState, action) => {
    if (action.type === UPDATE_TABLE_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.dataSource = action.value;
        return newState;
    }

    if (action.type === UPDATE_COMMENTS_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.comments = action.value;
        return newState;
    }

    return state;
}
