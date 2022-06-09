import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import {FC, useState, useEffect} from "react";
import './addCoin.scss'
import Button from "../../common/button/Button";
import CloseIcon from '@mui/icons-material/Close';
import {Fade, CircularProgress} from "@mui/material";
import ComboBox from "../../common/ComboBox/ComboBox"
import {useForm} from "react-hook-form";
import {ICoin} from "../../../types/coin-type"
import CoinService from "../../../services/coin-service"


interface ModalWindowProps{
    showModal: boolean;
    setShowModal: (isOpen: boolean) => any;
}

const AddCoin: FC<ModalWindowProps> = ({showModal, setShowModal}) => {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const coinService = new CoinService()

    const [coins, setCoins] = useState<ICoin[]>([])

    useEffect(() => { 
        coinService.getAll().then(coins => setCoins(coins))
    }, [])

    let isLoading = false
    let error = null
    const onSubmit = (data: any) => { }
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={showModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{timeout: 500,}}
            >
                <Fade style={{outline: 'none'}} in={showModal}>
                    <div className={'modalAddCoin'}>
                        <div className={'modalAddCoinTitle'}>
                            <h3>Adicione uma moeda a colecao</h3>
                            <span onClick={() => setShowModal(false)}><CloseIcon/></span>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ComboBox
                                fieldName={'Moeda'}
                                register={register}
                                errors={errors}
                                isRequired={true}
                                options={coins.map(coin => { return {value: coin.id, displayText: coin.name} })}
                            />
                            <Button
                                type={'submit'}
                                progress={isLoading ?
                                    <CircularProgress style={{color: 'white'}} size={20}/> : null}
                                text={'Criar'}
                            />
                        </form>
                    </div>
                </Fade>
        </Modal>
    );
}
export default AddCoin

