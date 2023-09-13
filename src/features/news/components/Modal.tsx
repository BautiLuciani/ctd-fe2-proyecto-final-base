import { CloseButton as Close } from "../../../assets";
import { INoticiasNormalizadas } from "../interface/noticiasNormalizadas";
import { CloseButton, ContenedorModal, TarjetaModal } from "../styled"
import ModalNoPremium from "./ModalNoPremium";
import ModalPremium from "./ModalPremium";

interface Props {
    modal: INoticiasNormalizadas
    cerrarModal: () => void,
    suscribirse: () => void
}

const Modal = ({ modal, cerrarModal, suscribirse }: Props) => {
    return (
        <ContenedorModal>
            <TarjetaModal>
                <CloseButton onClick={cerrarModal}>
                    <img src={Close} alt="close-button" />
                </CloseButton>
                {modal.esPremium ? (
                    <ModalPremium suscribirse={suscribirse}/>
                ) : (
                    <ModalNoPremium modal={modal}/>
                )}
            </TarjetaModal>
        </ContenedorModal>
    )
}

export default Modal