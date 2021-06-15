# @pacely/vatsearch

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> Search for company records in all Nordic countries ⚡️

- [✨ &nbsp;Release Notes](https://github.com/pacelyapp/vatsearch/releases)

## Features

- 👌&nbsp; Search for all companies in Norway, Denmark, Sweden and Finland
- ⚡&nbsp; Get opinionated Risk Analysis on all companies 

## Quick Setup

Add `@pacely/vatsearch` dependency to your project

```bash
# Using npm
npm install @pacely/vatsearch

# Using yarn
yarn add @pacely/vatsearch
```

## Usage

```typescript
// Initialize the parser
const parser: ParserInterface = new VatSearch().getParser('NO') // NO, SE, DK, FI

// Get all companies (Only available for NO)
parser.all().then((response: Company[]) => {
    console.log(response)
})

// Search for a company by name
parser.find('Hirvi AS').then((response: Company[]) => {
    console.log(response)
})

// Get a single company by VATID/Organization identifier
parser.get(10150817).then((response: Company) => {
    console.log(response)
})
```

[npm-version-src]: https://img.shields.io/npm/v/@pacely/vatsearch/latest.svg
[npm-version-href]: https://npmjs.com/package/@pacely/vatsearch

[npm-downloads-src]: https://img.shields.io/npm/dt/@pacely/vatsearch.svg
[npm-downloads-href]: https://npmjs.com/package/@pacely/vatsearch

[license-src]: https://img.shields.io/npm/l/@pacely/vatsearch.svg
[license-href]: https://npmjs.com/package/@pacely/vatsearch
