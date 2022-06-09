import { FC, useEffect} from 'react';
import './listing.scss'
import Button from "../../components/common/button/Button";
import FormGroup from "../../components/common/formGroup/FormGroup";
import ComboBox from "../../components/common/ComboBox/ComboBox"
import {CircularProgress} from "@mui/material";
import {Navigate} from "react-router-dom";
import {useForm} from "react-hook-form";

const Listing: FC = () => {
    const {isLoading, error, isAuth} = {isLoading: false, error: null, isAuth: false};
    const {register, handleSubmit, formState: {errors}} = useForm()

    useEffect(() => {
    }, [])

    const onSubmit = (data: any) => {
    }

    return (
        <div className={'create-listing'}>
            {isAuth && <Navigate to={'/'}/>}
            <h2 className={'listing-title'}>Titulo do Anuncio</h2>
            <p>Descricao do anuncio</p>
            {error && <div className={'registerError'}> {error}
            </div>}
            <div className={'listingForm'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup
                        fieldName={'Valor'}
                        register={register}
                        errors={errors}
                        placeholder={'Adicione uma valor...'}
                        isRequired={true}
                        type={'number'}
                        min="1"
                        step="any"
                        value="100.00"
                        readonly={true}
                    />
                    <ComboBox
                        fieldName={'Tipo'}
                        register={register}
                        errors={errors}
                        isRequired={true}
                        readonly={true}
                        options={[{value: 'trade', displayText: 'Troca'}]}
                    />
                    <ComboBox
                        fieldName={'Moeda'}
                        register={register}
                        errors={errors}
                        isRequired={true}
                        readonly={true}
                        options={[{value: 1, displayText: 'Moeda 1' }]}
                    />
                    <ComboBox
                        fieldName={'Moeda de Troca'}
                        register={register}
                        errors={errors}
                        isRequired={false}
                        options={[{value: 1, displayText: 'Moeda 1' }, {value: 2, displayText: 'Moeda 2'}]}
                    />
                    <ComboBox
                        fieldName={'Metodo de pagamento'}
                        register={register}
                        errors={errors}
                        isRequired={true}
                        options={[{value: 'credit-card', displayText: 'Cartao de Credito' }, {value: 'pix', displayText: 'Pix'}]}
                    />
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
