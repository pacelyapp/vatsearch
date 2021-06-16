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
import VatSearch, { VatRegister, Company } from "@pacely/vatsearch";

// Initialize the parser
const vatsearch = new VatSearch({ register: VatRegister.NO }).parser()

// Get all companies (Only available for NO)
vatsearch.all().then((response: Company[]) => {
    console.log(response)
})

// Search for a company by name
vatsearch.find('Hirvi AS').then((response: Company[]) => {
    console.log(response)
})

// Get a single company by VATID/Organization identifier
vatsearch.get(10150817).then((response: Company) => {
    console.log(response)
})
```

## Response

The response object contains the following and is the same for all registers

```typescript
interface Company {
    vatid: string | number;
    name: string;
    dateStarted: string;
    employees: number | string;
    companyType: string;
    address: CompanyAddress;
    website: string;
    bankrupt: boolean | string | 'not_available';
    contact: CompanyContact | string | 'not_available';
    risk: RiskAnalyses;
    [x: string]: any;
}

interface CompanyAddress {
    address: string;
    zip: number;
    place: string;
    municipal?: string;
    country: string;
}

interface CompanyContact {
    phone?: string | number;
    email?: string;
    fax?: string | number;
}

interface RiskAnalyses {
    score: number
    risks: {
        [x: string]: any;
    }[]
    info: string
}
```

## Configuration

This package takes a single configuration while initializing. 
The `register` flag tells it what API to use for your request.

```typescript
const vatsearch = new VatSearch({
    register: 'NO' // NO, DK, SV, FI
})
```

You can change the configuration afterwards by doing `vatsearch.setOptions(options)`.

## License

[MIT License](./LICENSE)

Copyright (c) HIRVI AS

[npm-version-src]: https://img.shields.io/npm/v/@pacely/vatsearch/latest.svg
[npm-version-href]: https://npmjs.com/package/@pacely/vatsearch

[npm-downloads-src]: https://img.shields.io/npm/dt/@pacely/vatsearch.svg
[npm-downloads-href]: https://npmjs.com/package/@pacely/vatsearch

[license-src]: https://img.shields.io/npm/l/@pacely/vatsearch.svg
[license-href]: https://npmjs.com/package/@pacely/vatsearch
