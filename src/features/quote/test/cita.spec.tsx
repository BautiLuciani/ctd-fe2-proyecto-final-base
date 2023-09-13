import Cita from "../Cita"
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderRedux } from "./utils"
import userEvent from "@testing-library/user-event"
import { setupServer } from 'msw/node';
import { rest } from 'msw';

describe('Cita', () => {

    describe('Si no ingreso el nombre del autor', () => {
        it("Deberia mostrar el texto `Obtener cita aleatoria`", () => {
            renderRedux(<Cita />)
            const boton = screen.getByText("Obtener cita aleatoria")
            expect(boton).toBeInTheDocument()
        })
    })

    describe('Si ingreso el nombre del autor', () => {
        it("Deberia mostrar el texto `Obtener cita`", () => {
            renderRedux(<Cita />)
            const input = screen.getByRole("textbox")
            fireEvent.change(input, { target: { value: "Homer Simpson" } })
            const boton = screen.getByText("Obtener Cita")
            expect(boton).toBeInTheDocument()
        })
    })

    describe('onClickObtenerCita', () => {

        const server = setupServer(
            rest.get('https://thesimpsonsquoteapi.glitch.me/quotes', (req, res, ctx) => {
                const character = req.url.searchParams.get('character')
                return res(
                    ctx.json([
                        {
                            character: character || "Marge Simpson",
                            quote: `Una cita de ${character}`,
                            image: `image character`,
                            direccionPersonaje: `Springfield`
                        },
                    ])
                );
            })
        );

        beforeAll(() => server.listen());
        afterEach(() => server.resetHandlers());
        afterAll(() => server.close());

        it("Si se ingreso un autor deberia traer una cita de ese autor", async () => {
            renderRedux(<Cita />)
            const input = screen.getByRole("textbox")
            fireEvent.change(input, { target: { value: "Homer Simpson" } })
            const boton = screen.getByText('Obtener Cita')
            userEvent.click(boton)
            await waitFor(() => {
                const autor = screen.getByText("Homer Simpson")
                expect(autor).toBeInTheDocument()
            })
        })

        it("Si no se ingreso un autor deberia traer una cita aleatoria", async() => {
            renderRedux(<Cita />)
            const boton = screen.getByText('Obtener cita aleatoria')
            userEvent.click(boton)
            await waitFor(() => {
                const autorAleatorio = screen.getByText("Marge Simpson")
                expect(autorAleatorio).toBeInTheDocument()
            })
        })
    })

    describe('onClickBorrar', () => {
        it("Deberia borrar la cita", async () => {
            renderRedux(<Cita />)
            const boton = screen.getByText('Borrar')
            await userEvent.click(boton)
            expect(screen.getByText("No se encontro ninguna cita")).toBeInTheDocument()
        })
    })
})