import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import {FC, useState} from "react";
import './createCollection.scss'
import Button from "../../common/button/Button";
import CloseIcon from '@mui/icons-material/Close';
import {Fade, CircularProgress} from "@mui/material";
import FormGroup from "../../../components/common/formGroup/FormGroup";
import {useForm} from "react-hook-form";
import CollectionService from "../../../services/collection-service"
import NameDescriptionModal from "../nameDescription/nameDescription"


interface CreateCollectionProps{
    showModal: boolean;
    setShowModal: (isOpen: boolean) => any;
    updateCollections: Function
}

const CreateCollection: FC<CreateCollectionProps> = ({showModal, setShowModal, updateCollections}) => {
  const collectionService = new CollectionService()
    const {register, handleSubmit, formState: {errors}} = useForm()
    let isLoading = false
    const [showAdditionalModal, setShowAdditionalModal] = useState(false)
    const [collectionName, setCollectionName] = useState<string>("")

    const onSubmit = (data: any) => { 
        isLoading = true
        setCollectionName(data.Nome)
        collectionService.create(data.Nome, data.Descricao).then(() => {
            updateCollections()
            setShowAdditionalModal(true)
            setShowModal(false)
        })
    }
    return (
    <div>
        <NameDescriptionModal 
          setShowModal={setShowAdditionalModal} 
          showModal={showAdditionalModal} 
          name="Colecao criada" 
          description={"Voce criou a colecao " + collectionName}
          />
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
    </div>
    );
}
export default CreateCollection

