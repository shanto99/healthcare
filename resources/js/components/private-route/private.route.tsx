import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";

interface IFProps {
  Component?: any;
  path?: any;
  exact?: any;
  loginStateData?: any;
}

const PrivateRoute: React.FC<IFProps> = ({
  Component,
  path,
  exact = true,
  loginStateData
}) => {
  const history = useHistory();
  return (
    <Route
      exact={exact}
      path={path}
      render={(props: any) => {
        if (loginStateData?.isSuccess) {
            return <Component {...props} />;
          }
        else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

const mapStateToProps = (state: any) => {
  return {
    loginStateData: state?.loginState?.data,
  };
};

export default connect(mapStateToProps,null )(
  PrivateRoute
);