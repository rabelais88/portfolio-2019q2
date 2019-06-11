# Portfolio /w Next.js(React-redux) + MongoDB
- author sungryeol park(sungryeolp@gmail.com)
- used tech stack: React + Next.js(Client) + Vue.js(Admin) + Express + Mongoose + Mocha(TDD) + Redux + passport.js + SCSS

## Commands
initialize & register admin to db
```bash
# mongodb should be running background first
# api/
yarn install
yarn setup
# www/
yarn install
```
test run
```bash
# for both www, api, admin
yarn dev
yarn dev:all # + db
```
production deployment
```bash
# for both www, api
yarn build
yarn start
# for admin
yarn build:prod
# admin doesn't have server. use nginx to serve.
```
analyze size
```bash
# only for www
yarn analyze
yarn analyze:server # only for server
yarn analyze:browser # only for browser
```
in case of changing lint setup
```bash
yarn lint:init
```

mocha test for api server
```bash
# only for api
yarn test:watch --grep ${targetString}
```

## troubleshooting
in dev mode, the programs don't shut down properly due to bugs in concurrency.js.
when it happens, use the following commands.
node-sass causes errors in windows environment. please use Mac or Linux environment.
```bash
# check pid & status
ps aux | grep nodemon
ps aux | grep mongod
# kill process
pkill -f *nodemon*
kill -9 mongod
```

as there is *ServiceWorker* working on background,
> cache TTL/max-age should be set to 0

## solved & ongoing issues
 - [x] *jest* doesn't work properly with mongoose testing &rarr; replaced with *mocha*
 - [x] `mocha --watch` doesn't work properly with *mongoose*. &rarr;
    https://github.com/Automattic/mongoose/issues/1251
 - [x] apply `https` &rarr;
    https should be served via nginx proxy
    https://www.codementor.io/marcoscasagrande/installing-express-nginx-app-on-ubuntu-18-04-with-ssl-using-certbot-pdt44g5gs
 - [x] apply `scss`
 - [x] apply `eslint` & `prettier` for frontend(react)
 - [x] apply `jwt` & cookie auth model
 - [x] apply `eslint` & `prettier` for backend
 - [x] apply `typescript`(or ts type definition) &rarr; decided to substitute with `JSDOC`
 - [x] api separation

## unsolved, next milestones
 - [ ] doesn't properly compile on personal windows machine; fails on reading JSX. working fine on Mac
 - [ ] replace `scss` with better substitute - it breaks easily on different environment
 - [ ] full graphql adoption
 - [ ] full typescript adoption

## file structure
use `tree --dirsfirst -I 'node_modules|build|.git|yarn.lock|yarn-error.log|readme.md|.next|*.scss|.DS_Store' -L 2 -a -d` to refresh this list
```.
├── api # --- express.js api
│   ├── src
│   └── test
├── shared # utils both shared by api and www --- must maintain full backward compatibility
└── www # --- next.js
    ├── actions
    ├── components
    ├── pages
    ├── reducers
    ├── server
    ├── static
    ├── styles # common styles
    ├── test
    └── utils
```

## addendum
 - https://github.com/zeit/next.js/tree/canary/examples
 - https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html
 - https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html