export interface Config extends NodeJS.ProcessEnv {
  API_HOST: string;
  NODE_ENV: string;
  IMAGE_HOST: string;
}

export as namespace Env;