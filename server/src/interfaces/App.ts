import { Payload } from './Payload';

export interface App {
  ports: {
    request: {
      subscribe: (callback: (message: string) => void) => void
    },
    response: {
      send: (payload: Payload) => void
    }
  }
}
