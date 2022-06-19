import { FC } from "react";
import "./navbar.scss";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Link, useNavigate } from "react-router-dom";

const Navbar: FC = () => {
  const navigate = useNavigate();
  const token = localStorage?.getItem("token")
  const isLoggedIn = token!.length > 0 ? true : false;

  const handleClick = () => {
    localStorage.setItem("token", "")
    navigate("/login");
  };

  return (
    <div className={"navbar"}>
      <div className="navbarInner">
        <div className={"left"}>
          <AttachMoneyIcon className={"icon"} />
          <Link to={"/"} className={"link"}>
            <h1 className={"title"}>Double Coin</h1>
          </Link>
        </div>
        <div className={"right"}>
          {isLoggedIn ? (
            <button onClick={handleClick} className={"signupButton"}>
              Log out
            </button>
          ) : (
            <>
              <Link to={"/login"}>
                <button className={"loginButton"}>Log in</button>
              </Link>
              <Link to={"/register"}>
                <button className={"signupButton"}>Criar Conta</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
