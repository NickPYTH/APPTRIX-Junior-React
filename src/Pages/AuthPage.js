import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    fetchCreateTokensPair,
    setIsLogin,
    setLoginError,
    fetchVerifyAccessToken,
} from "../store/actions/authActions";
import { Loader } from "../UI/Loader";
import { Alert } from "../UI/Alert";
import { Navigate } from "react-router-dom";
import { TextInput } from "../UI/textInput";
import { PasswordInput } from "../UI/passwordInput";

export const AuthPageLayout = ({
    info,
    fetchCreateTokensPair,
    setLoginError,
    setIsLogin,
    fetchVerifyAccessToken,
}) => {
    useEffect(() => {
        if (
            localStorage.getItem("accessToken") &&
            localStorage.getItem("refreshToken")
        ) {
            fetchVerifyAccessToken(localStorage.getItem("accessToken"));
        }
    }, []); // По идее вот тут нужно проверять жив ли токен доступа, но как его проверить если мне он не нужен ни для какого ресурса, поэтому просто проверяю наличие токена в сторедже
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const preLoginFieldValidation = () => {
        let currentErrors = [];
        setErrors([]);
        setLoginError(false);
        let isError = false;
        if (username.trim() === "") {
            isError = true;
            currentErrors.push("Поле логин не может быть пустым");
        }
        if (password.trim() === "") {
            isError = true;
            currentErrors.push("Поле пароль не может быть пустым");
        }
        if (isError) {
            setErrors(currentErrors);
        } else {
            fetchCreateTokensPair(username, password);
        }
    };
    if (info.isLogin) return <Navigate to="/" />;
    if (info.isLoginRequestLoading) {
        return (
            <div style={{ height: window.innerHeight }}>
                <div className="d-flex justify-content-center align-items-center h-100">
                    <Loader />
                </div>
            </div>
        );
    } else {
        return (
            <div style={{ height: window.innerHeight }}>
                <div className="d-flex justify-content-center align-items-center h-75">
                    <div className="card w-50">
                        <div className="card-header text-center">
                            Авторизация
                        </div>
                        <div className="card-body">
                            <TextInput label="Логин" changeFun={setUsername} />
                            <PasswordInput
                                label="Пароль"
                                changeFun={setPassword}
                            />
                            <div className="d-flex flex-column justify-content-center align-items-center text-center">
                                {info.loginError && (
                                    <Alert text="Неверные данные" />
                                )}
                                {errors.length !== 0 && (
                                    <Alert manyText={errors} />
                                )}
                                <div
                                    onClick={() => preLoginFieldValidation()}
                                    className="btn btn-primary"
                                >
                                    Войти
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    const info = state.authReducer;
    return { info };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            fetchCreateTokensPair,
            setLoginError,
            setIsLogin,
            fetchVerifyAccessToken,
        },
        dispatch
    );

export const AuthPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthPageLayout);
