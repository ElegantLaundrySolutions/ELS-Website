import { createRoot } from "react-dom/client";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/geist";
import "lenis/dist/lenis.css";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
