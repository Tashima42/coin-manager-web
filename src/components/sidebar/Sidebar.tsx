import { FC, useState } from "react";
import "./sidebar.scss";
import CategoryIcon from "@mui/icons-material/Category";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Link } from "react-router-dom";

const Sidebar: FC = () => {
  return (
    <div className={"sidebar"}>
      <div className={"menu bottom"}>
        <h4>Navegacao</h4>
        <ul>
          <Link to={"collections"} className={"link"}>
            <li>
              <CategoryIcon className={"sidebarIcon"} />
              <span>Coleções</span>
            </li>
          </Link>
          <Link to={"listings"} className={"link"}>
            <li>
              <StorefrontIcon className={"sidebarIcon"} />
              <span>Anúncios</span>
            </li>
          </Link>
          <Link to={"transactions"} className={"link"}>
            <li>
              <ReceiptLongIcon className={"sidebarIcon"} />
              <span>Transacoes</span>
            </li>
          </Link>
          <Link to={"receipts"} className={"link"}>
            <li>
              <ReceiptIcon className={"sidebarIcon"} />
              <span>Recibos</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
