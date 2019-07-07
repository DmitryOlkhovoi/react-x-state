import { getHooks } from 'xporn';

interface State {
    test: string
}

const hooks = getHooks<State>();

export default hooks;

/**
 * Also you can do
 * import { useGlobalState } from 'xporn';
 * 
 * export const useGlobalState = hooks.useGlobalState;
 * export const useGlobalState: IUseGlobalState<State> = useGlobalState;
 * export const useGlobalState = useGlobalState;
 */