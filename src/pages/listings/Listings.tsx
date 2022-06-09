import { FC } from "react";
import "./listings.scss";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card"
import Button from "../../components/common/button/Button"

const Listings: FC = () => {
  return (
    <div className={"listings"}>
    <div className="listings-header">
      <h1>Anúncios</h1>
      <div className="button-row">
        <Link to={"/create-listing"} className={"link"}>
          <Button text="Criar anúncio"/>
        </Link>
      </div>
    </div>
        <Card name="Coin" description="Description"/>
        <Card name="Coin" description="Description"/>
        <Card name="Coin" description="Description"/>
        <Card name="Coin" description="Description"/>
        <Card name="Coin" description="Description"/>
    </div>
  );
};

export default Listings;
