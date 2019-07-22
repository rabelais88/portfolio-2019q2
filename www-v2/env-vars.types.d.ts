export interface Config extends NodeJS.ProcessEnv {
  API_HOST: string;
  NODE_ENV: string;
}

export as namespace Env;