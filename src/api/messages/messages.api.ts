import { WSTransport } from '@/services/wsTransport';
import { BASE_WSS_URL } from '@/constants';

class MessagesAPI {
    private _baseWSSURL: string;

    wssTransport: WSTransport | null = null;

    constructor() {
        this._baseWSSURL = BASE_WSS_URL;
    }

    // Create WSS transport
    async getWSSTransport(userId: number, chatID: number): Promise<void> {
        const token = window.store.getState()?.token;
        if (!token) {
            return;
        }

        try {
            this.wssTransport = new WSTransport(`${this._baseWSSURL}/${userId}/${chatID}/${token}`);
        } catch (error) {
            console.log(error);
        }
    }

    // Connect to chat
    async connectToChat(): Promise<void> {
        try {
            if (this.wssTransport) {
                await this.wssTransport.connect();
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Send message
    async sendMessage(message: string): Promise<void> {
        try {
            if (this.wssTransport) {
                this.wssTransport.send({ content: message, type: 'message' });
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Get messages
    async getMessages(message: string = '0'): Promise<void> {
        try {
            if (this.wssTransport) {
                this.wssTransport.send({ content: message, type: 'get old' });
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Disconnect from chat
    async disconnectFromChat(): Promise<void> {
        try {
            if (this.wssTransport) {
                this.wssTransport.close();
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default new MessagesAPI();
