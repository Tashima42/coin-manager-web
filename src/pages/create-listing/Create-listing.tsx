import { FC, useEffect} from 'react';
import './create-listing.scss'
import Button from "../../components/common/button/Button";
import FormGroup from "../../components/common/formGroup/FormGroup";
import ComboBox from "../../components/common/ComboBox/ComboBox"
import Hr from "../../components/common/hr/Hr";
import {CircularProgress} from "@mui/material";
import {useForm} from "react-hook-form";

const CreateListing: FC = () => {
    let isLoading = false
    let error = null
    const {register, handleSubmit, formState: {errors}} = useForm()

    useEffect(() => {
    }, [])

    const onSubmit = (data: any) => {
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
                        options={[{value: 'sell', displayText: 'Venda' }, {value: 'trade', displayText: 'Troca'}]}
                    />
                    <ComboBox
                        fieldName={'Moeda'}
                        register={register}
                        errors={errors}
                        isRequired={true}
                        options={[{value: 1, displayText: 'Moeda 1' }, {value: 2, displayText: 'Moeda 2'}]}
                    />
                    <FormGroup
                        fieldName={'Valor'}
                        register={register}
                        errors={errors}
                        placeholder={'Adicione uma valor...'}
                        isRequired={true}
                        type={'number'}
                        min="1"
                        step="any"
                    />
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
