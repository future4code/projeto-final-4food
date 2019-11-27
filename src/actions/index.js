import axios from 'axios';
import { routes } from "../containers/Router";
import { push } from "connected-react-router";

const urlBase = 'https://us-central1-missao-newton.cloudfunctions.net/iFuture'

export const setOrdersHistory = (orders) => ({
    type: 'SET_ORDERS',
    payload: {
        orders
    }
})

export const setAmount = (amount) => ({
    type: 'SET_AMOUNT',
    payload: {
        amount
    }
})

export const setProfile = (profile) => ({
    type: 'SET_PROFILE',
    payload: {
        profile
    }
})

export const setActiveOrder = (activeOrder) => ({
    type: 'SET_ACTIVE_ORDER',
    payload: {
        activeOrder
    }
})

export const getOrdersHistory = () => async (dispatch) => {
    const token = window.localStorage.getItem("token");

    const response = await axios.get(`${urlBase}/orders/history`, {
        headers: {
            auth: token
        }

    })

    dispatch(setOrdersHistory(response.data.orders))
}

export const getProfile = () => async (dispatch) => {
    const token = window.localStorage.getItem("token");

    const response = await axios.get(`${urlBase}/profile`, {
        headers: {
            auth: token
        }

    })

    dispatch(setProfile(response.data.user))
}

export const getActiveOrder = () => async (dispatch) => {
    const token = window.localStorage.getItem("token");

    const response = await axios.get(`${urlBase}/active-order`, {
        headers: {
            auth: token
        }

    })

    dispatch(setActiveOrder(response.data.order))
}

export const signUp = (name, email, cpf, password) => async dispatch => {
    const body = { name, email, cpf, password}

    const response = await axios.post(
        `${urlBase}/signup`, body
    );
    window.localStorage.setItem('token', response.data.token)
    dispatch(push(routes.address));
}