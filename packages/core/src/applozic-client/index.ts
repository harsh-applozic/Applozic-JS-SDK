import BaseClientWithStore, {
  BaseClientWithStoreOptions
} from './base-with-store';
import ApplozicSocket from './socket';
import LoginResult from './models/LoginResult';
import { SocketEventListener } from './socket/socket-events';

interface ApplozicClientOptions extends BaseClientWithStoreOptions {
  useSocket?: boolean;
  events?: SocketEventListener;
}

/**
 * Applozic Client
 *
 * This is the main class for interacting with the Applozic API.
 * This class incorporates the [BaseClientWithStore](./base-with-store.ts) class
 */
export default class ApplozicClient extends BaseClientWithStore {
  public applozicSocket: ApplozicSocket | undefined = undefined;
  private options: ApplozicClientOptions | undefined = undefined;

  constructor(applicationId: string, options?: ApplozicClientOptions) {
    super(applicationId, options);
    this.options = options;
  }

  async postLogin(loginRes: LoginResult, accessToken: string) {
    await super.postLogin(loginRes, accessToken);
    if (this.options?.useSocket !== false) {
      this.applozicSocket = new ApplozicSocket({
        applicationId: this.applicationId,
        loginResult: loginRes,
        events: this.options?.events
      });
      this.applozicSocket.connect();
      this.subscribeToTypingStatus();
    }
  }

  async logout() {
    await super.logout();
    if (this.applozicSocket) {
      this.applozicSocket.disconnect();
    }
  }

  public sendTypingStatus = (receiverId: string, status: number) => {
    const topic = `/topic/typing-${this.applicationId}-${receiverId}`;
    const message = `${this.applicationId},${this.loginResult?.userId},${status}`;
    this.applozicSocket?.sendMessage(topic, message);
  };

  private subscribeToTypingStatus = async () => {
    await this.applozicSocket?.connect();
    if (this.options?.events?.onTypingStatus && this.applozicSocket) {
      this.applozicSocket.subscribe(
        `/topic/typing-${this.applicationId}-${this.loginResult?.userId}`,
        stompMessage => {
          try {
            const [appId, userId, status] = stompMessage.body.split(',');
            this.options.events.onTypingStatus(userId, parseInt(status));
          } catch (e) {
            console.error('Error parsing message', stompMessage.body);
          }
        }
      );
    }
  };
}
