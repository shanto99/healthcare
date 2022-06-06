import React from "react";
import { ErrorMessage, FormikProvider } from "formik";

interface IFErrorMessageShow {
  formik?: any;
  name: any;
}
const ErrorMessageShow = ({ formik, name }: IFErrorMessageShow) => {
  
  return (
    <FormikProvider value={formik}>
      <ErrorMessage name={name}>
        {
          (msg) => 
          <div className="is-invalid">{msg}</div>
        }
      </ErrorMessage>
    </FormikProvider>
  );
};

export default ErrorMessageShow;