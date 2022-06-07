import React from "react";
import Sidebar from "../../components/layouts/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { manufacturerDeleteAction, manufacturerGetAction } from "./redux/manufacturer.actions";
import ContentLoading from "../../components/loader/ContentLoader";
import { Link , useHistory} from "react-router-dom";
import CustomDataTable from "../../components/datatable/CustomDataTable";
import SnackBarAlert from "../../components/snackbar/SnackBarAlert";
import ManufacturerTypes from "./redux/manufacturer.types";
import Swal from "sweetalert2";


const Manufacturer = () => {
    
    const manufacturerStateData = useSelector((state: any) => state.manufacturerState);

    const dispatch: any = useDispatch();
    const history = useHistory();

    const [query, setQuery] = useState({
        searchTerm: "",
        take: "10",
        page: "1",
    });

    useEffect(() => {
        dispatch(manufacturerGetAction(query));
    }, [])

    let tableIndex = manufacturerStateData?.data?.data?.manufacturers?.from;
    
    const deleteManufacturer = manufacturerId => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
            await dispatch(manufacturerDeleteAction(manufacturerId));
            const error = localStorage.getItem("error");
            if (!error) {
                    dispatch(manufacturerGetAction(query));
                    history.push('/manufacturer');
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            }
        })
    }


    return (
        <div className="row grow">
            <Sidebar />
            <div className="main col-10 h-100 py-3">
                <div className="container">
                    <div className="row">
                    
                    <div className="bottom-header">
                      <div className="form-inline">
                            <h2 className="float-left">Manufacturer</h2>
                            <Link
                                to={`/manufacturers/create`}
                                className="btn btn-default float-right"
                                >
                              Create New
                            </Link>
                      </div>
                    </div>
                    <SnackBarAlert actionTypes={[
                        ManufacturerTypes.MANUFACTURER_CREATE_SUCCESS,
                        ManufacturerTypes.MANUFACTURER_UPDATE_SUCCESS,
                       // ManufacturerTypes.MANUFACTURER_DELETE_SUCCESS,
                        ManufacturerTypes.MANUFACTURER_DELETE_FAILED
                    ]}/>
                    {manufacturerStateData?.loading ? (
                        <ContentLoading />
                            ) : (
                    <CustomDataTable
                      title={"Manufacturer List"}
                      columns={[
                        `SL No`,
                        "Name",
                        "Address",
                        "Phone",
                        "Email",
                        "Action", 
                      ]}
                      pagination={manufacturerStateData?.data?.data?.manufacturers}
                      apiQuery={(e) => setQuery(e)}
                      data={
                        manufacturerStateData?.data?.data?.manufacturers?.data?.length
                          ? manufacturerStateData?.data?.data?.manufacturers?.data?.map(
                              (manufacturer: any, index) => {
                                const arr = [
                                  tableIndex,
                                  manufacturer?.Name,
                                  manufacturer?.Address,
                                  manufacturer?.Phone,
                                  manufacturer?.Email,
                                    [
                                        <div className="action-button">
                                            <Link
                                                to={`/manufacturer/edit/${manufacturer?.ManufacturerID}`}
                                                className="btn btn-warning py-0"
                                            >
                                                Edit
                                            </Link>
                                            
                                            <button className="btn btn-warning py-0" onClick={() => {deleteManufacturer(manufacturer?.ManufacturerID)}} >
                                                Delete
                                            </button>
                                        </div>
                                    ]
                                ];
                                tableIndex++;
                                return arr;
                              }
                          ) : []
                      }
                      downloadOption={{
                        downloadUrl: `/manufacturers?search_term=${query?.searchTerm}&take=all`,
                        authorization: true,
                        key: [
                                `SL No`,
                                "Name",
                                "Address",
                                "Phone",
                                "Email",
                                null,
                            ],
                            }}
                        />
                         )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Manufacturer;