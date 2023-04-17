import { TabState } from "../@types";

export enum TabType {
    String = "String",
    Number = "Number",
    Boolean = "Boolean",
    Object = "Object",
}

export const getDefaultState = (parent: Array<string> = [], type: TabType = TabType.String) => {
    const state: TabState = {
        name: `NewTab_${window.crypto.randomUUID().slice(0, 5)}}`,
        type: type,
        children: [],
        required: false,
        id: window.crypto.randomUUID(),
        parent: [...parent],
    } as TabState;

    state.parent.push(state.id);

    return state;
}
