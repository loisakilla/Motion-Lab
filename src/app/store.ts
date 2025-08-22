import { configureStore, type Middleware } from '@reduxjs/toolkit';
import { recipesReducer } from '@/features/recipes/store/recipesSlice';

const PERSIST_KEY = 'mlab_recipes_state_v1';

const persistMiddleware: Middleware = storeAPI => next => action => {
    const result = next(action);
    try {
        const state = storeAPI.getState();
        const slice = state.recipes as unknown as object;
        localStorage.setItem(PERSIST_KEY, JSON.stringify(slice));
    } catch {}
    return result;
};

function loadPreloaded() {
    try {
        const raw = localStorage.getItem(PERSIST_KEY)
        return raw ? JSON.parse(raw) : undefined;
    } catch {
        return undefined;
    }
}

export const store = configureStore({
    reducer: {
        recipes: recipesReducer
    },
    preloadedState: {recipes: loadPreloaded()},
    middleware: get => get().concat(persistMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;