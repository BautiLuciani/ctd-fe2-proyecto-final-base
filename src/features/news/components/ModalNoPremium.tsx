import { INoticiasNormalizadas } from '../interface/noticiasNormalizadas'
import { CotenedorTexto, DescripcionModal, ImagenModal, TituloModal } from '../styled'

interface Props {
    modal: INoticiasNormalizadas
}

const ModalNoPremium = ({ modal }:Props) => {
    return (
        <>
            <ImagenModal src={modal.imagen} alt="news-image" />
            <CotenedorTexto>
                <TituloModal>{modal.titulo}</TituloModal>
                <DescripcionModal>{modal.descripcion}</DescripcionModal>
            </CotenedorTexto>
        </>
    )
}

export default ModalNoPremium