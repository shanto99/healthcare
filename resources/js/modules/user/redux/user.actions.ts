import AxiosWithOutAuthInstance from "../../../config/api/withoutauth.axios";
import UserTypes from "./user.types";

export const userGetRequestAction = () => async (dispatch: any) => {
    dispatch({
      type: UserTypes.USER_ACTION_START,
    });
    await AxiosWithOutAuthInstance.get("https://api.github.com/users").subscribe(
      (res: any) => {
        dispatch({
          type: UserTypes.USER_ACTION_SUCCESS,
          payload: res?.data,
        });
        dispatch({
          type: UserTypes.USER_ACTION_END,
        });
      },
      (error: any) => {
        dispatch({
          type: UserTypes.USER_ACTION_FAILED,
          payload: error,
        });
        dispatch({
          type: UserTypes.USER_ACTION_END,
        });
      }
    );
};