import { useParams } from "react-router-dom";
import {createRef, useEffect} from "react";
import { Navbar } from "../Components/Navbar";
import { Table } from "../Components/TimeSheetPageComponents/Table";
import {
    fetchVerifyAccessToken,
    setIsLogin,
} from "../store/actions/authActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchGetTimeSheet } from "../store/actions/timeSheetPageActions";
import {Loader} from "../UI/Loader";

const TimesheetPageLayout = ({
    info,
    fetchGetTimeSheet,
    fetchVerifyAccessToken,
}) => {
    let { id } = useParams();
    useEffect(() => {
        if (
            localStorage.getItem("accessToken") &&
            localStorage.getItem("refreshToken")
        ) {
            fetchVerifyAccessToken(localStorage.getItem("accessToken"));
        } else {
            setIsLogin(false);
            localStorage.clear();
        }
    }, []);
    useEffect(() => fetchGetTimeSheet(id), []);
    return (
        <div>
            <Navbar />
            <div className="container">
                {info.isWorkItemsListLoading ?
                    <div className="d-flex justify-content-center mt-3"><Loader /></div>
                    :
                    <Table workItemsList={info.workItemsList}/>
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const isLogin = state.authReducer.isLogin;
    const info = state.timeSheetReducer;
    return { info, isLogin };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            fetchGetTimeSheet,
            fetchVerifyAccessToken,
        },
        dispatch
    );

export const TimesheetPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimesheetPageLayout);
