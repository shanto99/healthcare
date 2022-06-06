import React, { useEffect } from "react";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import LoginTypes from "./redux/login.types";
import ErrorMessageShow from "../components/error/ErrorMessage";
import { connect } from "react-redux";
import { loginAction } from "./redux/login.actions";
import ContentLoading from "../components/loader/ContentLoader";
import SnackBarAlert from "../components/snackbar/SnackBarAlert";

const Login = ({
    loginAction,
    loginStateData,
  }: any) => {
   
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        UserId: Yup.string().required('This field is required'),
        Password: Yup.string().required("This field is required"),
    });
    
    const initialValues = {
        UserId: "",
        Password: "",
    };
    
    const onSubmit = async (values: any) => {
        await loginAction(values);
    };

    useEffect(() => {
        if (loginStateData?.data?.isSuccess === true) {
            history.push("/");
        }
    }, [loginStateData?.data?.isSuccess])

    const formik = useFormik({ initialValues, onSubmit, validationSchema });

    return (
        <>
        <FormikProvider value={formik}>
          <div className="container py-5">
              <div className="row">
                  <div className="col-md-6">
                    <SnackBarAlert actionTypes={[
                        LoginTypes.LOGIN_FAILED,
                        LoginTypes.LOGIN_SUCCESS
                    ]}/>
                  {loginStateData?.loading ? (
                        <ContentLoading />
                    ) : (
                        <Form>
                            <h3>Sign In</h3>
                            <div className="form-group">
                                <label>UserId</label>
                                <Field type="text" name="UserId" className="form-control" placeholder="Enter UserId" />
                                <ErrorMessageShow formik={formik} name="UserId" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <Field type="password" name="Password" className="form-control" placeholder="Enter Password" />
                                <ErrorMessageShow formik={formik} name="Password" />
                            </div>

                            <button type="submit" className="btn btn-primary btn-block mt-2">Submit</button>
                           
                            </Form>
                        )}
                  </div>
              </div>
          </div>
          </FormikProvider>
        </>
    );
}

const mapStateToProps = (state: any) => {
  return {
    loginStateData: state?.loginState
  };
};

export default connect(mapStateToProps, { loginAction })(Login);