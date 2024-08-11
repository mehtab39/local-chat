import { fromEvent } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

class BroadcastService {
    constructor(channelName = 'defaultChannel', userId) {
        if (!userId) {
            throw new Error('User ID must be provided');
        }
        this.userId = userId;
        this.channel = new BroadcastChannel(channelName);
        this.message$ = fromEvent(this.channel, 'message').pipe(
            filter(event => event.data.createdBy !== this.userId),
            map(event => event.data)
        );
    }

    broadcast(messageType, messageData) {
        this.channel.postMessage({ type: messageType, data: messageData, createdBy: this.userId });
    }

}

export default BroadcastService;
