import Cita from "../Cita"
import { screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { renderRedux } from "./utils"
import userEvent from "@testing-library/user-event"
import { handlers } from './mockServer';
import { setupServer } from 'msw/node';
import { MENSAJE_CARGANDO, NO_ENCONTRADO } from "../constants";
import { rest } from "msw";

const server = setupServer(...handlers)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

        it("Si se ingreso un autor deberia traer una cita de ese autor", async () => {
            renderRedux(<Cita />)
            const input = screen.getByRole("textbox")
            fireEvent.change(input, { target: { value: "Homer Simpson" } })
            const boton = screen.getByText('Obtener Cita')
            await userEvent.click(boton)
            await waitFor(() => {
                const autor = screen.getByText("Homer Simpson")
                expect(autor).toBeInTheDocument()
            })
        })

        it("Si no se ingreso un autor deberia traer una cita aleatoria", async () => {
            renderRedux(<Cita />)
            const boton = screen.getByText('Obtener cita aleatoria')
            await userEvent.click(boton)
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

    describe('Loading', () => {

        it("Si no se ingresa un personaje deberia aparecer 'Cargando...' y luego desaparecer", async () => {

            renderRedux(<Cita />)
            const boton = screen.getByText('Obtener cita aleatoria');
            await userEvent.click(boton)

            await waitForElementToBeRemoved(() => 
                screen.queryByText(MENSAJE_CARGANDO)
            );

            /* await waitFor(() => {
                const loadingElement = screen.queryByText(MENSAJE_CARGANDO);
                expect(loadingElement).toBeNull();
            }); */

        })

        it.skip("Si se ingresa un personaje deberia aparecer 'Cargando...' y luego desaparecer", async () => {
            renderRedux(<Cita />)
            const input = screen.getByRole("textbox")
            await userEvent.type(input,  "Homer Simpson")
            const boton = screen.getByText('Obtener Cita')
            await userEvent.click(boton)

            await waitForElementToBeRemoved(() => 
                screen.queryByText(MENSAJE_CARGANDO), {timeout: 1000}
            );

            /*await waitFor(() => {
                const loadingElement = screen.queryByText(MENSAJE_CARGANDO);
                expect(loadingElement).not.toBeInTheDocument();
            });*/
        })
    })

    describe('Ingresar datos incorrectos', () => {
        it("Ingresar un valor numerico", async () => {
            renderRedux(<Cita />);
            const input = screen.getByRole("textbox");

            fireEvent.change(input, { target: { value: "Homer Simpson123" } });
            const boton = screen.getByText('Obtener Cita');

            userEvent.click(boton);

            await waitFor(() => {
                const errorMessage = screen.getByText("Por favor ingrese un nombre válido");
                expect(errorMessage).toBeInTheDocument();
            });
        })

        it("Ingresar un valor invalido", async () => {
            renderRedux(<Cita />);
            const input = screen.getByRole("textbox");

            fireEvent.change(input, { target: { value: "H@mer Simpson" } });
            const boton = screen.getByText('Obtener Cita');

            userEvent.click(boton);

            await waitFor(() => {
                const errorMessage = screen.getByText("Por favor ingrese un nombre válido");
                expect(errorMessage).toBeInTheDocument();
            });
        })
    })

    describe('Error en la peticion', () => {
        it("Fallo al realizar la peticion", async () => {
            server.use(
                rest.get('https://thesimpsonsquoteapi.glitch.me/quotes', (req, res, ctx) => {
                    return res.networkError('Failed to connect')
                })
            )
            renderRedux(<Cita />);
            await waitFor(() => {
                const errorMessage = screen.getByText(NO_ENCONTRADO);
                expect(errorMessage).toBeInTheDocument();
            });
        });
    })
})