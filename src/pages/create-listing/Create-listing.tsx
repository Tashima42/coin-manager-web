import { FC, useEffect} from 'react';
import './create-listing.scss'
import Button from "../../components/common/button/Button";
import FormGroup from "../../components/common/formGroup/FormGroup";
import ComboBox from "../../components/common/ComboBox/ComboBox"
import Hr from "../../components/common/hr/Hr";
import {useDispatch} from "react-redux";
import {login, setError} from "../../store/reducers/auth/action-creators";
import {CircularProgress} from "@mui/material";
import {Navigate} from "react-router-dom";
import {useAppSelector, useTitle} from "../../hooks";
import {useForm} from "react-hook-form";

const CreateListing: FC = () => {
    const {isLoading, error, isAuth} = useAppSelector(state => state.auth)
    const {register, handleSubmit, formState: {errors}} = useForm()
    const dispatch = useDispatch()
    useTitle('Log in')

    useEffect(() => {
        dispatch(setError(''))
    }, [dispatch])

    const onSubmit = (data: any) => {
        dispatch(login(data.Username, data.Password))
    }

    return (
        <div className={'create-listing'}>
            {isAuth && <Navigate to={'/'}/>}
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
