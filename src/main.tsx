import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Providers } from "./utils/context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        {/* Providers contain all provider which was needed . done for to make code clean */}
        {/* example BrowserRouter QueryClientProvider */}
        <Providers>
            <App />
        </Providers>
    </React.StrictMode>
);
