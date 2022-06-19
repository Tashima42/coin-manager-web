import { FC} from 'react';
import './login.scss'
import Button from "../../components/common/button/Button";
import FormGroup from "../../components/common/formGroup/FormGroup";
import Hr from "../../components/common/hr/Hr";
import {CircularProgress} from "@mui/material";
import {useForm} from "react-hook-form";
import UserService from "../../services/user-service"
import { useNavigate } from 'react-router-dom';

const Login: FC = () => {
    const userService = new UserService();
    const navigate = useNavigate();
    let isLoading = false
    const {register, handleSubmit, formState: {errors}} = useForm()

    const onSubmit = async (data: any) => {
      isLoading = true
      const success = await userService.login(data.Username, data.Password)
      if(success) {
        isLoading = false
        navigate("/collections", { replace: true })
      } else {
        alert("Invalid username or password")
        isLoading = false
      }
    }


    return (
        <div className={'login'}>
            <h2 className={'loginTitle'}>Bem vindo ao Double Coin</h2>
            <Hr dataContent={'Login'}/>
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
