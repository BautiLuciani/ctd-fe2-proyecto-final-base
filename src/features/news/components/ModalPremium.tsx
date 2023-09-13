import { SuscribeImage } from "../../../assets"
import { BotonSuscribir, CotenedorTexto, DescripcionModal, ImagenModal, TituloModal } from "../styled"

interface Props {
    suscribirse: () => void
}

const ModalPremium = ({suscribirse}: Props) => {
    return (
        <>
            <ImagenModal src={SuscribeImage} alt="mr-burns-excellent" />
            <CotenedorTexto>
                <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
                <DescripcionModal>
                    Suscríbete a nuestro newsletter y recibe noticias de nuestros personajes favoritos.
                </DescripcionModal>
                <BotonSuscribir onClick={suscribirse}>
                    Suscríbete
                </BotonSuscribir>
            </CotenedorTexto>
        </>
    )
}

export default ModalPremium