import React from "react";
import Sidebar from "../../components/layouts/Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useHistory, useParams} from "react-router-dom";
import { Field, Form, FormikProvider, useFormik } from "formik";
import ErrorMessageShow from "../../components/error/ErrorMessage";
import SnackBarAlert from "../../components/snackbar/SnackBarAlert";
import ManufacturerTypes from "./redux/manufacturer.types";
import { manufacturerGetByIdAction, manufacturerUpdateAction } from "./redux/manufacturer.actions";

const ManufacturerEdit = () => {

    const dispatch: any = useDispatch();
    const history = useHistory();
    const { id }:any = useParams();

    const manufacturerStateData = useSelector((state: any) => state.manufacturerState);

    useEffect(() => {
        dispatch(manufacturerGetByIdAction(id));
    }, []);
  
    const validationSchema = Yup.object().shape({
        Name: Yup.string().required('This field is required'),
        Address: Yup.string().required("This field is required"),
        Email: Yup.string().required('Enter a valid email address'),
    });
    
    const manufacturer = manufacturerStateData?.data?.data?.manufacturer;

    const initialValues = {
        Name: manufacturer?.Name,
        Address: manufacturer?.Address,
        Phone: manufacturer?.Phone,
        Email: manufacturer?.Email
    };
    
    const onSubmit = async (values: any) => {

        await dispatch(manufacturerUpdateAction(id,values));

        const error = localStorage.getItem("error");
        if (!error) {
            history.push('/manufacturer');
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
                                    <h2 className="float-left">Edit Manufacturer</h2>
                            </div>
                        </div>

                        <SnackBarAlert actionTypes={[
                            ManufacturerTypes.MANUFACTURER_UPDATE_FAILED
                        ]}/>

                        <Form>
                            <div className="form-group py-3">
                                <label>Name</label>
                                <Field type="text" name="Name" className="form-control" placeholder="Enter Name" />
                                <ErrorMessageShow formik={formik} name="Name" />
                            </div>
                            <div className="form-group py-2">
                                <label>Phone</label>
                                <Field type="text" name="Phone" className="form-control" placeholder="Enter Phone" />
                                <ErrorMessageShow formik={formik} name="Phone" />
                            </div>
                            <div className="form-group py-2">
                                <label>Address</label>
                                <Field type="text" name="Address" className="form-control" placeholder="Enter Address" />
                                <ErrorMessageShow formik={formik} name="Address" />
                            </div>
                            <div className="form-group py-2">
                                <label>Email</label>
                                <Field type="Email" name="Email" className="form-control" placeholder="Enter Email" />
                                <ErrorMessageShow formik={formik} name="Email" />
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
export default ManufacturerEdit;