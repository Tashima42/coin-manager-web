import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import {FC} from "react";
import './createCollection.scss'
import Button from "../../common/button/Button";
import CloseIcon from '@mui/icons-material/Close';
import {Fade, CircularProgress} from "@mui/material";
import FormGroup from "../../../components/common/formGroup/FormGroup";
import {useForm} from "react-hook-form";


interface ModalWindowProps{
    showModal: boolean;
    setShowModal: (isOpen: boolean) => any;
}

const ModalWindow: FC<ModalWindowProps> = ({showModal, setShowModal}) => {
    const {register, handleSubmit, formState: {errors}} = useForm()
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
                    <div className={'modalCreateCollection'}>
                        <div className={'modalCreateCollectionTitle'}>
                            <h3>Crie uma nova colecao</h3>
                            <span onClick={() => setShowModal(false)}><CloseIcon/></span>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup
                                fieldName={'Nome'}
                                register={register}
                                errors={errors}
                                placeholder={'Adicione um nome...'}
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
export default ModalWindow

