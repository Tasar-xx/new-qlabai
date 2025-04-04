import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// Properly handle the root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find the root element");
  document.body.innerHTML = '<div style="color: white; text-align: center; margin-top: 50px;">Failed to load the application. Please refresh the page.</div>';
} else {
  const root = createRoot(rootElement);
  
  try {
    // Clear any loading content
    root.render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    console.log("Application mounted successfully");
  } catch (error) {
    console.error("Failed to render React application:", error);
    rootElement.innerHTML = `
      <div style="color: white; text-align: center; margin-top: 50px;">
        <h2>Something went wrong</h2>
        <p>Failed to load the application. Please refresh the page.</p>
        <pre style="color: #ff6b6b; margin-top: 20px; text-align: left; background: #111; padding: 10px; border-radius: 4px; max-width: 600px; margin-left: auto; margin-right: auto; overflow: auto;">${error instanceof Error ? error.message : String(error)}</pre>
      </div>
    `;
  }
}
