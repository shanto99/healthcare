import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loginReducer from "../../auth/redux/login.reducer";
import alertReducer from "../../components/snackbar/redux/alert.reducer";
import ManufacturerReducer from "../../modules/manufacturer/redux/manufacturer.reducer";
import marketReducer from "../../modules/market/redux/market.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "loginState"
  ],
};

const appReducer = combineReducers({
   alertState: alertReducer,
   loginState: loginReducer,
   manufacturerState: ManufacturerReducer,
   marketState: marketReducer
});

const rootReducer = (state: any, action: any) => {
  if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', 'en')
  }
  if (action.type === "LOG_OUT") {
    storage.removeItem("persist:root");
    storage.removeItem("token");
    storage.removeItem("error");
    state = undefined;
  }
  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);