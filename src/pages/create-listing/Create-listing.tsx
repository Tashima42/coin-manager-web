import { FC, useState, useEffect } from 'react';
import './create-listing.scss'
import Button from "../../components/common/button/Button";
import FormGroup from "../../components/common/formGroup/FormGroup";
import ComboBox from "../../components/common/ComboBox/ComboBox"
import Hr from "../../components/common/hr/Hr";
import {CircularProgress} from "@mui/material";
import {useForm} from "react-hook-form";
import ListingService from '../../services/listing-service';
import CoinService from '../../services/coin-service';
import {ICoin} from '../../types/coin-type';
import { useNavigate } from "react-router-dom";


const CreateListing: FC = () => {
    const listingService = new ListingService()
    const coinService = new CoinService()
    const navigate = useNavigate()

    let isLoading = false
    let error = null
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [type, setType] = useState('sell')
    const [coins, setCoins] = useState<ICoin[]>([])
    const [coinId, setCoinId] = useState(1)

    useEffect(() => { 
        coinService.getAll().then(coins => setCoins(coins))
    }, [])

    const onSubmit = (data: any) => {
        isLoading = true
        const askingPrice = data.Valor
        const name = data["Titutlo"]
        const description = data.Descricao
        const trade = type === "trade"
        const listedCoinId = coinId

        listingService.create(askingPrice, name, description, trade, listedCoinId).then(() => {
            isLoading = false
            navigate('/listings')
        })
    }

    return (
        <div className={'create-listing'}>
            <h2 className={'listing-title'}>Criar Anúncio</h2>
            <Hr dataContent={'criar anuncio'}/>
            {error && <div className={'registerError'}> {error}
            </div>}
            <div className={'listingForm'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup
                        fieldName={'Titutlo'}
                        register={register}
                        errors={errors}
                        placeholder={'Adicione um titulo...'}
                        isRequired={true}
                        type="text"
                    />
                    <FormGroup
                        fieldName={'Descricao'}
                        register={register}
                        errors={errors}
                        placeholder={'Adicione uma descricao...'}
                        isRequired={false}
                        type={'text'}
                    />
                    <ComboBox
                        fieldName={'Tipo'}
                        register={register}
                        errors={errors}
                        isRequired={true}
                        onChange={(e: any) => setType(e.target.value)}
                        options={[{value: 'sell', displayText: 'Venda' }, {value: 'trade', displayText: 'Troca'}]}
                    />
                    <ComboBox
                        fieldName={'Moeda'}
                        register={register}
                        errors={errors}
                        isRequired={true}
                        onChange={(e: any) => setCoinId(e.target.value)}
                        options={coins.map(coin => { return {value: coin.id, displayText: coin.name} })}
                    />
                    {
                      type === 'sell' &&
                      <FormGroup
                          fieldName={'Valor'}
                          register={register}
                          errors={errors}
                          placeholder={'Adicione uma valor...'}
                          isRequired={true}
                          type={'number'}
                          min="0"
                          step="any"
                      />
                    }
                    <Button
                        type={'submit'}
                        progress={isLoading ?
                            <CircularProgress style={{color: 'white'}} size={20}/> : null}
                        text={'Criar'}
                    />
                </form>
            </div>
        </div>
    );
};

export default CreateListing;
