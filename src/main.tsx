import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.tsx";
import "./index.css";
import { MEASUREMENT_ID } from "./config.ts";
import ReactGA from "react-ga4";

ReactGA.initialize(MEASUREMENT_ID);

ReactGA.send({ hitType: "pageview", page: window.location.pathname });

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
