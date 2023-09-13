import citaReducer, { EstadoCita, limpiar } from "../citaSlice"
import { ESTADO_FETCH } from "../constants";


describe("Reducer", () => {
    const initialState: EstadoCita = {
        data: null,
        estado: ESTADO_FETCH.INACTIVO,
    };

    describe("as default", () => {
        it("Deberia devolver el estado inicial", () => {
            const actual = citaReducer(initialState, {type: "any"})
            expect(actual).toEqual(initialState)
        })
    })

    describe('on limpiar', () => { 
        const newInitialState: EstadoCita = {
            data: {personaje: "Homer Simpson ", cita: "D'oh!", imagen: "homer.jpg", direccionPersonaje: "Springfield"},
            estado: ESTADO_FETCH.CARGANDO
        }

        it("Deberia limpiar el nuevo estado y devolver el estado inicial", ()=> {
            const actual = citaReducer(newInitialState, limpiar())
            expect(actual).toEqual(initialState)
        })
     })
})

