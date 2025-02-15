import { useEffect, useState } from "react";
import { obtenerNoticias } from "./fakeRest";
import { ContenedorNoticias, ListaNoticias, TituloNoticias } from "./styled";
import normalizeNoticia from "./utils/normalizeNoticia";
import TarjetasNoticias from "./components/TarjetasNoticias";
import Modal from "./components/Modal";
import { INoticiaNormalizada } from "./interface/noticiaNormalizada";

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiaNormalizada[]>([]);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState<INoticiaNormalizada | null>(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();
      const data = respuesta.map(normalizeNoticia);
      setNoticias(data);
    };

    obtenerInformacion();
  }, []);

  const mostrarModal = (n: INoticiaNormalizada) => {
    setNoticiaSeleccionada(n);
  };

  const cerrarModal = () => {
    setNoticiaSeleccionada(null);
  };

  const suscribirse = () => {
    setTimeout(() => {
      alert("Suscripto!");
      cerrarModal();
    }, 1000);
  };

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((n) => (
          <TarjetasNoticias n={n} mostrarModal={mostrarModal}/>
        ))}
        {noticiaSeleccionada && (
          <Modal modal={noticiaSeleccionada} cerrarModal={cerrarModal} suscribirse={suscribirse}/>
        )}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;
