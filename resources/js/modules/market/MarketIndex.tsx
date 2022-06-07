import React from "react";
import Sidebar from "../../components/layouts/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentLoading from "../../components/loader/ContentLoader";
import { Link , useHistory} from "react-router-dom";
import CustomDataTable from "../../components/datatable/CustomDataTable";
import SnackBarAlert from "../../components/snackbar/SnackBarAlert";
import Swal from "sweetalert2";
import { marketDeleteAction, marketGetAction } from "./redux/market.actions";
import MarketTypes from "./redux/market.types";


const MarketIndex = () => {
    
    const marketStateData = useSelector((state: any) => state.marketState);

    const dispatch: any = useDispatch();
    const history = useHistory();

    const [query, setQuery] = useState({
        searchTerm: "",
        take: "10",
        page: "1",
    });

    useEffect(() => {
        dispatch(marketGetAction(query));
    }, [])

    let tableIndex = marketStateData?.data?.data?.markets?.from;
    
    const deleteMarket = marketId => {
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
            await dispatch(marketDeleteAction(marketId));
            const error = localStorage.getItem("error");
            if (!error) {
                    dispatch(marketGetAction(query));
                    history.push('/market');
                    Swal.fire(
                        'Deleted!',
                        'Market has been deleted.',
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
                            <h2 className="float-left">Market</h2>
                            <Link
                                to={`/market/create`}
                                className="btn btn-default float-right"
                                >
                              Create New
                            </Link>
                      </div>
                    </div>
                    <SnackBarAlert actionTypes={[
                        MarketTypes.MARKET_CREATE_SUCCESS,
                        MarketTypes.MARKET_UPDATE_SUCCESS,
                       // MarketTypes.MARKET_DELETE_SUCCESS,
                       MarketTypes.MARKET_DELETE_FAILED
                    ]}/>
                    {marketStateData?.loading ? (
                        <ContentLoading />
                            ) : (
                    <CustomDataTable
                      title={"Market List"}
                      columns={[
                        `SL No`,
                        "Name",
                        "Action", 
                      ]}
                      pagination={marketStateData?.data?.data?.manufacturers}
                      apiQuery={(e) => setQuery(e)}
                      data={
                        marketStateData?.data?.data?.markets?.data?.length
                          ? marketStateData?.data?.data?.markets?.data?.map(
                              (market: any, index) => {
                                const arr = [
                                  tableIndex,
                                  market?.Name,
                                    [
                                        <div className="action-button">
                                            <Link
                                                to={`/market/edit/${market?.MarketID}`}
                                                className="btn btn-warning py-0"
                                            >
                                                Edit
                                            </Link>
                                            
                                            <button className="btn btn-warning py-0" onClick={() => {deleteMarket(market?.MarketID)}} >
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
                        downloadUrl: `/market?search_term=${query?.searchTerm}&take=all`,
                        authorization: true,
                        key: [
                                `SL No`,
                                "Name",
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
export default MarketIndex;