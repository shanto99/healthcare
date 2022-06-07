import React from "react";
import Sidebar from "../../components/layouts/Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useHistory, useParams} from "react-router-dom";
import { Field, Form, FormikProvider, useFormik } from "formik";
import ErrorMessageShow from "../../components/error/ErrorMessage";
import SnackBarAlert from "../../components/snackbar/SnackBarAlert";
import { marketGetByIdAction, marketUpdateAction } from "./redux/market.actions";
import MarketTypes from "./redux/market.types";

const MarketEdit = () => {

    const dispatch: any = useDispatch();
    const history = useHistory();
    const { id }:any = useParams();

    const marketStateData = useSelector((state: any) => state.marketState);

    useEffect(() => {
        dispatch(marketGetByIdAction(id));
    }, []);
  
    const validationSchema = Yup.object().shape({
        Name: Yup.string().required('This field is required')
    });
    
    const market = marketStateData?.data?.data?.market;

    const initialValues = {
        Name: market?.Name
    };
    
    const onSubmit = async (values: any) => {

        await dispatch(marketUpdateAction(id,values));

        const error = localStorage.getItem("error");
        if (!error) {
            history.push('/market');
        }
    };

    const enableReinitialize = true;

    const formik = useFormik({ 
        initialValues, 
        onSubmit, 
        validationSchema, 
        enableReinitialize
    });
    
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
                                    <h2 className="float-left">Edit Market</h2>
                            </div>
                        </div>

                        <SnackBarAlert actionTypes={[
                            MarketTypes.MARKET_UPDATE_FAILED
                        ]}/>

                        <Form>
                            <div className="form-group py-3">
                                <label>Name</label>
                                <Field type="text" name="Name" className="form-control" placeholder="Enter Name" />
                                <ErrorMessageShow formik={formik} name="Name" />
                            </div>
                            <button type="submit" className="btn btn-success btn-block mt-2">Update</button>
                        </Form>
                       </div>
                    </div>
                </div>
            </div>
        </div>
        </FormikProvider>
    );
}
export default MarketEdit;