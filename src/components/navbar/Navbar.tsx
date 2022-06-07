import React, { FC } from "react";
import "./navbar.scss";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, setIsAuth } from "../../store/reducers/auth/action-creators";
import { useAppSelector } from "../../hooks";
import GitHubButton from "react-github-btn";

const Navbar: FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
    dispatch(setIsAuth(false));
    navigate("/login");
  };

  return (
    <div className={"navbar"}>
      <div className="navbarInner">
        <div className={"left"}>
          <AttachMoneyIcon className={"icon"} />
          <Link to={"/"} className={"link"}>
            <h1 className={"title"}>Coin Manager</h1>
          </Link>
        </div>
        <div className={"right"}>
          {isAuth ? (
            <button onClick={handleClick} className={"signupButton"}>
              Log out
            </button>
          ) : (
            <>
              <Link to={"/login"}>
                <button className={"loginButton"}>Log in</button>
              </Link>
              <Link to={"/register"}>
                <button className={"signupButton"}>Create account</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
