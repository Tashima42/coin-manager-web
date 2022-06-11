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
import CollectionService from "../../../services/collection-service"
import NameDescriptionModal from "../nameDescription/nameDescription"
import {ICollection} from "../../../types/collection-type"


interface AddCoinProps{
    showModal: boolean;
    setShowModal: (isOpen: boolean) => any;
    collectionId: number;
    updateCollectionAndCoins: Function;
}

const AddCoin: FC<AddCoinProps> = ({showModal, setShowModal, collectionId, updateCollectionAndCoins}) => {

    const [showAdditionalModal, setShowAdditionalModal] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm()
    const collectionService = new CollectionService()
    const coinService = new CoinService()

    const [coins, setCoins] = useState<ICoin[]>([])
    const [coinId, setCoinId] = useState<number>(1)
    const [coinName, setCoinName] = useState<string>("")
    const [collectionName, setCollectionName] = useState<string>("")

    useEffect(() => { 
        coinService.getAll().then(coins => setCoins(coins))
    }, [])

    let isLoading = false
    const onSubmit = () => {
        isLoading = true
        collectionService.addCoin(collectionId, coinId).then(() => {
            const coinName = coins.find(coin => coin.id === coinId)?.name || ""
            setCoinName(coinName)
            collectionService.getById(collectionId).then((collection: ICollection) => {
              setCollectionName(collection.name)
            })
            isLoading = false
            updateCollectionAndCoins()
            setShowAdditionalModal(true)
            setShowModal(false)
        })
    }
    return (
    <div>
        <NameDescriptionModal 
          setShowModal={setShowAdditionalModal} 
          showModal={showAdditionalModal} 
          name="Moeda adicionada" 
          description={"Voce adicionou a moeda " + coinName + " na colecao " + collectionName}
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
                                onChange={(e: any) => setCoinId(parseInt(e.target.value))}
                                options={coins.map(coin => { return {value: coin.id, displayText: coin.name} })}
                            />
                            <Button
                                type={'submit'}
                                progress={isLoading ?
                                    <CircularProgress style={{color: 'white'}} size={20}/> : null}
                                text={'Adicionar'}
                            />
                        </form>
                    </div>
                </Fade>
        </Modal>
    </div>
    );
}
export default AddCoin

