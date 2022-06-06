import React from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import Error from "../error/Error";
import Success from "../success/Success";

export interface IFProps {
  snackBar?: any;
  actionTypes?: any;
}

const SnackBarAlert: React.FC<IFProps> = ({ snackBar, actionTypes }) => {

  return (
    <div>
      {snackBar?.length > 0
        ? snackBar?.map(({ msg, alertType, actionType }: any) => {
          
            if (alertType === "success" && actionTypes.includes(actionType)) {
              return (
                <Success
                  message={
                    msg ? msg : "Something Went Wrong. Please try again."
                  }
                />
              );
            }
            if (alertType === "danger" && actionTypes.includes(actionType)) {
              return (
                <Error
                  message={
                    msg ? msg : "Something Went Wrong. Please try again."
                  }
                />
              );
            }
          })
        : null}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    snackBar: state?.alertState?.snackBar,
  };
};
export default connect(mapStateToProps)(SnackBarAlert);