import { agent } from 'superagent';
import type { Response } from 'superagent';
import { encode } from 'base-64';
import AppConfig from './config';
import LoginResult from './models/LoginResult';

export enum METHODS {
  GET = 'GET',
  POST = 'POST'
}

export interface BaseResponse<ApiResponseType> {
  /** Api status message */
  status: 'success' | 'error';
  /** Timestamp from server */
  generatedAt: number;
  /** API response object */
  response: ApiResponseType;
  /** API Error details object */
  errorResponse?: {
    errorCode: string;
    description: string;
    displayMessage: string;
  }[];
}
export default class BaseClient {
  public applicationId: string;
  public authHeaders = {
    'Application-Key': '',
    Authorization: '',
    'Device-Key': '',
    'Application-User': '',
    'X-Authorization': '',
    'Access-Token': '',
    'App-Module-Name': '',
    'UserId-Enabled': false
  };
  public loginResult: LoginResult | null = null;

  constructor(applicationId: string) {
    this.applicationId = applicationId;
  }

  private setAuthHeaders = (loginRes: LoginResult) => {
    this.authHeaders['Application-Key'] = this.applicationId;
    this.authHeaders['Device-Key'] = loginRes.deviceKey;

    const authCode = encode(
      unescape(encodeURIComponent(`${loginRes.userId}:${loginRes.deviceKey}`))
    );
    this.authHeaders['Authorization'] = 'Basic ' + authCode;
    this.authHeaders['Application-User'] = 'Basic ' + authCode;

    this.authHeaders['X-Authorization'] = loginRes.authToken;

    this.authHeaders['UserId-Enabled'] = true;
  };

  private getAgent = (useAuth: boolean) => {
    const request = agent();

    if (useAuth) {
      request.set(this.authHeaders);
    }
    return request;
  };

  async init() {} // eslint-disable-line @typescript-eslint/no-empty-function

  async postLogin(loginRes: LoginResult) {
    this.loginResult = loginRes;
    this.setAuthHeaders(loginRes);
  }

  async logout() {
    this.loginResult = null;
  }

  public makeApiCall = async (
    method: METHODS,
    endpoint: string,
    options?: {
      /** Override the default API host */
      host?: string;
      data?: any;
      query?: { [key: string]: string | number };
      useAuth?: boolean;
      json?: boolean;
    }
  ): Promise<any> => {
    const useJSON = options?.json ?? true;
    let response: Response | null;

    const request = this.getAgent(!!options?.useAuth);

    if (options?.query) {
      request.query(options.query);
    }

    if (useJSON) {
      request.set('Accept', 'application/json');
    }

    try {
      if (method === METHODS.GET) {
        response = await request.get(
          `${options?.host ?? AppConfig.APPLOZIC_HOST}${endpoint}`
        );
      } else if (method === METHODS.POST) {
        response = await request
          .post(`${AppConfig.APPLOZIC_HOST}${endpoint}`)
          .send(options?.data ?? null);
      } else {
        response = null;
      }

      if (response !== null) {
        if (useJSON) {
          return response.body;
        }
        return response.text;
      } else {
        console.warn('Applozic: API call failed');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  public uploadFile = async (
    completeUrl: string,
    keyName: string,
    file: File,
    options?: {
      /** Override the default API host */
      host?: string;
      query?: { [key: string]: string | number };
      useAuth?: boolean;
    }
  ): Promise<any> => {
    let response: Response;

    const request = this.getAgent(!!options?.useAuth);

    if (options?.query) {
      request.query(options.query);
    }

    try {
      response = await request.post(completeUrl).attach(keyName, file);

      return response.body;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}
