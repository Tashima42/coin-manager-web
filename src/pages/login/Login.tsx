import React, { FC, useEffect} from 'react';
import './login.scss'
import Button from "../../components/common/button/Button";
import FormGroup from "../../components/common/formGroup/FormGroup";
import Hr from "../../components/common/hr/Hr";
import {useDispatch} from "react-redux";
import {login, setError} from "../../store/reducers/auth/action-creators";
import {CircularProgress} from "@mui/material";
import {Navigate} from "react-router-dom";
import {useAppSelector, useTitle} from "../../hooks";
import {useForm} from "react-hook-form";

const Login: FC = () => {
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
        <div className={'login'}>
            {isAuth && <Navigate to={'/'}/>}
            <h2 className={'loginTitle'}>Bem vindo ao Coin Manager</h2>
            <Hr dataContent={'Login'}/>
            {error && <div className={'registerError'}>
                {error}
            </div>}
            <div className={'loginForm'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup
                        fieldName={'Username'}
                        register={register}
                        errors={errors}
                        placeholder={'Enter username...'}
                        isRequired={true}
                    />
                    <FormGroup
                        fieldName={'Password'}
                        register={register}
                        errors={errors}
                        placeholder={'Enter password...'}
                        isRequired={true}
                        type={'password'}
                    />
                    <Button
                        type={'submit'}
                        progress={isLoading ?
                            <CircularProgress style={{color: 'white'}} size={20}/> : null}
                        text={'Continuar'}
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;
