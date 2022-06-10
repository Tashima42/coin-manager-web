import { FC, useState, useEffect } from "react";
import "./listings.scss";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card"
import Button from "../../components/common/button/Button"
import ListingService from "../../services/listing-service";

const Listings: FC = () => {
  const listingService = new ListingService();

  const [listings, setListings] = useState<any[]>([])

  useEffect(() => {
    listingService.getAll().then(listings => {
      setListings(listings)
    })
  }, [])

  return (
    <div className={"listings"}>
    <div className="listings-header">
      <h1>Anúncios</h1>
      <div className="button-row">
        <Link to={"/create-listing"} className={"link"}>
          <Button text="Criar anúncio"/>
        </Link>
      </div>
    </div>
      {listings.map((listing) => {
        if(listing.enabled === true) {
          return (
                <Link key={listing.id} to={`/listing/${listing.id}`} className={"link"}>
                  <Card  name={listing.name} description={listing.description} key={listing.id}/>
                </Link>
              )
        }
        })}
    </div>
  );
};

export default Listings;
