import "../globals.css";
import {
  startResponseCapture,
} from "../lib/captureResponse";
import "@fontsource/inter/index.css";
import ReactDOM from "react-dom/client";
import MemraWidget from "../components/MemraWidget";

import { startPromptCapture } from "../lib/capturePrompt";

const root = document.createElement("div");

document.body.appendChild(root);

ReactDOM.createRoot(root).render(<MemraWidget />);
startPromptCapture();
startResponseCapture();
