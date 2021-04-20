export type HttpResponse<T> = Response & {
  data?: T;
};

export type RequestOption = {
  url?: string;
  method?: string;
  baseUrl?: string;
  headers?: { [key: string]: string };
  params?: { [key: string]: string };
  body?: { [key: string]: any };
  withCredentials?: boolean;
  credentials?: RequestCredentials;
  init?: boolean;
};

class HttpService {
  public async request<T>(
    url: string,
    option: RequestOption
  ): Promise<HttpResponse<T>> {
    const { body, headers, ...rest } = option || {};
    const config: RequestInit = {
      method: body ? 'POST' : 'GET',
      headers: { 'Content-Type': 'application/json', ...headers },
      credentials: 'include',
      ...rest,
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    return this.fetchRequest<T>(new Request(url, config));
  }

  private fetchRequest<T>(req: RequestInfo): Promise<HttpResponse<T>> {
    return new Promise((resolve, reject) => {
      fetch(req)
        .then((res: HttpResponse<T>) => {
          return res.json().then((body: T) => {
            res.data = body;
            return res;
          });
        })
        .then((res) => {
          if (res.ok) {
            resolve(res);
          } else {
            //reject(res);
            throw res;
          }
        })
        .catch((err: HttpResponse<T>) => {
          reject(err);
        });
    });
  }
}

export const http = new HttpService();
