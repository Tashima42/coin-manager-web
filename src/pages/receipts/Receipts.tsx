import { FC, useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import "./receipts.scss";
import Card from "../../components/card/Card"
import ListingService from "../../services/listing-service";

const Receipts: FC = () => {
  const listingService = new ListingService();

  const [listings, setListings] = useState<any[]>([])

  useEffect(() => {
    listingService.getAll().then(listings => {
      setListings(listings)
    })
  }, [])

  return (
    <div className={"receipts"}>
    <div className="receipts-header">
      <h1>Recibos</h1>
    </div>
      <div className="transaction-cards">
      {listings.map((listing) => {
          return (
                <Link key={listing.id} to={`/receipt/${listing.id}`} className={"link"}>
                  <Card  name={"id: " + listing.id + " |" + listing.name || ""} description={listing.description || ""} key={listing.id}/>
                </Link>
              )
          })}
      </div>
    </div>
  );
};

export default Receipts;
