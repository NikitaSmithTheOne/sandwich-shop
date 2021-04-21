export const loadFromLocalStorage = <T>(storageName: string): T | undefined => {
    try {
        const serialisedState = localStorage.getItem(storageName);
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
};

export const saveToLocalStorage = <T>(state: T, storageName: string): void => {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem(storageName, serialisedState);
    } catch (e) {
        console.warn(e);
    }
};
