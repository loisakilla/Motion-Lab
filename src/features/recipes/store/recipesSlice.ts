import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RecipesState = {
    favorites: string[];
    search: string;
    tags: string[];
    onlyFav: boolean;
};

const initialState: RecipesState = {
    favorites: [],
    search: '',
    tags: [],
    onlyFav: false
};
const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        toggleFavorite (state, action: PayloadAction<string>){
            const id = action.payload;
            const i = state.favorites.indexOf(id);
            if (i === -1)
                state.favorites.push(id);
            else
                state.favorites.splice(i, 1);
        },
        setSearch(state, action: PayloadAction<string>){
            state.search = action.payload;
        },
        toggleTag(state, action: PayloadAction<string>) {
            const t = action.payload;
            const i = state.tags.indexOf(t);
            if (i === -1)
                state.tags.push(t);
            else
                state.tags.splice(i, 1);
        },
        clearTags(state){
            state.tags = [];
        },
        setOnlyFav(state, action: PayloadAction<boolean>) {
            state.onlyFav = action.payload;
        }
    }
});

export const { toggleFavorite, setSearch, toggleTag, clearTags, setOnlyFav } = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;