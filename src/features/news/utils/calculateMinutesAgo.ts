export const calculateMinutesAgo = (fecha: Date): string => {
    const ahora = new Date();
    const minutosTranscurridos = Math.floor(
        (ahora.getTime() - fecha.getTime()) / 60000
    );
    return `Hace ${minutosTranscurridos} minutos`;
};