# eurowings

## Note:
I assume that you already have installed the following packages before setting up the project
- node v15.14.0 (minimum requirement is v14.*)
- vue and vue-cli installed globally

## development environment

- Run `npm install`
- for development envronment create an application on imgur with the callback url ```http://127.0.0.1:8080/login```
- copy the cleintId and client secret in ```.env``` file in the project root directory
  - VUE_APP_IMGUR_CLIENT_ID_DEV
  - VUE_APP_IMGUR_CLIENT_SECRET_DEV
- execute ```npm run serve``` to run the Vue app in development mode
- navigate to ```http://127.0.0.1:8080```
- Click on `Login` link, authenticate via imgur oauth2 api
- Navigate to `Gallery` page and you will see the images with the filter

## production environment
- Run `npm install`
- Run `npm run build`
- for development envronment create an application on imgur with the callback url ```http://{IP_ADDR/HOSTNAME}:8080/login```
- copy the cleintId and client secret in ```.env``` file in the project root directory
  - VUE_APP_IMGUR_CLIENT_ID_PROD
  - VUE_APP_IMGUR_CLIENT_SECRET_PROD
- run `npm install -g serve`
- run `serve -s dist`
- navigate to ```http://{IP_ADDR/HOSTNAME}:8080```
- Click on `Login` link, authenticate via imgur oauth2 api
- Navigate to `Gallery` page and you will see the images with the filter


### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
