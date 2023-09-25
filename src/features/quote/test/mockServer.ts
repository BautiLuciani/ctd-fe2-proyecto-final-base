import { rest } from 'msw';
import { IMockResponse } from './interface/mockData';

export const handlers = [
    rest.get('https://thesimpsonsquoteapi.glitch.me/quotes', (req, res, ctx) => {
        const character = req.url.searchParams.get('character');

        if (character === 'Homer Simpson') {

            const mockData: IMockResponse = {
                character: 'Homer Simpson',
                quote: 'Una cita de Homer Simpson',
                image: 'imagen de Homer',
                direccionPersonaje: 'Springfield',
            }

            return res(
                ctx.json([mockData])
            );

        } else if (!character) {

            const mockData: IMockResponse = {
                character: 'Marge Simpson',
                quote: 'Una cita de Marge Simpson',
                image: 'imagen de Marge',
                direccionPersonaje: 'Springfield',
            }

            return res(
                ctx.json([mockData])
            );
            
        } else {
            return res(ctx.status(404));
        }
    })
];