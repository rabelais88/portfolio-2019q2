// @ts-check
/// <reference path="./api.types.d.ts" />

import fetch from 'isomorphic-fetch';
import env from '../env-vars';

const createQuery = queries => {
  return Object.entries(queries)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};

/**
 * @type {Api.api}
 * @example
 * const res = await api('post', 'http://abc', {data:123});
 * const res = await api('http://abc') // get request
 */
const api = async (url, method = 'get', bodyOrQuery) => {
  const params = {
    method,
  };
  let fullUrl = `${env.API_HOST}${url}`;
  if (bodyOrQuery && method === 'post') params.body = bodyOrQuery;
  if (bodyOrQuery && method === 'get') {
    const queries = createQuery(bodyOrQuery);
    fullUrl = `${fullUrl}?${queries}`;
  }
  if (['development', 'test'].includes(env.NODE_ENV)) {
    console.log(`[api-request] ${fullUrl}`, params);
  }
  const res = await fetch(fullUrl, params);
  const parsedRes = await res.json();
  return parsedRes;
  /**
  Body {
  url: 'http://localhost:4000/info/posts?page=1&limit=1',
  status: 200,
  statusText: 'OK',
  headers:
   Headers {
     _headers:
      { 'x-powered-by': [Array],
        'access-control-allow-origin': [Array],
        'access-control-allow-methods': [Array],
        'access-control-allow-headers': [Array],
        'access-control-allow-credentials': [Array],
        'content-type': [Array],
        'content-length': [Array],
        etag: [Array],
        date: [Array],
        connection: [Array] } },
  ok: true,
  body:
   PassThrough {
     _readableState:
      ReadableState {
        objectMode: false,
        highWaterMark: 16384,
        buffer: BufferList { head: [Object], tail: [Object], length: 1 },
        length: 280,
        pipes: null,
        pipesCount: 0,
        flowing: null,
        ended: true,
        endEmitted: false,
        reading: false,
        sync: false,
        needReadable: false,
        emittedReadable: true,
        readableListening: false,
        resumeScheduled: false,
        paused: true,
        emitClose: true,
        autoDestroy: false,
        destroyed: false,
        defaultEncoding: 'utf8',
        awaitDrain: 0,
        readingMore: false,
        decoder: null,
        encoding: null },
     readable: true,
     _events:
      [Object: null prototype] { prefinish: [Function: prefinish] },
     _eventsCount: 1,
     _maxListeners: undefined,
     _writableState:
      WritableState {
        objectMode: false,
        highWaterMark: 16384,
        finalCalled: false,
        needDrain: false,
        ending: true,
        ended: true,
        finished: true,
        destroyed: false,
        decodeStrings: true,
        defaultEncoding: 'utf8',
        length: 0,
        writing: false,
        corked: 0,
        sync: false,
        bufferProcessing: false,
        onwrite: [Function: bound onwrite],
        writecb: null,
        writelen: 0,
        bufferedRequest: null,
        lastBufferedRequest: null,
        pendingcb: 0,
        prefinished: true,
        errorEmitted: false,
        emitClose: true,
        autoDestroy: false,
        bufferedRequestCount: 0,
        corkedRequestsFree: [Object] },
     writable: false,
     allowHalfOpen: true,
     _transformState:
      { afterTransform: [Function: bound afterTransform],
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: 'buffer' } },
  bodyUsed: false,
  size: 0,
  timeout: 0,
  _raw: [],
  _abort: false }
   */
};

export default api;
