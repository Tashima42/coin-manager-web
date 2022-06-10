import {FC, useEffect, useState} from 'react';
import './receipt.scss'
import Button from "../../components/common/button/Button";
import ListingService from '../../services/listing-service';
import {useParams} from "react-router-dom";
import TransactionService from '../../services/transaction-service';
import { IListing } from '../../types/listing-type';
import {ITransaction} from '../../types/transaction-type';

const Receipt: FC = () => {
  const id = useParams().id || '0';

  const listingService = new ListingService()
  const transactionService = new TransactionService()

  const [listing, setListing] = useState<IListing>({ 
    id: 1, name: '', description: '', askingPrice: '', enabled: true, trade: false,
    listedCoin: { id: 1, name: '', price: '', year: 0, image: '' }, 
    tradedCoin: { id: 1, name: '', price: '', year: 0, image: '' }
  })
  const [transaction, setTransaction] = useState<ITransaction>()

  useEffect(() => {
    const listing = listingService.getById(parseInt(id))
    setListing(listing)
    transactionService.getByListingId(parseInt(id)).then((transaction: ITransaction) => {
        setTransaction(transaction)
        console.log(transaction)
    })
  }, [])

  function print() {
    window.print()
  }

    return (
        <div className={'receipt'}>
          <div className="receipt-body">
            <div className="receipt-body-title">
              <h1>{listing?.name}</h1>
              <p className="description">{listing?.description}</p>
            </div>
            <div className="receipt-body-info">
                <div className="labels">
                  <label>Data:</label>
                  <label>Moeda:</label>
                  {
                    listing?.trade === true &&
                      <label>Moeda de troca:</label> 
                  }
                  {
                    listing?.trade === false &&
                      <label>Metodo de pagamento:</label>
                  }
                  {
                    listing?.trade === false &&
                      <label>Valor:</label>
                  }
                </div>
                <div className="values">
                  <p>{transaction?.date.toString()}</p>
                  <p>{listing.listedCoin?.name}</p>
                  {
                    listing.trade === true &&
                    <p>{listing ? listing?.tradedCoin.name : ''}</p>
                  }
                  {
                    listing.trade === false &&
                    <p>{transaction?.paymentMethod}</p>
                  }
                  {
                    listing.trade === false &&
                    <p>R${listing?.askingPrice}</p>
                  }
                </div>
              </div>
          </div>
          <div className="receipt-footer">
            <Button handleClick={() => print()} text={'Imprimir'}/>
          </div>
        </div>
    );
};

export default Receipt;
