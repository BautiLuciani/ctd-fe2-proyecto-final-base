import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { IMockResponse } from './interface/mockData';

export const server = setupServer(
    rest.get('https://thesimpsonsquoteapi.glitch.me/quotes', (req, res, ctx) => {
        const character = req.url.searchParams.get('character')

        const mockData: IMockResponse = {
            character: character || "Marge Simpson",
            quote: `Una cita de ${character}`,
            image: `image character`,
            direccionPersonaje: `Springfield`
        }

        return res(
            ctx.json([mockData])
        );
    })
)

export const errorServer = setupServer(
    rest.get('https://thesimpsonsquoteapi.glitch.me/quotes', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: "Error en la solicitud" }));
    })
);

