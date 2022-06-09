import { FC, useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import "./collections.scss";
import Card from "../../components/card/Card"
import Button from "../../components/common/button/Button"
import CollectionService from "../../services/collection-service"
import CreateCollectionModal from "../../components/modals/createCollection/CreateCollection"

const Collections: FC = () => {
  const collectionService = new CollectionService()
  const [collections, setCollections] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    collectionService.userCollections().then(collections => {
      setCollections(collections)
    })
  }, [])

   const handleClick = () => {
    setShowModal(true)
  }

  return (
    <div className={"collections"}>
    <CreateCollectionModal setShowModal={setShowModal} showModal={showModal} />
    <div className="collections-header">
      <h1>Coleções</h1>
      <div className="button-row">
        <Button handleClick={() => handleClick()}  text="Criar coleção"/>
      </div>
    </div>
      <div className="collection-cards">
      {collections.map((collection) => {
          return (
                <Link key={collection.id} to={`/collection/${collection.id}`} className={"link"}>
                  <Card  name={collection.name} description={collection.description} key={collection.id}/>
                </Link>
              )
          })}
      </div>
    </div>
  );
};

export default Collections;
