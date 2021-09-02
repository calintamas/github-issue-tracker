# github-issue-tracker

React Native app that helps tracking Github issues.

1. [Local setup](#local-setup)
1. [Configs](#configs)
1. [Workflows](#workflows)

## Local setup

### 0. Set up the React Native environment

To set up your local environment, first you need to follow the React Native environment setup guide - [Setting up the development environment](https://reactnative.dev/docs/environment-setup).

Make sure to select the "React Native CLI Quickstart".

### 1. Install npm packages

```sh
yarn
```

### 2. Install Cocoapods

Follow the [Cocoapods - Getting Started](https://guides.cocoapods.org/using/getting-started.html) guide. Cocoapods is used to manage native iOS dependencies.

### 3. Install Pods

```sh
cd ios && pod install
```

### 4. Run

```sh
yarn ios
## or
yarn android
```

## Configs

### pre-commit hook

Pre-commit hook with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged), to run `lint` checks and `prettier` before commit.

It can be configured in `package.json`, under the `lint-staged` key.

### prettier

Automatic code formatting using [prettier](https://prettier.io/). Config can be found in `.prettierrc.js`.

### eslint

Using [eslint-config-backpacker-react](https://github.com/backpacker/eslint-config-react).

### jest

Unit testing with [jest](https://jestjs.io/docs/en/getting-started) as test runner.

## Workflows

Lint checks and tests are run on every push using [Github Actions](https://github.com/calintamas/github-issue-tracker/actions).
