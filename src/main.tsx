import "./App.css";
import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.ts";
import { createRoot } from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
