import { useEffect } from "react";
import { bindActionCreators } from "redux";
import {
    fetchVerifyAccessToken,
    setIsLogin,
} from "../store/actions/authActions";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import {
    fetchGetUsersList,
    setModalIsVisible,
} from "../store/actions/mainPageActions";
import { Navbar } from "../Components/Navbar";
import { Table } from "../Components/MainPageComponents/Table";
import { Loader } from "../UI/Loader";
import { ModalUserInfo } from "../Components/MainPageComponents/ModalUserInfo";

const MainPageLayout = ({
    info,
    isLogin,
    fetchVerifyAccessToken,
    fetchGetUsersList,
    setModalIsVisible,
}) => {
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
    useEffect(() => fetchGetUsersList(), []);
    const openModalHandler = (userInfo) => {
        setModalIsVisible(true, userInfo);
    };
    if (!isLogin) return <Navigate to="/auth" />;
    return (
        <div>
            <Navbar />
            {info.isModalVisible && (
                <ModalUserInfo
                    setModalIsVisible={setModalIsVisible}
                    userInfo={info.userInfoInModal}
                />
            )}
            {info.isUsersListLoading ? (
                <div className="d-flex justify-content-center mt-5">
                    <Loader />
                </div>
            ) : (
                <div className="container">
                    <Table
                        usersList={info.usersList}
                        openModalHandler={openModalHandler}
                    />
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    const isLogin = state.authReducer.isLogin;
    const info = state.mainPageReducer;
    return { info, isLogin };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            setIsLogin,
            fetchVerifyAccessToken,
            fetchGetUsersList,
            setModalIsVisible,
        },
        dispatch
    );

export const MainPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPageLayout);
