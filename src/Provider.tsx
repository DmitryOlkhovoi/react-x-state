import React, { useReducer, useContext } from 'react';

interface Props {
    initialState: any
    reducer: any
    mutations: any
    actions: any
    children: React.ReactNode
}

function makeDispatchableMutations(mutations: any, dispatch: any) {
    const dispatchableActions = {} as any;
    const keys = Object.keys(mutations);

    keys.forEach((key) => {
        dispatchableActions[key] = (...args: any) => dispatch(mutations[key](...args));
    });

    return dispatchableActions;
}

function makeDispatchableActions(actions: any, dispatch: any) {
    const dispatchableActions = {} as any;
    const keys = Object.keys(actions);

    keys.forEach((key) => {
        dispatchableActions[key] = (...args: any) => actions[key](dispatch, ...args);
    });

    return dispatchableActions;
}

const stateContext = React.createContext({});
const dispathContext = React.createContext((() => {}) as React.Dispatch<any>);
const mutationsContext = React.createContext(({}) as any) ;
const actionsContext = React.createContext(({}) as any);
// const selectorsContext = React.createContext({});

const Provider: React.FC<Props> = (props) => {
    const { initialState, reducer, mutations, actions, children } = props;
    const [state, dispatch] = useReducer(reducer, {}, () => initialState);

    return (
        <dispathContext.Provider value={dispatch}>
            <mutationsContext.Provider value={makeDispatchableMutations(mutations, dispatch)}>
                <actionsContext.Provider value={makeDispatchableActions(actions, dispatch)}>
                    <stateContext.Provider value={state}>
                        { children }
                    </stateContext.Provider>
                </actionsContext.Provider>
            </mutationsContext.Provider>
        </dispathContext.Provider>
    );
}

export const useGlobalState = () => useContext(stateContext);
export const useDispatch = () => useContext(dispathContext);
export const useMutations = () => useContext(mutationsContext);
export const useActions = () => useContext(actionsContext);
// export const useSelectors = () => useContext(selectorsContext);

export default Provider;
