import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import {FC} from "react";
import './nameDescription.scss'
import CloseIcon from '@mui/icons-material/Close';
import {Fade} from "@mui/material";


interface NameDescriptionProps{
    showModal: boolean;
    setShowModal: (isOpen: boolean) => any;
    name: string;
    description: string;
}

const NameDescription: FC<NameDescriptionProps> = ({showModal, setShowModal, name, description}) => {
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
                    <div className={'modalNameDescription'}>
                        <div className={'modalNameDescriptionTitle'}>
                            <h3>{name}</h3>
                            <span onClick={() => setShowModal(false)}><CloseIcon/></span>
                        </div>
                       <p>{description}</p> 
                    </div>
                </Fade>
        </Modal>
    );
}
export default NameDescription

