import { FC, useState, useEffect } from "react";
import "./collection.scss";
import Card from "../../components/card/Card"
import { useParams } from "react-router-dom";
import Button from "../../components/common/button/Button"
import CollectionService from "../../services/collection-service"
import CoinService from "../../services/coin-service";
import {ICollection} from "../../types/collection-type";
import AddCoinModal from "../../components/modals/addCoin/AddCoin";
import NameDescriptionModal from "../../components/modals/nameDescription/nameDescription";
import {ICoin} from "../../types/coin-type";
import {CircularProgress} from "@mui/material";

const Collection: FC = () => {
  const collectionService = new CollectionService()
  const coinService = new CoinService()

  const id = useParams().id || '0';

  const [collection, setCollection] = useState<ICollection>()
  const [coins, setCoins] = useState<ICoin[]>([])
  const [showModal, setShowModal] = useState(false)
  const [showPriceModal, setShowPriceModal] = useState(false)
  const [totalPrice, setTotalPrice] = useState('0')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    updateCollectionAndCoins()
  }, [])

   const handleClick = () => {
    setShowModal(true)
  }

 function updateCollectionAndCoins() {
    collectionService.getById(parseInt(id)).then((collection: ICollection) => {
      setCollection(collection)
      setIsLoading(false)
    }).catch(err => console.error(err))
    coinService.getByCollectionId(parseInt(id)).then((coins: ICoin[]) => {
      setCoins(coins)
      setIsLoading(false)
    }).catch(err => console.error(err))
 }

   const handleCalculatePrice = () => {
     const total = coins.reduce((acc, coin) => {
       return acc + parseFloat(coin.price)
     }, 0)
    setTotalPrice(total.toFixed(2))
    setShowPriceModal(true)
   }

  return (
    <div className={"collection"}>
    <AddCoinModal setShowModal={setShowModal} showModal={showModal} collectionId={parseInt(id)} updateCollectionAndCoins={updateCollectionAndCoins}/>
    <NameDescriptionModal setShowModal={setShowPriceModal} showModal={showPriceModal} name="Preco total" description={"Preco somado de todas as moedas da colecao: R$" + totalPrice.toString()}/>
    <div className="collection-header">
    <div className="collection-info">
      <h1>{collection?.name}</h1>
      <p>{collection?.description}</p>
    </div>
        <div className="button-column">
          <Button handleClick={() => handleClick()} text="Adicionar moeda"/>
          <Button handleClick={() => handleCalculatePrice()} text="Calcular preço"/>
        </div>
    </div>
        { isLoading === true ? <CircularProgress style={{color: 'black'}} size={50}/>: null }
        <div className="coins-list">
        {
          isLoading !== true ? 
            coins.map((coin: ICoin, id: number) => {
              return <Card name={coin.name} description={"Ano: " + coin.year.toString() + " | Preco: R$" + coin.price} key={id}/>
            })
            : null
        }
      </div>
    </div>
  );
};

export default Collection;
