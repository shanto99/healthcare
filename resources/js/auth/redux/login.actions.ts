import { snackBarAlert } from "../../components/snackbar/redux/alert.action";
import AxiosWithOutAuthInstance from "../../config/api/withoutauth.axios";
import { store } from "../../config/redux/store";
import LoginTypes from "./login.types";

export const loginAction = (formData: any) => async (dispatch: any) => {
  dispatch({
    type: LoginTypes.ACTION_START,
  });

  AxiosWithOutAuthInstance.post(`/login`, formData).subscribe(
    (res: any) => {
       localStorage.setItem("token", res.data.data.user.token);
        dispatch({
          type: LoginTypes.LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: LoginTypes.ACTION_END,
        });
        store.dispatch(
          snackBarAlert(res?.data?.message, "success", LoginTypes.LOGIN_SUCCESS)
        );
      },
      (error: any) => {
        dispatch({
          type: LoginTypes.LOGIN_FAILED,
          payload: error,
        });
        store.dispatch(
          snackBarAlert(
            error?.response?.data?.error,
            "danger",
            LoginTypes.LOGIN_FAILED
          )
        );
        dispatch({
          type: LoginTypes.ACTION_END,
        });
       
      }
  );
};
