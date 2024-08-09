import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice';
import { cartReducer } from "./cartSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

// export const store = configureStore({
//     reducer: {
//         userStore: userSliceReducer,
//         cartStore: cartReducer
//     },
//     // reducer: cartReducer
// })

const reducers = combineReducers({
        userStore: userSliceReducer,
        cartStore: cartReducer
    // reducer: cartReducer
})


  
  const persistConfig = {
    key: 'root',
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, reducers)
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
  
  export const persistor = persistStore(store)