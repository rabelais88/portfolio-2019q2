export interface enhanceAllFunc {
  (target: any, enhancers: Array<any>): any;
}

export const enhanceAll: enhanceAllFunc;

export as namespace UtilTypes;