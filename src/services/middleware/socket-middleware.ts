import { Middleware } from 'redux';
import { RootState, IWSActions } from '../store';

export const socketMiddleware = (wsActions: IWSActions): Middleware<RootState> => {
    return (store) => {
      let socket: WebSocket | null = null;
  
      return (next) => (action) => {
        const { dispatch } = store;
        const { type } = action;
        const {
          wsConnect,
          onOpen,
          onClose,
          onError,
          onMessage,
          wsConnecting,
          wsDisconnect,
        } = wsActions;
  
        if (type === wsConnect.type) {
          socket = new WebSocket(action.payload);
          dispatch(wsConnecting);
        }
  
        if (socket) {
          socket.onopen = () => {
            dispatch(onOpen);
          };
  
          socket.onerror = () => {
            dispatch(onError('Error'));
          };
  
          socket.onmessage = (event) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
  
            dispatch(onMessage(parsedData));
          };
  
          socket.onclose = () => {
            dispatch(onClose);
          };
  
          if (wsDisconnect.type === type) {
            socket.close();
            socket = null;
          }
        }
  
        next(action);
      };
    };
  };
  