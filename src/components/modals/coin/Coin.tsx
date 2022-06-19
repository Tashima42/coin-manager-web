import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import {FC} from "react";
import './coin.scss'
import CloseIcon from '@mui/icons-material/Close';
import {ICoin} from "../../../types/coin-type"
import CoinService from "../../../services/coin-service"


interface CoinProps{
    showModal: boolean;
    setShowModal: (isOpen: boolean) => any;
    coin: ICoin;
}

const Coin: FC<CoinProps> = ({showModal, setShowModal, coin}) => {
    return (
    <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={showModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{timeout: 500,}}
            >
                  <div className={'modalCoin'}>
                      <div className={'modalCoinTitle'}>
                          <h3>{coin.name}</h3>
                          <span onClick={() => setShowModal(false)}><CloseIcon/></span>
                      </div>
                      <div className={'modalCoinContent'}>
                        <img src={coin.image} alt={coin.name}/>
                      </div>
                  </div>
        </Modal>
    </div>
    );
}
export default Coin
