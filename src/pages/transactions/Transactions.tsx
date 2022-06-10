import { FC, useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import "./transactions.scss";
import Card from "../../components/card/Card"
import TransactionService from "../../services/transaction-service";
import ListingService from "../../services/listing-service";
import {ITransaction} from "../../types/transaction-type";

const Transactions: FC = () => {
  const transactionService = new TransactionService()
  const listingService = new ListingService()
  const [transactions, setTransactions] = useState<Array<ITransaction>>([{id: 1, date: new Date(), paymentMethod: "", listingId: 1}])

  useEffect(() => {
    transactionService.getAll().then(transactions => {
      transactions.forEach((transaction, id) => {
        const listing = listingService.getById(transaction.listingId)
        transactions[id].listing = listing
      })
      if(transactions[0].id) {
        setTransactions(transactions)
      }
    })
  }, [])

  return (
    <div className={"transactions"}>
    <div className="transactions-header">
      <h1>Transacoes</h1>
    </div>
      <div className="transaction-cards">
      {transactions.map((transaction) => {
          return (
                <Link key={transaction.id} to={`/receipt/${transaction.listingId}`} className={"link"}>
                  <Card  name={"id: " + transaction.id + " |" + transaction.listing?.name || ""} description={transaction.listing?.description || ""} key={transaction.id}/>
                </Link>
              )
          })}
      </div>
    </div>
  );
};

export default Transactions;
