import { FC, useState, useEffect } from "react";
import "./collection.scss";
import Card from "../../components/card/Card"
import { useParams } from "react-router-dom";
import Button from "../../components/common/button/Button"
import CollectionService from "../../services/collection-service"
import {ICollection} from "../../types/collection-type";
import AddCoinModal from "../../components/modals/addCoin/AddCoin";

const Collection: FC = () => {
  const collectionService = new CollectionService()
  const id = useParams().id || '0';

  const [collection, setCollection] = useState<ICollection>()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    collectionService.getById(parseInt(id)).then((collection: ICollection) => {
      setCollection(collection)
    }).catch(err => console.error(err))
  }, [])

   const handleClick = () => {
    setShowModal(true)
  }

  return (
    <div className={"collection"}>
    <AddCoinModal setShowModal={setShowModal} showModal={showModal} />
    <div className="collection-header">
    <div className="collection-info">
      <h1>{collection?.name}</h1>
      <p>{collection?.description}</p>
    </div>
        <div className="button-column">
          <Button handleClick={() => handleClick()} text="Adicionar moeda"/>
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
