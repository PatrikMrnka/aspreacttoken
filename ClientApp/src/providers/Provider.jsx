import axios from "axios"
import { useEffect } from "react"
import { createContext, useReducer, useContext } from "react"

const LOCAL_STORAGE_KEY = "tokens"
let storedData = JSON.parse(sessionStorage.getItem(LOCAL_STORAGE_KEY))

export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

const initialState = {
    accessToken: ""
}

const reducer = (state, action) => {
    switch (action.type) {
        case LOGIN: {
            axios.post("https://localhost:44414/api/Auth/login?username=" + action.payload.username + "&password=" + action.payload.password,
            {
                header: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                console.log(response.data.value);
            return {accessToken: response.data.value}
            });
        }
        default: {
            return state;
        }
    }
}


export const ApplicationContext = createContext(initialState);

export const ApplicationProvider = props => {
    const store = useReducer(
        reducer,
        storedData ?? initialState
    );

    useEffect(() => {
        sessionStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store))
    }, [store])

    return (
        <ApplicationContext.Provider value={store}>
            {props.children}
        </ApplicationContext.Provider>
    );
}

export const useAppContext = () => useContext(ApplicationContext);