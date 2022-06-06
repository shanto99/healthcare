import LoginTypes from "./login.types";

const INITIAL_STATE = {
  loading: false,
  data: "",
  error: "",
};

const loginReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LoginTypes.ACTION_START:
      return {
        ...state,
        loading: true,
      };
    case LoginTypes.LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        token: action.token,
        error: "",
      };
    case LoginTypes.LOGIN_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case LoginTypes.ACTION_END:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
export default loginReducer;