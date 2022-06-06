import UserTypes from "./user.types";

const INITIAL_STATE = {
  loading: false,
  data: "",
  error: "",
};

const userReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case UserTypes.USER_ACTION_START:
      return {
        ...state,
        loading: true,
      };
    case UserTypes.USER_ACTION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        token: action.token,
        error: "",
      };
    case UserTypes.USER_ACTION_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case UserTypes.USER_ACTION_END:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;