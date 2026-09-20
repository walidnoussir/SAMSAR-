import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import store from "./store/store";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#FFFFFF",
              color: "#263238",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: {
              iconTheme: { primary: "#4CAF7D", secondary: "#FFFFFF" },
            },
            error: {
              iconTheme: { primary: "#E57373", secondary: "#FFFFFF" },
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
