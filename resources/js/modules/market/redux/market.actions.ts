import { snackBarAlert } from "../../../components/snackbar/redux/alert.action";
import { AxiosAuthInstance } from "../../../config/api/auth.axios";
import { store } from "../../../config/redux/store";
import MarketTypes from "./market.types";

export const marketGetAction = (searchQuery: { take?: any, page?: any, searchTerm?: any }) => async (dispatch: any) => {
  dispatch({
    type: MarketTypes.MARKET_ACTION_START,
  });
  await AxiosAuthInstance.get((`/markets?page=${searchQuery?.page || ''}&search_term=${searchQuery?.searchTerm || ''}&take=${searchQuery?.take || ''}`)).then(
    (res: any) => {
      dispatch({
        type: MarketTypes.MARKET_GET_SUCCESS,
        payload: res?.data,
      });
      dispatch({
        type: MarketTypes.MARKET_ACTION_END,
      });
    },
    (error: any) => {
      dispatch({
        type: MarketTypes.MARKET_GET_FAILED,
        payload: error,
      });
      dispatch({
        type: MarketTypes.MARKET_ACTION_END,
      });
    }
  );
};

export const marketCreateAction = (formData: any) => async (
  dispatch: any
) => {
  dispatch({
    type: MarketTypes.MARKET_ACTION_START,
  });
  await AxiosAuthInstance.post("/market/create", formData).then(
    (res: any) => {
      dispatch({
        type: MarketTypes.MARKET_CREATE_SUCCESS,
        payload: res?.data,
      });
      dispatch({
        type: MarketTypes.MARKET_ACTION_END,
      });
      //! bad solution start
      localStorage.removeItem("error");
      //! bad solution end
      store.dispatch(
        snackBarAlert(
          res?.data?.message,
          "success",
          MarketTypes.MARKET_CREATE_SUCCESS
        )
      );
    },
    (error: any) => {
      dispatch({
        type: MarketTypes.MARKET_CREATE_FAILED,
        payload: true,
      });
      dispatch({
        type: MarketTypes.MARKET_ACTION_END,
      });
      //! bad solution start
      localStorage.setItem("error", error);
      //! bad solution end
      store.dispatch(
        snackBarAlert(
          error?.response?.data?.error,
          "danger",
          MarketTypes.MARKET_CREATE_FAILED
        )
      );
    }
  );
};

export const marketGetByIdAction = (id: any) => async (dispatch: any) => {
  dispatch({
    type: MarketTypes.MARKET_ACTION_START,
  });
  await AxiosAuthInstance.get(`/market/${id}`).then(
    (res: any) => {
      dispatch({
        type: MarketTypes.MARKET_GET_BY_ID_SUCCESS,
        payload: res?.data,
      });
      dispatch({
        type: MarketTypes.MARKET_ACTION_END,
      });
    },
    (error: any) => {
      dispatch({
        type: MarketTypes.MARKET_GET_BY_ID_FAILED,
        payload: error,
      });
      dispatch({
        type: MarketTypes.MARKET_ACTION_END,
      });
    }
  );
};

export const marketUpdateAction = (id: any, formData: any) => async (
  dispatch: any
) => {
  dispatch({
    type: MarketTypes.MARKET_ACTION_START,
  });
  await AxiosAuthInstance.post(`/market/${id}`, formData).then(
    (res: any) => {
      dispatch({
        type: MarketTypes.MARKET_UPDATE_SUCCESS,
        payload: res?.data,
      });
      dispatch({
        type: MarketTypes.MARKET_ACTION_END,
      });

      //! bad solution start
      localStorage.removeItem("error");
      //! bad solution end

      store.dispatch(
        snackBarAlert(
          res?.data?.message,
          "success",
          MarketTypes.MARKET_UPDATE_SUCCESS
        )
      );
    },
    (error: any) => {
      dispatch({
        type: MarketTypes.MARKET_UPDATE_FAILED,
        payload: true,
      });
      dispatch({
        type: MarketTypes.MARKET_ACTION_END,
      });

      //! bad solution start
      localStorage.setItem("error", error);
      //! bad solution end

      store.dispatch(
        snackBarAlert(
          error?.response?.data?.error,
          "danger",
          MarketTypes.MARKET_UPDATE_FAILED
        )
      );
    }
  );
};

export const marketDeleteAction = (id: any) => async (
  dispatch: any
) => {
  dispatch({
    type: MarketTypes.MARKET_ACTION_START,
  });
  await AxiosAuthInstance.post(`/market/delete/${id}`).then(
    (res: any) => {
      dispatch({
        type: MarketTypes.MARKET_DELETE_SUCCESS,
        payload: res?.data,
      });
      dispatch({
        type: MarketTypes.MARKET_ACTION_END,
      });

      //! bad solution start
      localStorage.removeItem("error");
      //! bad solution end

      store.dispatch(
        snackBarAlert(
          res?.data?.message,
          "success",
          MarketTypes.MARKET_DELETE_SUCCESS
        )
      );
    },
    (error: any) => {
      dispatch({
        type: MarketTypes.MARKET_DELETE_FAILED,
        payload: true,
      });
      dispatch({
        type: MarketTypes.MARKET_ACTION_END,
      });

      //! bad solution start
      localStorage.setItem("error", error);
      //! bad solution end

      store.dispatch(
        snackBarAlert(
          error?.response?.data?.error,
          "danger",
          MarketTypes.MARKET_DELETE_FAILED
        )
      );
    }
  );
};