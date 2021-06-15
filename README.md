# @pacely/vatsearch

[![npm version][npm-version-src]][npm-version-href]

/* parse.find('Hirvi AS').then((response: Company | Company[]) => {
    console.log(response)
}) */
/* parse.get(10150817).then((response: Company) => {
    console.log(response)
}) */
parse.find('Lego').then((response: Company[]) => {
    console.log(response)
})

parse.get('3020830-4').then((response: Company) => {
    console.log(response)
})

[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/html-validator/latest.svg
[npm-version-href]: https://npmjs.com/package/@nuxtjs/html-validator
