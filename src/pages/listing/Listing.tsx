import { FC, useEffect, useState} from 'react';
import './listing.scss'
import Button from "../../components/common/button/Button";
import FormGroup from "../../components/common/formGroup/FormGroup";
import ComboBox from "../../components/common/ComboBox/ComboBox"
import {CircularProgress} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import ListingService from "../../services/listing-service";
import TransactionService from '../../services/transaction-service';
import CoinService from '../../services/coin-service';
import {IListing} from '../../types/listing-type';
import { ICoin } from '../../types/coin-type';

const Listing: FC = () => {
    const id = useParams().id || '0';
    const navigate = useNavigate()

    const transactionService = new TransactionService()

    let isLoading = false
    let error = null

    const {register, handleSubmit, formState: {errors}} = useForm()
    const [listing, setListing] = useState<IListing>({ 
    id: 1, name: '', description: '', askingPrice: '', enabled: true, trade: false,
      listedCoin: { id: 1, name: '', price: '', year: 0, image: '' }, 
      tradedCoin: { id: 1, name: '', price: '', year: 0, image: '' }
    })
    const [coins, setCoins] = useState<ICoin[]>([])


    useEffect(() => {
      const listingService = new ListingService();
      const coinService = new CoinService()
      const listing: IListing = listingService.getById(parseInt(id))
      coinService.getAll().then(coins => setCoins(coins))
      setListing(listing)
    }, [])

    const onSubmit = (data: any) => {
      const listing_id = parseInt(id)
      const traded_coin_id = parseInt(data["Moeda de Troca"])
      const payment_mehtod = data["Metodo de pagamento"]

      transactionService.create(listing_id, payment_mehtod, traded_coin_id).then(() => {
        navigate('/receipt/' + id)
      })
    }

    return (
        <div className={'create-listing'}>
            <h2 className={'listing-title'}>{listing.name}</h2>
            <p>{listing.description}</p>
            {error && <div className={'registerError'}> {error}
            </div>}
            <div className={'listingForm'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {
                      listing.trade === false &&
                        <FormGroup
                            fieldName={'Valor'}
                            register={register}
                            errors={errors}
                            placeholder={'Adicione um valor...'}
                            isRequired={false}
                            type={'number'}
                            min="0"
                            step="any"
                            value={listing?.askingPrice || ''}
                            readonly={true}
                        />
                    }
                    <ComboBox
                        fieldName={'Tipo'}
                        register={register}
                        errors={errors}
                        isRequired={false}
                        onChange={() => {}}
                        readonly={true}
                        options={[{ value: listing.trade ? 'trade' : 'sell', displayText: listing.trade ? 'Troca' : 'Venda' }]}
                    />
                    <ComboBox
                        fieldName={'Moeda'}
                        register={register}
                        errors={errors}
                        onChange={() => {}}
                        isRequired={false}
                        readonly={true}
                        options={[{value: listing.listedCoin?.id, displayText: listing?.listedCoin?.name }]}
                    />
                    {
                        listing.trade === true &&
                          <ComboBox
                            fieldName={'Moeda de Troca'}
                            register={register}
                            errors={errors}
                            onChange={() => {}}
                            isRequired={false}
                            options={coins.map(coin => { return {value: coin.id, displayText: coin.name} })}
                        />
                    }
                    {
                      listing.trade === false &&
                      <ComboBox
                          fieldName={'Metodo de pagamento'}
                          register={register}
                          errors={errors}
                          onChange={() => {}}
                          isRequired={true}
                          options={[{value: 'credit-card', displayText: 'Cartao de Credito' }, {value: 'pix', displayText: 'Pix'}]}
                      />
                    }
                    <Button
                        type={'submit'}
                        progress={isLoading ?
                            <CircularProgress style={{color: 'white'}} size={20}/> : null}
                        text={'Comprar'}
                    />
                </form>
            </div>
        </div>
    );
};

export default Listing;
