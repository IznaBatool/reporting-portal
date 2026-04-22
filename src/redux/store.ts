import { PersistConfig } from 'redux-persist/es/types';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
    key: "root",
    storage,
    whitelist: ["auth", "snackbar"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.APP_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/FLUSH", "persist/PURGE"], // Ignore redux-persist actions
            },
        }),
})

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch