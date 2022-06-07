import React from "react";
import Sidebar from "../../components/layouts/Sidebar";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useHistory} from "react-router-dom";
import { Field, Form, FormikProvider, useFormik } from "formik";
import ErrorMessageShow from "../../components/error/ErrorMessage";
import SnackBarAlert from "../../components/snackbar/SnackBarAlert";
import { marketCreateAction } from "./redux/market.actions";
import MarketTypes from "./redux/market.types";

const MarketCreate = () => {

    const dispatch: any = useDispatch();
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        Name: Yup.string().required('This field is required')
    });
    
    const initialValues = {
        Name: ""
    };
    
    const onSubmit = async (values: any) => {
        await dispatch(marketCreateAction(values));

        const error = localStorage.getItem("error");
        if (!error) {
            history.push('/market');
        }
    };

    const formik = useFormik({ initialValues, onSubmit, validationSchema });
    
    return (
        <FormikProvider value={formik}>
        <div className="row grow">
            <Sidebar />
            <div className="main col-10 h-100 py-3">
                <div className="container">
                    <div className="row">
                       <div className="col-md-6 card-center">
                       <div className="bottom-header">
                            <div className="form-inline">
                                <h2 className="float-left">Create New Market</h2>
                            </div>
                        </div>

                        <SnackBarAlert actionTypes={[
                            MarketTypes.MARKET_CREATE_FAILED
                        ]}/>

                        <Form>
                            <div className="form-group py-3">
                                <label>Name</label>
                                <Field type="text" name="Name" className="form-control" placeholder="Enter Name"/>
                                <ErrorMessageShow formik={formik} name="Name" />
                            </div>
                            <button type="submit" className="btn btn-success btn-block mt-2">Submit</button>
                        </Form>
                       </div>
                    </div>
                </div>
            </div>
        </div>
        </FormikProvider>
    );
}
export default MarketCreate;