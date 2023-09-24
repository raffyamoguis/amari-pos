import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.tsx";
import "./index.css";
import { MEASUREMENT_ID } from "./config.ts";
import ReactGA from "react-ga4";
import './fonts/Inter-Regular.woff';

ReactGA.initialize(MEASUREMENT_ID);

// Detect the device type dynamically
const deviceType = window.innerWidth < 768 ? 'mobile' : 'desktop'; // Example: Consider devices with a screen width less than 768px as "mobile"

// Set the device_type user property
ReactGA.gtag('set', { 'device_type': deviceType });

ReactGA.send({ hitType: "pageview", page: window.location.pathname, user_properties: {
    'device_type': deviceType
  } });

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
