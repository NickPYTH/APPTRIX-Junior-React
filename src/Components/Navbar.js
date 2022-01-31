import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { setIsLogin } from "../store/actions/authActions";
import { connect } from "react-redux";

const NavbarLayout = ({ setIsLogin }) => {
    return (
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <Link className="nav-link active" to="/">
                    Пользователи
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/tasks">
                    Задачи
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    onClick={() => {
                        localStorage.clear();
                        setIsLogin(false);
                    }}
                    className="nav-link active"
                    to="/auth"
                >
                    Выйти
                </Link>
            </li>
        </ul>
    );
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            setIsLogin,
        },
        dispatch
    );

export const Navbar = connect(mapDispatchToProps)(NavbarLayout);
