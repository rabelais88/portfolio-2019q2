// @ts-check
/// <reference path="./env-vars.types.d.ts" />
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const env = (/** @type {Env.Config} */(publicRuntimeConfig));

export default env;
