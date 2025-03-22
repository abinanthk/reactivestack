export type TDevtoolsConfig = {
  // port: number;
  url: string;
};

export interface ServerToClientEvents {
  storeListChange: (list: { key: string; state: object }[]) => void;
  storeStateChange: ({key, info}: {key: string, info: any}) => void;
  storeSubscribe: (key: string) => void;
  storeUnsubscribe: (key: string) => void;
  storeObserved: (key: string) => void;
  storeUnobserved: (key: string) => void;
}

export interface ClientToServerEvents {
  storeListChange: (list: { key: string; state: object }[]) => void;
  storeStateChange: ({key, info}: {key: string, info: any}) => void;
  storeSubscribe: (key: string) => void;
  storeUnsubscribe: (key: string) => void;
  storeObserved: (key: string) => void;
  storeUnobserved: (key: string) => void;
}

export interface InterServerEvents {}

export interface SocketData {}
