import { App, Payload } from "../interfaces";
import { handleRequest, sendResponse } from "./message";

export const start = (app: App) => {
  app.ports.request.subscribe((message: string) => {
    const payload: Payload = JSON.parse(message);
    const response = handleRequest(payload);
    sendResponse(response);
  });
}