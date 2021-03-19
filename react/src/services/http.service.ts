export interface HttpResponse<T> extends Response {
  data?: T;
}

export interface RequestOptions {
  url?: string;
  method?: string;
  baseUrl?: string;
  headers?: any;
  params?: any;
  body?: any;
  withCredentials?: boolean;
  credentials?: RequestCredentials;
  fetching?: boolean;
}

class HttpService {
  public async request<T>(
    url: string,
    options: RequestOptions = {}
  ): Promise<HttpResponse<T>> {
    const { body, headers, ...rest } = options;
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
          return res.json().then((body) => {
            res.data = body;
            return res;
          });
        })
        .then((res) => {
          if (res.ok) {
            resolve(res);
          } else {
            //reject(res);
            alert();
            throw res;
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export const http = new HttpService();
