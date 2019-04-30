import * as React from "react";

interface IState {
    episodes: [];
    favourites: [];
}

interface IAction {
    type: string;
    payload: any;
}

const initialState: IState = {
    episodes: [],
    favourites: []
};
export const Store = React.createContext<IState>(initialState);

const reducer = (state: IState, action: IAction): IState => {
    // pass
    switch (action.type) {
        case "FETCH_DATA":
            return { ...state, episodes: action.payload };
        default:
            return state;
    }
};

export const StoreProvider = (props: any): JSX.Element => {
    return <Store.Provider value={initialState}>{props.children}</Store.Provider>;
};
