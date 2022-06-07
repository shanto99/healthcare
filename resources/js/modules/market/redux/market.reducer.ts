import MarketTypes from "./market.types";

const INITIAL_STATE = {
  data: "",
  error: "",
  loading: false,
};

const marketReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case MarketTypes.MARKET_ACTION_START:
      return {
        ...state,
        loading: true,
      };
    case MarketTypes.MARKET_GET_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case MarketTypes.MARKET_GET_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case MarketTypes.MARKET_CREATE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case MarketTypes.MARKET_CREATE_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case MarketTypes.MARKET_UPDATE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case MarketTypes.MARKET_UPDATE_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case MarketTypes.MARKET_GET_BY_ID_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case MarketTypes.MARKET_GET_BY_ID_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    case MarketTypes.MARKET_DELETE_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case MarketTypes.MARKET_DELETE_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case MarketTypes.MARKET_ACTION_END:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default marketReducer;
