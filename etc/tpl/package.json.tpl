{
  "name": "jsc-property-finder",
  "private": false,
  "license": "MIT",
  "version": "0.0.0",
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc --build tsconfig.build.json",
    "test": "jest",
    "lint": "eslint .",
    "pretty": "prettier --write ."
  }
}
