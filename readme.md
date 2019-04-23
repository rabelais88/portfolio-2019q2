# Latest Next.js + Express + Mongoose + Mocha

@author sungryeol park(sungryeolp@gmail.com)

## solved & ongoing issues
 - [x] *jest* doesn't work properly with mongoose testing -> replaced with *mocha*
 - [x] `mocha --watch` doesn't work properly with *mongoose*.
    https://github.com/Automattic/mongoose/issues/1251
 - [x] apply https
    https should be served via nginx proxy
    https://www.codementor.io/marcoscasagrande/installing-express-nginx-app-on-ubuntu-18-04-with-ssl-using-certbot-pdt44g5gs
 - [x] apply scss
 - [x] apply eslint & prettier for frontend(react)
 - [x] apply jwt & cookie auth model
 - [ ] apply eslint & prettier for backend
 - [ ] doesn't properly compile on personal windows machine; fails on reading JSX. working fine on Mac
 - [ ] apply typescript(or ts type definition)

## file structure
use `tree --dirsfirst -I 'node_modules|build|.git|yarn.lock|yarn-error.log|readme.md|.next|*.scss' -L 2 -a` to refresh this list
```.
├── components
│   ├── go.js # ---- customized link menu
│   └── menu.js # ---- nav menu
├── models
│   └── User.js # ---- sample user mongo model
├── pages # ---- any react components here are accessible by /${componentname}
│   ├── _app.js # ---- next.js root instance 
│   └── _document.js # ---- next.js root instance for DOM parents(body & title & document)
├── server
│   ├── controllers # ---- server controllers
│   └── index.js # ---- express.js root
├── static # ---- any assets here are accessible by /static
│   └── nprogress.css
├── styles
├── test
│   ├── index.test.js
│   ├── mocha.opts # ----- mocha.js argument
│   └── mongoose.test.js
├── utils
│   └── auth.js
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
└── package.json
```

## build and running docker image
```bash
$ docker build -t app .
$ docker run --rm -it -p 3000:3000 -e "PORT=3000" --env-file=.env app
```

## addendum
 - https://github.com/zeit/next.js/tree/canary/examples