export interface apiFunc {
  (url: string, method?: 'get' | 'post', body?: any): Promise<any>
}

export const api: apiFunc;

export as namespace Api;