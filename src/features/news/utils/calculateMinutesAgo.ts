export const calculateMinutesAgo = (fecha: string): string => {
    const ahora = new Date();
    const minutosTranscurridos = Math.floor(
        (ahora.getTime() - new Date(fecha).getTime()) / 60000
    );
    return `Hace ${minutosTranscurridos} minutos`;
};