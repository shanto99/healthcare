import LogoutTypes from "./logout.types";

export const logoutAction = () => async (dispatch: any) => {
  dispatch({
    type: LogoutTypes.LOG_OUT,
  });
};