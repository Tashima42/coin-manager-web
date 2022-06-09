import { FC, useState } from "react";
import "./sidebar.scss";
import InfoIcon from "@mui/icons-material/Info";
import { Link, useNavigate } from "react-router-dom";
import ModalWindow from "../modalWindow/ModalWindow";

const Sidebar: FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleClick = (path: string) => {
    if (true) {
      return navigate(`/${path}`);
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className={"sidebar"}>
      <ModalWindow setShowModal={setShowModal} showModal={showModal} />
      <div className={"menu bottom"}>
        <h4>Navigation</h4>
        <ul>
          <Link to={"collections"} className={"link"}>
            <li>
              <InfoIcon className={"sidebarIcon"} />
              <span>Coleções</span>
            </li>
          </Link>
          <Link to={"listings"} className={"link"}>
            <li>
              <InfoIcon className={"sidebarIcon"} />
              <span>Anúncios</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
