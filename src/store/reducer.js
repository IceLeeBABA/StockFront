const defaultState = {
    dataSource: [],
};

export default (state = defaultState, action) => {
    if (action.type === 'update_table_data'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.dataSource = action.value;
        return newState;
    }
    return state;
}
