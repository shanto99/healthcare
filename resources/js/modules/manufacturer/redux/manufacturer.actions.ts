import { snackBarAlert } from "../../../components/snackbar/redux/alert.action";
import { AxiosAuthInstance } from "../../../config/api/auth.axios";
import { store } from "../../../config/redux/store";
import ManufacturerTypes from "./manufacturer.types";

export const manufacturerGetAction = (searchQuery: { take?: any, page?: any, searchTerm?: any }) => async (dispatch: any) => {
  dispatch({
    type: ManufacturerTypes.MANUFACTURER_ACTION_START,
  });
  await AxiosAuthInstance.get((`/manufacturers?page=${searchQuery?.page || ''}&search_term=${searchQuery?.searchTerm || ''}&take=${searchQuery?.take || ''}`)).then(
    (res: any) => {
      dispatch({
        type: ManufacturerTypes.MANUFACTURER_GET_SUCCESS,
        payload: res?.data,
      });
      dispatch({
        type: ManufacturerTypes.MANUFACTURER_ACTION_END,
      });
    },
    (error: any) => {
      dispatch({
        type: ManufacturerTypes.MANUFACTURER_GET_FAILED,
        payload: error,
      });
      dispatch({
        type: ManufacturerTypes.MANUFACTURER_ACTION_END,
      });
    }
  );
};

export const manufacturerCreateAction = (formData: any) => async (
  dispatch: any
) => {
  dispatch({
    type: ManufacturerTypes.MANUFACTURER_ACTION_START,
  });
  await AxiosAuthInstance.post("/manufacturer/create", formData).then(
    (res: any) => {
      dispatch({
        type: ManufacturerTypes.MANUFACTURER_CREATE_SUCCESS,
        payload: res?.data,
      });
      dispatch({
        type: ManufacturerTypes.MANUFACTURER_ACTION_END,
      });
      //! bad solution start
      localStorage.removeItem("error");
      //! bad solution end
      store.dispatch(
        snackBarAlert(
          res?.data?.message,
          "success",
          ManufacturerTypes.MANUFACTURER_CREATE_SUCCESS
        )
      );
    },
    (error: any) => {
      dispatch({
        type: ManufacturerTypes.MANUFACTURER_CREATE_FAILED,
        payload: true,
      });
      dispatch({
        type: ManufacturerTypes.MANUFACTURER_ACTION_END,
      });
      //! bad solution start
      localStorage.setItem("error", error);
      //! bad solution end
      store.dispatch(
        snackBarAlert(
          error?.response?.data?.error,
          "danger",
          ManufacturerTypes.MANUFACTURER_CREATE_FAILED
        )
      );
    }
  );
};

export const manufacturerGetByIdAction = (id: any) => async (dispatch: any) => {
  dispatch({
    type: ManufacturerTypes.MANUFACTURER_ACTION_START,
  });
  await AxiosAuthInstance.get(`/manufacturer/${id}`).then(
    (res: any) => {
      dispatch({
        type: ManufacturerTypes.MANUFACTURER_GET_BY_ID_SUCCESS,
        payload: res?.data,
      });
      dispatch({
        type: ManufacturerTypes.MANUFACTURER_ACTION_END,
      });
    },
    (error: any) => {
      dispatch({
        type: ManufacturerTypes.MANUFACTURER_GET_BY_ID_FAILED,
        payload: error,
      });
      dispatch({
        type: ManufacturerTypes.MANUFACTURER_ACTION_END,
      });
    }
  );
};

export const manufacturerUpdateAction = (id: any, formData: any) => async (
  dispatch: any
) => {
  dispatch({
    type: ManufacturerTypes.MANUFACTURER_ACTION_START,
  });
  await AxiosAuthInstance.post(`/manufacturer/${id}`, formData).then(
    (res: any) => {
      dispatch({
        type: ManufacturerTypes.MANUFACTURER_UPDATE_SUCCESS,
        payload: res?.data,
      });
      dispatch({
        type: ManufacturerTypes.MANUFACTURER_ACTION_END,
      });

      //! bad solution start
      localStorage.removeItem("error");
      //! bad solution end

      store.dispatch(
        snackBarAlert(
          res?.data?.message,
          "success",
          ManufacturerTypes.MANUFACTURER_UPDATE_SUCCESS
        )
      );
    },
    (error: any) => {
      dispatch({
        type: ManufacturerTypes.MANUFACTURER_UPDATE_FAILED,
        payload: true,
      });
      dispatch({
        type: ManufacturerTypes.MANUFACTURER_ACTION_END,
      });

      //! bad solution start
      localStorage.setItem("error", error);
      //! bad solution end

      store.dispatch(
        snackBarAlert(
          error?.response?.data?.error,
          "danger",
          ManufacturerTypes.MANUFACTURER_UPDATE_FAILED
        )
      );
    }
  );
};

export const manufacturerDeleteAction = (id: any) => async (
  dispatch: any
) => {
  dispatch({
    type: ManufacturerTypes.MANUFACTURER_ACTION_START,
  });
  await AxiosAuthInstance.post(`/manufacturer/delete/${id}`).then(
    (res: any) => {
      dispatch({
        type: ManufacturerTypes.MANUFACTURER_DELETE_SUCCESS,
        payload: res?.data,
      });
      dispatch({
        type: ManufacturerTypes.MANUFACTURER_ACTION_END,
      });

      //! bad solution start
      localStorage.removeItem("error");
      //! bad solution end

      store.dispatch(
        snackBarAlert(
          res?.data?.message,
          "success",
          ManufacturerTypes.MANUFACTURER_DELETE_SUCCESS
        )
      );
    },
    (error: any) => {
      dispatch({
        type: ManufacturerTypes.MANUFACTURER_DELETE_FAILED,
        payload: true,
      });
      dispatch({
        type: ManufacturerTypes.MANUFACTURER_ACTION_END,
      });

      //! bad solution start
      localStorage.setItem("error", error);
      //! bad solution end

      store.dispatch(
        snackBarAlert(
          error?.response?.data?.error,
          "danger",
          ManufacturerTypes.MANUFACTURER_DELETE_FAILED
        )
      );
    }
  );
};