import { INoticiaNormalizada } from "../interface/noticiaNormalizada";

export const normalizeNoticia = (n: any): INoticiaNormalizada => {
    const titulo = n.titulo
        .split(" ")
        .map((str: string) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        })
        .join(" ");

    const ahora = new Date();
    const minutosTranscurridos = Math.floor(
        (ahora.getTime() - new Date(n.fecha).getTime()) / 60000
    );

    return {
        id: n.id,
        titulo,
        descripcion: n.descripcion,
        fecha: `Hace ${minutosTranscurridos} minutos`,
        esPremium: n.esPremium,
        imagen: n.imagen,
        descripcionCorta: n.descripcion.substring(0, 100),
    };
};

export default normalizeNoticia;