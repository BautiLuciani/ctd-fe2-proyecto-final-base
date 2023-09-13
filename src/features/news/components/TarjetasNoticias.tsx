import { INoticiasNormalizadas } from "../interface/noticiasNormalizadas"
import { BotonLectura, DescripcionTarjetaNoticia, FechaTarjetaNoticia, ImagenTarjetaNoticia, TarjetaNoticia, TituloTarjetaNoticia } from "../styled"

interface Props {
  n: INoticiasNormalizadas,
  mostrarModal: (n: INoticiasNormalizadas) => void
}

const TarjetasNoticias = ({ n, mostrarModal }: Props) => {
  return (
    <TarjetaNoticia key={n.id}>
      <ImagenTarjetaNoticia src={n.imagen} />
      <TituloTarjetaNoticia>{n.titulo}</TituloTarjetaNoticia>
      <FechaTarjetaNoticia>{n.fecha}</FechaTarjetaNoticia>
      <DescripcionTarjetaNoticia>
        {n.descripcionCorta}
      </DescripcionTarjetaNoticia>
      <BotonLectura onClick={() => mostrarModal(n)}>Ver más</BotonLectura>
    </TarjetaNoticia>
  )
}

export default TarjetasNoticias