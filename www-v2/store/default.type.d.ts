export interface thunkActionArgs {
  (dispatch: any, getState: any): Promise<void>
}

export interface thunkAction {
  (): thunkActionArgs;
}