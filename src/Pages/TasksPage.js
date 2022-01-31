import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import {
    fetchVerifyAccessToken,
    setIsLogin,
} from "../store/actions/authActions";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { Loader } from "../UI/Loader";
import {
    fetchGetTasksAutocomplete,
    fetchGetTasksList,
    setAutoCompleteTasksList,
    setTasksList,
} from "../store/actions/tasksPageActions";
import { Table } from "../Components/TasksPageComponents/Table";
import { Autocomplete, TextField } from "@mui/material";

const TasksPageLayout = ({
    info,
    isLogin,
    fetchVerifyAccessToken,
    fetchGetTasksList,
    setAutoCompleteTasksList,
    fetchGetTasksAutocomplete,
    setTasksList,
}) => {
    const [, setInputValue] = useState("");
    const optionsList = [];
    info.autoCompleteList.map((project) => {
        if (optionsList.indexOf(project.label) === -1)
            optionsList.push(project.label);
    });
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
    useEffect(() => fetchGetTasksList(), []);
    const inputHandler = (event, values) => {
        setInputValue(values);
        if (values.trim().length > 2) {
            fetchGetTasksAutocomplete(values);
        }
    };
    const selectHandler = () => {
        setInputValue("");
        setAutoCompleteTasksList([]);
        setTasksList(info.autoCompleteList);
    };
    if (!isLogin) return <Navigate to="/auth" />;
    return (
        <div>
            <Navbar />
            {info.isTaskListLoading ? (
                <div className="d-flex mt-5 justify-content-center">
                    <Loader />
                </div>
            ) : (
                <div className="container d-flex flex-column align-items-center mt-3">
                    <div className="d-flex justify-content-evenly align-items-center w-100">
                        <Autocomplete
                            options={optionsList}
                            sx={{ width: 300 }}
                            onInputChange={inputHandler}
                            onChange={selectHandler}
                            noOptionsText="Нет результатов поиска"
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Фильтр по названию проекта"
                                />
                            )}
                        />
                        <div
                            className="btn btn-primary"
                            onClick={() => fetchGetTasksList()}
                        >
                            Сбросить фильтр
                        </div>
                    </div>
                    <Table tasksList={info.tasksList} />
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    const isLogin = state.authReducer.isLogin;
    const info = state.tasksPageReducer;
    return { info, isLogin };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            setIsLogin,
            fetchVerifyAccessToken,
            fetchGetTasksList,
            fetchGetTasksAutocomplete,
            setTasksList,
            setAutoCompleteTasksList,
        },
        dispatch
    );

export const TasksPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(TasksPageLayout);
