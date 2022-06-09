import { FC, useEffect, useState} from 'react';
import './listing.scss'
import Button from "../../components/common/button/Button";
import FormGroup from "../../components/common/formGroup/FormGroup";
import ComboBox from "../../components/common/ComboBox/ComboBox"
import {CircularProgress} from "@mui/material";
import {Navigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import ListingService from "../../services/listing-service";
import {IListing} from '../../types/listing-type';

const Listing: FC = () => {
    const id = useParams().id || '0';

    let isLoading = false
    let error = null

    const {register, handleSubmit, formState: {errors}} = useForm()
    const [listing, setListing] = useState<IListing>({ askingPrice: '0', description: '', name: '', id: 0, listedCoin: null })
    const [listingTypeInfo, setListingTypeInfo] = useState<any>({ value: 'sell', displayText: 'Venda' })

    const listingService = new ListingService();

    useEffect(() => {
      const listing: IListing = listingService.getById(parseInt(id))
      setListing(listing)
      if(listing.tradedCoin !== null) { 
        setListingTypeInfo({value: 'trade', displayText: 'Troca'})
      } 
    }, [])

    const onSubmit = (data: any) => {
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
                      listingTypeInfo.value === 'sell' &&
                        <FormGroup
                            fieldName={'Valor'}
                            register={register}
                            errors={errors}
                            placeholder={'Adicione um valor...'}
                            isRequired={true}
                            type={'number'}
                            min="1"
                            step="any"
                            value={listing?.askingPrice || ''}
                            readonly={true}
                        />
                    }
                    <ComboBox
                        fieldName={'Tipo'}
                        register={register}
                        errors={errors}
                        isRequired={true}
                        readonly={true}
                        options={[listingTypeInfo]}
                    />
                    <ComboBox
                        fieldName={'Moeda'}
                        register={register}
                        errors={errors}
                        isRequired={true}
                        readonly={true}
                        options={[{value: listing.listedCoin?.id, displayText: listing?.listedCoin?.name }]}
                    />
                    {
                        listingTypeInfo.value === 'trade' &&
                          <ComboBox
                            fieldName={'Moeda de Troca'}
                            register={register}
                            errors={errors}
                            isRequired={false}
                            options={[{value: 1, displayText: 'Moeda 1' }, {value: 2, displayText: 'Moeda 2'}]}
                        />
                    }
                    {
                      listingTypeInfo.value === 'sell' &&
                      <ComboBox
                          fieldName={'Metodo de pagamento'}
                          register={register}
                          errors={errors}
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
