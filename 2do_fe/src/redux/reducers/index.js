import * as types from "../constants/task.constants";

const initialState = {
  // all tasks
  tasks: [],
  loading: true,

  singleTask: null,
};

const taskReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ALL_TASKS_REQUEST:
    case types.ADD_TASKS_REQUEST:
      return { ...state, loading: true };

    case types.GET_ALL_TASKS_SUCCESS:
    case types.ADD_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: payload,
      };

    case types.UPDATE_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        singleTask: payload,
      };

    case types.GET_ALL_TASKS_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default taskReducer;