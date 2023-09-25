import Cita from "../Cita"
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderRedux } from "./utils"
import userEvent from "@testing-library/user-event"
import { errorServer, server } from './mockServer';

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

        it("Si no se ingreso un autor deberia traer una cita aleatoria", async () => {
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

    describe('Loading', () => {
        it("Si se ingresa un personaje deberia aparecer 'Cargando...' y luego desaparecer", async () => {
            renderRedux(<Cita />);
            const input = screen.getByRole("textbox");
            fireEvent.change(input, { target: { value: "Homer Simpson" } });
            const boton = screen.getByText('Obtener Cita');

            userEvent.click(boton);

            const loadingElement = screen.getByText("Cargando...");
            expect(loadingElement).toBeInTheDocument();

            await waitFor(() => {
                const loadingElement = screen.queryByText("Cargando...");
                expect(loadingElement).toBeNull();
            });
        })

        it("Si no se ingresa un personaje deberia aparecer 'Cargando...' y luego desaparecer", async () => {
            renderRedux(<Cita />);
            const boton = screen.getByText('Obtener cita aleatoria');

            userEvent.click(boton);

            const loadingElement = screen.getByText("Cargando...");
            expect(loadingElement).toBeInTheDocument();

            await waitFor(() => {
                const loadingElement = screen.queryByText("Cargando...");
                expect(loadingElement).toBeNull();
            });
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

            beforeAll(() => errorServer.listen());
            afterEach(() => errorServer.resetHandlers());
            afterAll(() => errorServer.close());

            renderRedux(<Cita />);
            const input = screen.getByRole("textbox");
            fireEvent.change(input, { target: { value: "Homer Simpson" } });
            const boton = screen.getByText('Obtener Cita');

            userEvent.click(boton);

            await waitFor(() => {
                const errorMessage = screen.getByText("Por favor ingrese un nombre válido");
                expect(errorMessage).toBeInTheDocument();
            });
        });
    })
})