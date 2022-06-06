import { v4 as uuidv4 } from "uuid";
import alertTypes from "./alert.types";

export const snackBarAlert = (msg: any, alertType: any, actionType: any) => (
  dispatch: any
) => {
  const id = uuidv4();
  dispatch({
    type: alertTypes.ALERT_SNACK_BAR_PUSH,
    payload: {
      msg,
      alertType,
      id: id,
      actionType,
    },
  });
  setTimeout(
    () => dispatch({ type: alertTypes.ALERT_SNACK_BAR_POP, payload: id }),
    4000
  );
};

export const sweetAlertAction = (payload) => (dispatch: any) => {
  dispatch({
    type: alertTypes.SWEET_ALERT_PUSH,
    payload: payload,
  });
};