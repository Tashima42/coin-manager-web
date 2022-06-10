import { FC, useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import "./collections.scss";
import Card from "../../components/card/Card"
import Button from "../../components/common/button/Button"
import CollectionService from "../../services/collection-service"
import CreateCollectionModal from "../../components/modals/createCollection/CreateCollection"

const Collections: FC = () => {
  const collectionService = new CollectionService()
  const [collections, setCollections] = useState<any[]>([{id: 1, name: "Moedas Brasileiras", descriptions: "Moedas atuais do Brasil"}])
  const [updated, setUpdated] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if(!updated) {
      updateCollections()
      setUpdated(true)
    }
  }, [])

  function updateCollections() {
    collectionService.userCollections().then((collections: any[]) => {
      if(collections[0].id) {
        setCollections(collections)
      }
    })
  }

 const handleClick = () => {
    setShowModal(true)
  }

  return (
    <div className={"collections"}>
    <CreateCollectionModal setShowModal={setShowModal} showModal={showModal} updateCollections={updateCollections}/>
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
