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
 - [ ] doesn't properly compile on personal windows machine; fails on reading JSX. working fine on Mac
 - [ ] apply jwt & cookie auth model
 - [ ] apply eslint & prettier
 - [ ] apply typescript(or ts type definition)

## file system
use `tree --dirsfirst -I 'node_modules|build|.git|yarn.lock|readme.md' -L 2 -a` to refresh this list
```.
├── models
│   └── User.js
├── pages
│   └── index.js
├── server
│   └── index.js
├── static # ------ static files served
├── styles
│   └── test.scss
├── test
│   ├── index.test.js
│   ├── mocha.opts # ------ mocha arguments
│   └── mongoose.test.js
├── .babelrc
├── .env # ------ server arguments
├── .env-sample # ------ server arguments sample
├── .gitignore
├── mocha.setup.js
├── next.config.js
├── nodemon.json
└── package.json
```

## addendum
 - https://github.com/zeit/next.js/tree/canary/examples