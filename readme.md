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

app.listen(3000, () => {
  console.log('server is ready.')
})
```

## 3 - Build typescript and run

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
npm run start
```


