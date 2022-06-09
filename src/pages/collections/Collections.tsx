import { FC, useState } from "react";
import { Link } from "react-router-dom";
import "./collections.scss";
import Card from "../../components/card/Card"
import Button from "../../components/common/button/Button"
import CollectionService from "../../services/collection-service"

const Collections: FC = () => {
  const collectionService = new CollectionService()
  const [collections, setCollections] = useState<any[]>([])
    collectionService.userCollections().then(collections => {
      setCollections(collections)
    })
  return (
    <div className={"collections"}>
    <div className="collections-header">
      <h1>Coleções</h1>
      <div className="button-row">
        <Button text="Criar coleção"/>
      </div>
    </div>
      <div className="collection-cards">
      {collections.map((collection, id) => {
          return (
                <Link key={id} to={`/collection/${id}`} className={"link"}>
                  <Card  name={collection.name} description={collection.description} key={id}/>
                </Link>
              )
          })}
      </div>
    </div>
  );
};

export default Collections;
