import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null}  persistor={persistor}>
    <div className="bg-[#222]">
        <RouterProvider router={router} />
      </div>
      </PersistGate>
    </Provider>
  </StrictMode>
);
