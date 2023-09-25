import { INoticiaNormalizada } from "../interface/noticiaNormalizada";
import { calculateMinutesAgo } from "./calculateMinutesAgo";
import { capitalizeWords } from "./capitalizeWords";

export const normalizeNoticia = (n: any): INoticiaNormalizada => {
    const titulo = capitalizeWords(n.titulo)
    const fecha = calculateMinutesAgo(n.fecha);

    return {
        id: n.id,
        titulo,
        descripcion: n.descripcion,
        fecha,
        esPremium: n.esPremium,
        imagen: n.imagen,
        descripcionCorta: n.descripcion.substring(0, 100),
    };
};

export default normalizeNoticia;