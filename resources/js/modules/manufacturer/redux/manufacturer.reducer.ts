import ManufacturerTypes from "./manufacturer.types";

const INITIAL_STATE = {
  data: "",
  error: "",
  loading: false,
};

const ManufacturerReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ManufacturerTypes.MANUFACTURER_ACTION_START:
      return {
        ...state,
        loading: true,
      };
    case ManufacturerTypes.MANUFACTURER_GET_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case ManufacturerTypes.MANUFACTURER_GET_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case ManufacturerTypes.MANUFACTURER_CREATE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case ManufacturerTypes.MANUFACTURER_CREATE_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case ManufacturerTypes.MANUFACTURER_UPDATE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case ManufacturerTypes.MANUFACTURER_UPDATE_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case ManufacturerTypes.MANUFACTURER_GET_BY_ID_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case ManufacturerTypes.MANUFACTURER_GET_BY_ID_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    case ManufacturerTypes.MANUFACTURER_DELETE_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case ManufacturerTypes.MANUFACTURER_DELETE_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case ManufacturerTypes.MANUFACTURER_ACTION_END:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default ManufacturerReducer;
