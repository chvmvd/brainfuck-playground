# Brainfuck Playground

[![React](https://img.shields.io/badge/React-555.svg?logo=react)](https://ja.reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/ja/)
[![Vite](https://img.shields.io/badge/Vite-1e1e20.svg?logo=vite)](https://ja.vitejs.dev/)
[![Build and Deploy](https://github.com/chvmvd/brainfuck-playground/actions/workflows/deploy.yml/badge.svg)](https://github.com/chvmvd/brainfuck-playground/actions/workflows/deploy.yml)
[![Prettier](https://github.com/chvmvd/brainfuck-playground/actions/workflows/prettier.yml/badge.svg)](https://github.com/chvmvd/brainfuck-playground/actions/workflows/prettier.yml)
[![ESLint](https://github.com/chvmvd/brainfuck-playground/actions/workflows/eslint.yml/badge.svg)](https://github.com/chvmvd/brainfuck-playground/actions/workflows/eslint.yml)
![LICENSE](https://img.shields.io/badge/license-MIT-informational.svg)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

[English README is here.](README.md)

これは、Brainfuck のプレイグラウンドです。

## 目次

- [概要](#概要)
- [使い方](#使い方)
- [開発](#開発)
  - [要件](#要件)
  - [環境構築](#環境構築)
  - [開発用サーバーの起動](#開発用サーバーの起動)
- [ライセンス](#ライセンス)
- [貢献](#貢献)

## 概要

これは、Brainfuck のプレイグラウンドです。

## 使い方

[このリンク](https://chvmvd.github.io/brainfuck-playground/)にアクセスすることで使うことができます。

Brainfuck による Hello World! は次のようになります。

```brainfuck
++++++++++
[>+++++++>++++++++++>+++>++++++++><<<<<-]
>++.>+.+++++++..+++.>++.
>+++++++.<<.+++.------.--------.>+.
```

## 開発

### 要件

- [Node.js](https://nodejs.org/ja/)
- [npm](https://www.npmjs.com/)

### 環境構築

```shell
npm ci
```

## 開発用サーバーの起動

```shell
npm run dev
```

上記のコマンドを実行した後、[http://localhost:5173/](http://localhost:5173/) にアクセスしてください。

## ライセンス

Brainfuck Playground は [MIT](https://opensource.org/licenses/MIT) ライセンスのもとで公開されています。
Copyright © 2023 WATAHIKI Yuto.

## 貢献

Issue や PR などはいつでも歓迎します。
