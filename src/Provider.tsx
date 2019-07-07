import React, { useReducer, useContext } from 'react';

export interface Action {
    type: string
    payload: any
}

export interface IUseGlobalState<State = any> {
    (): React.Context<State>
}

export interface IUseMutations<Mutations = any> {
    (): React.Context<Mutations>
}

export interface IUseActions<Actions = any> {
    (): React.Context<Actions>
}

interface Props {
    initialState: any
    reducer: (state: any, action: Action) => any
    mutations: any
    actions: any
    children: React.ReactNode
}

// TODO: typings
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
//

const stateContext = React.createContext(null);
const dispathContext = React.createContext<React.Dispatch<Action>>(null);
const mutationsContext = React.createContext(null) ;
const actionsContext = React.createContext(null);

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

export function useGlobalState<State = any>() {
    return useContext(stateContext) as State;
}

export const useDispatch = () => useContext(dispathContext);

export function useMutations<Mutations = any>() {
    return useContext<Mutations>(mutationsContext);
}

export function useActions<Actions = any>() {
    return useContext<Actions>(actionsContext);
}

export function getHooks<State = any, Mutations = any, Actions = any>() {
    const useGlobalStateHook: IUseGlobalState<State> = useGlobalState;
    const useMutationsHook: IUseMutations<Mutations> = useMutations;
    const useActionsHook: IUseActions<Actions> = useActions;
    
    return {
        useGlobalState: useGlobalStateHook,
        useDispatch,
        useMutations: useMutationsHook,
        useActions: useActionsHook
    }
}

export default Provider;
