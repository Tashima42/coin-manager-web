import { FC } from "react";
import { Link } from "react-router-dom";
import "./collections.scss";
import Card from "../../components/card/Card"
import Button from "../../components/common/button/Button"

const Collections: FC = () => {
      const collections = [
      {
        id: 1,
        name: "Коллекция 1",
        description: "Описание коллекции 1",
      },
      {
        id: 2,
        name: "Коллекция 2",
        description: "Описание коллекции 2",
      },
      {
        id: 3,
        name: "Коллекция 3",
        description: "Описание коллекции 3",
      }
      ]
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
