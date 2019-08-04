# Portfolio /w Next.js(React-redux) + MongoDB
- author sungryeol park(sungryeolp@gmail.com)
- used tech stack: React + Next.js(Client) + Vue.js(Admin) + Express + Mongoose + Mocha + Jest + Redux(Redux-thunk) + passport.js + PostCSS + eslint + stylelint + PWA
- design process: Adobe Photoshop + Figma

## Commands
### initialize & register admin to db
```bash
# mongodb should be running background first
# api/
yarn install
yarn setup
# www/
yarn install
```

### in case of changing lint setup
```bash
yarn lint:init
```

### test run & analyzation
```bash
# for both www, api, admin
yarn dev
# only for www
yarn analyze
yarn analyze:server # only for server
yarn analyze:browser # only for browser
```

### production deployment
```bash
# for both www, api
yarn build
yarn start
# for admin
yarn build:prod
# admin doesn't have server. use nginx to serve.
# docker part is still in progress
```

### mocha test for api server
```bash
# only for api
yarn test:watch --grep ${targetString}
# or
yarn test:grep ${targetString}
```

as there is *ServiceWorker* working on background,
> cache TTL/max-age should be set to 0

for displaying lint message in vscode,
> must install vscode extensions for eslint & stylelint

## solved & ongoing issues
 - [x] `jest` doesn't work properly with `mongoose` testing &rarr; replaced with `mocha`
 - [x] `mocha --watch` doesn't work properly with `mongoose`. &rarr; [reference link](https://github.com/Automattic/mongoose/issues/1251)
 - [x] apply `https` &rarr;https should be served via nginx proxy &rarr; [reference link](https://www.codementor.io/marcoscasagrande/installing-express-nginx-app-on-ubuntu-18-04-with-ssl-using-certbot-pdt44g5gs)
 - [x] apply `scss`
 - [x] apply `eslint` & `prettier` for frontend(react)
 - [x] apply `jwt` & cookie auth model
 - [x] apply `eslint` & `prettier` for backend
 - [x] apply `typescript`(or ts type definition) &rarr; decided to substitute with `JSDOC`
 - [x] api separation
 - [x] doesn't properly compile on personal windows machine;fails on reading `JSX`. working fine on Mac; replaced `SASS` module with `PostCSS`
 - [x] ~~replace `scss` with better substitute: it breaks easily on different environment~~
 - [x] ~~full `graphql` adoption~~: overhead is too big
 - [x] ~~full `typescript` adoption~~: `typescript` is not appropriate for quick inidivual development. Instead, partially adopted *typescript definition files* &rarr; [reference link](https://medium.com/javascript-scene/the-typescript-tax-132ff4cb175b)
 - [ ] should be served via `Docker` - check server disk limit first
 - [ ] PWA optimization

## file structure
use `tree --dirsfirst -I 'node_modules|build|.git|yarn.lock|yarn-error.log|readme.md|.next|*.scss|.DS_Store' -L 2 -a -d` to refresh this list
```.
├── .vscode
├── admin-vue
│   ├── mock
│   ├── public
│   ├── src
│   └── tests
├── api
│   ├── src
│   └── test
└── www-v2
    ├── .storybook
    ├── api
    ├── components
    ├── lib
    ├── pages
    ├── static
    ├── store
    ├── stories
    └── styles
```

## addendum
 - https://github.com/zeit/next.js/tree/canary/examples
 - https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html
 - https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html