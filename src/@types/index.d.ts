import { TabType } from "../constants/enums.types";


interface TabState {
    name: string;
    type: TabType;
    children: TabState[];
    required: boolean;
    id: string;
    parent: string[];
}