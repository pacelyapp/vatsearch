import * as parser from './parsers'
import { ParserInterface, VatSearchOptions } from './interfaces'

export default class VatSearch {
    options: VatSearchOptions

    constructor (options: VatSearchOptions) {
        this.options = options
    }

    parser (options?: VatSearchOptions): ParserInterface {
        if (options) {
            this.options = {
                ...this.options,
                ...options
            }
        }

        return new parser[this.options.register]() as ParserInterface
    }

    setOptions (options: VatSearchOptions): void {
        this.options = {
            ...this.options,
            ...options
        }
    }
}
