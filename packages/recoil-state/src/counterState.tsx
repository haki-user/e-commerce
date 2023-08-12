import { atom, selector } from 'recoil';
import { IUser } from 'common';
export const counterState = atom<number>({
    key: 'counterState',
    default: 0,
}); 

export const doubledCounterState = selector({
    key: 'doubledCounterState',
    get: ({ get }) => {
        const counter = get(counterState);
        return counter * 2;
    }
});

export const authState = atom<IUser>({
    key: 'authState',
    default: {token: localStorage.getItem("token") || '', username: ''},
});