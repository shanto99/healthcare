import alertTypes from "./alert.types";

const INITIAL_STATE: any = {
  snackBar: [],
  sweetAlert: {},
};

const alertReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case alertTypes.ALERT_SNACK_BAR_PUSH:
      return {
        ...state,
        snackBar: [...state.snackBar, action.payload],
      };
    case alertTypes.ALERT_SNACK_BAR_POP:
      return {
        ...state,
        snackBar: state.snackBar.filter(
          (alert: any) => alert.id !== action.payload
        ),
      };
    case alertTypes.SWEET_ALERT_PUSH:
      return {
        ...state,
        sweetAlert: action.payload,
      };
    case alertTypes.SWEET_ALERT_POP:
      return {
        ...state,
        sweetAlert: "",
      };
    default:
      return state;
  }
};

export default alertReducer;