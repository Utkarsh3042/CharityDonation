import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { StateContextProvider } from './context/index.jsx';
import { Sepolia } from "@thirdweb-dev/chains";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}


createRoot(rootElement).render(

    <ThirdwebProvider
       activeChain={Sepolia} clientId="4a07cea51acf7e8e6a94e561128ab795" // Replace with your actual client ID
    >
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </ThirdwebProvider>
  ,
);
