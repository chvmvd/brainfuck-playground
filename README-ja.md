# Brainfuck Playground

[![React](https://img.shields.io/badge/React-555.svg?logo=react)](https://github.com/facebook/react)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg?logo=typescript&logoColor=white)](https://github.com/microsoft/TypeScript)
[![Vite](https://img.shields.io/badge/Vite-1e1e20.svg?logo=vite)](https://github.com/vitejs/vite)
[![Build and Deploy](https://github.com/chvmvd/brainfuck-playground/actions/workflows/deploy.yml/badge.svg)](https://github.com/chvmvd/brainfuck-playground/actions/workflows/deploy.yml)
[![Prettier](https://github.com/chvmvd/brainfuck-playground/actions/workflows/prettier.yml/badge.svg)](https://github.com/chvmvd/brainfuck-playground/actions/workflows/prettier.yml)
[![ESLint](https://github.com/chvmvd/brainfuck-playground/actions/workflows/eslint.yml/badge.svg)](https://github.com/chvmvd/brainfuck-playground/actions/workflows/eslint.yml)
![license](https://img.shields.io/badge/license-MIT-informational.svg)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

[English README is here.](README.md)

これは、Brainfuck のプレイグラウンドです。

https://user-images.githubusercontent.com/104971044/221588140-11b67237-b00f-485d-87ca-af3af5c37032.mp4

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

- [npm](https://github.com/npm/cli)

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

Brainfuck Playground は [MIT](LICENSE) ライセンスのもとで公開されています。

Copyright © 2023 WATAHIKI Yuto.

## 貢献

Issue や PR などはいつでも歓迎します。
