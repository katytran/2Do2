import * as types from "../constants/task.constants";

const initialState = {
  // all tasks
  tasks: [],
  loading: true,
  singleTask: null,
};

const taskReducer = (state = initialState, action) => {
  const { type, payload, id } = action;
  switch (type) {
    case types.GET_ALL_TASKS_REQUEST:
    case types.ADD_TASKS_REQUEST:
    case types.DELETE_TASKS_REQUEST:
    case types.UPDATE_TASKS_REQUEST:
    case types.GET_SINGLE_TASKS_REQUEST:
      return { ...state, loading: true };

    case types.GET_ALL_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: payload,
      };

    case types.ADD_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, payload].sort((a, b) =>
          a.dueDate > b.dueDate ? 1 : -1
        ),
      };

    case types.DELETE_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter((task) => task._id !== id),
      };

    case types.UPDATE_TASKS_SUCCESS:
    case types.GET_SINGLE_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        singleTask: payload,
      };

    case types.GET_ALL_TASKS_FAILURE:
    case types.UPDATE_TASKS_FAILURE:
    case types.GET_SINGLE_TASKS_FAILURE:
    case types.DELETE_TASKS_FAILURE:
    case types.ADD_TASKS_FAILURE:
      return { ...state, loading: false }; // error: payload

    default:
      return state;
  }
};

export default taskReducer;
