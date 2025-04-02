import io from 'socket.io-client';
import { BASE_URL } from './constants';

export const createSocketConnevtion = ()=>{
    return io(BASE_URL);
}