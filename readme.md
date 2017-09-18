# Typescript app deployment against AWS EB

## 0 - Install EB CLI

To manipulate Elasticbeanstalk, we need to use EB CLI, written in Python. We install this with PIP.

```sh
pip install awsebcli --upgrade --user
```

> If you don't have Python, you can download from https://www.python.org/. Any version above v2.7 or v3.4 should work.
>
> Also, you have to install `pip`. Check this link too. https://pypi.python.org/pypi/pip/

## 1 - Prepare package

### `package.json`

```sh
# Generate package.json
npm init -y

# Install dependencies
npm i -D typescript @types/node @types/express
npm i express
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "rootDir": "src",
    "outDir": "build"
  }
}
```

## 2 - Create App

`src/index.ts`

```ts
import express = require('express')

const app = express()

app.use((req, res) => {
  res.send('hi')
})

app.listen(process.env.PORT, () => {
  console.log('server is ready.')
})
```

## 3 - Build typescript and check

Add `build` and `start` scripts to `package.json`.

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node build/index.js"
  }
}
```

Compile and run our app with the scripts

```sh
# Compile typescript
npm run build

# Run with compiled javascript
PORT=3000 npm run start
```

Check our app actually working at http://localhost:3000

### 4 - Prepare Artifact

`scripts/dist.sh`

```sh
# If the directory, `dist`, doesn't exist, create `dist`
stat dist || mkdir dist
# Archive artifacts
zip dist/$npm_package_name.zip -r build package.json package-lock.json
```

Add `dist` script

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node build/index.js",
    "dist": "sh ./scripts/dist.sh"
  }
}
```

### 5 - Deploy app

```sh
# Initialize app to EB
eb init

# Initialize environment
eb create
```

Add 2 lines below to `.elasticbeanstalk/config.yml`.

```yml
deploy:
  artifact: dist/aws-eb-typescript-app.zip
```

Deploy again

```sh
eb deploy --staged
```
