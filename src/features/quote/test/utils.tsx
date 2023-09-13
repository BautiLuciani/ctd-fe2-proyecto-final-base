import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import citaReducer from "../citaSlice"
import React from 'react';
import { ICita } from '../types';
import { ESTADO_FETCH } from '../constants';
import { Provider } from 'react-redux';

export function renderRedux(component: React.ReactNode, state = { cita: { data: null as ICita | null, estado: ESTADO_FETCH.INACTIVO as ESTADO_FETCH } }) {

    const store = configureStore({
        reducer: {
            cita: citaReducer,
        },
        preloadedState: state
    })

    return {
        ...render(<Provider store={store}>
            {component}
        </Provider>),
        store
    }
}

