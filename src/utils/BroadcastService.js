class BroadcastService {
    constructor(channelName = 'defaultChannel') {
        this.channel = new BroadcastChannel(channelName);
    }

    broadcast(messageType, messageData) {
        this.channel.postMessage({ type: messageType, data: messageData });
    }

    subscribe(callback) {
        const handleMessage = (event) => {
            callback(event.data);
        };

        this.channel.addEventListener('message', handleMessage);

        return () => {
            this.channel.removeEventListener('message', handleMessage);
        };
    }
}

export default BroadcastService;
