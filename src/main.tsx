import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <div className="bg-[#222]">
        <RouterProvider router={router} />
      </div>
    </Provider>
  </StrictMode>
);
