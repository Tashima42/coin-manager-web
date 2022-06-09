import { FC } from "react";
import "./collection.scss";
import Card from "../../components/card/Card"
import { useParams } from "react-router-dom";
import Button from "../../components/common/button/Button"

const Collection: FC = () => {
  const {id} = useParams();
  return (
    <div className={"collection"}>
    <div className="collection-header">
    <div className="collection-info">
      <h1>Collection {id}</h1>
      <p>Collection Description</p>
    </div>
        <div className="button-column">
          <Button text="Adicionar moeda"/>
          <Button text="Calcular preço"/>
        </div>
    </div>
        <div className="coins-list">
          <Card name="Coin Japan" description="Description"/>
          <Card name="Coin Japan" description="Description"/>
        </div>
    </div>
  );
};

export default Collection;
