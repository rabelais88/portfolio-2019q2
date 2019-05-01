# Portfolio /w Next.js(React-redux) + MongoDB
- author sungryeol park(sungryeolp@gmail.com)
- used tech stack: Next.js + Express + Mongoose + Mocha(TDD) + Redux + JWT + Cookie + SCSS

## Commands
initialize & register admin to db
```bash
yarn install
yarn setup
```
mongodb daemon(must be installed) + next.js dev env (all in one)
```bash
yarn dev:all
```
just next.js dev env
```bash
yarn dev
```
actual run
```bash
yarn build
yarn start
```
analyze size
```bash
yarn analyze
yarn analyze:server # only for server
yarn analyze:browser # only for browser
```
in case of changing lint setup
```bash
yarn lint:init
```


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

## unsolved, next milestones
 - [ ] doesn't properly compile on personal windows machine; fails on reading JSX. working fine on Mac
 - [ ] replace `scss` with better substitute - it breaks easily on different environment

## file structure
use `tree --dirsfirst -I 'node_modules|build|.git|yarn.lock|yarn-error.log|readme.md|.next|*.scss' -L 2 -a` to refresh this list
```.
├── actions
│   └── user.js # --- redux action
├── components
│   ├── createPost.js
│   ├── editIndex.js
│   ├── editStack.js
│   ├── go.js # ---- customized link component
│   └── menu.js # ---- nav menu
├── models
│   ├── Admin.js
│   ├── Info.js
│   ├── Post.js
│   └── User.js
├── pages # ---- any react components here are accessible by /${componentname}
│   ├── _app.js # ---- next.js root instance 
│   └── _document.js # ---- next.js root instance for DOM parents(body & title & 
├── reducers
│   ├── store.js # --- combined redux store
│   ├── user.js # --- state.user
│   └── with-redux-store.js # --- attaches redux devtool to store + compatibility for Next.js
├── server
│   ├── controllers # --- middlewares
│   ├── index.js # --- server root
│   └── typedefs.js # --- JSDOC global type definitions
├── static # ---- any assets here are accessible by /static
├── styles # ---- common .scss styles
├── test
│   ├── index.test.js
│   ├── mocha.opts # --- mocha arguments
│   └── mongoose.test.js # --- testing db
├── utils
│   └── auth.js # --- middleware for Next.js page
├── .babelrc
├── .env
├── .env-sample
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── mocha.setup.js
├── next.config.js
├── nodemon.json
├── package.json
├── setup.js # --- setup file for registering admin
└── start.js # --- a wrapper. transpiles & run ./server/index.js
```

## addendum
 - https://github.com/zeit/next.js/tree/canary/examples
 - https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html
 - https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html