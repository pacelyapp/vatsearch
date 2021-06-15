import * as parser from './parsers'
import { ParserInterface } from './interfaces/parser'
import { Company } from './interfaces/company'

export default class VatSearch {
    getParser (lang: string): ParserInterface {
        if (!lang) { lang = 'NO' }

        lang = lang.toUpperCase()

        const map: Record<string, any> = {
            NO: parser.Brreg,
            NB: parser.Brreg,
            DK: parser.Cvr,
            DA: parser.Cvr,
            FI: parser.Ytj,
            SE: parser.Ytj,
            SV: parser.Ytj
        }

        return new map[lang]() as ParserInterface
    }
}

const parse: ParserInterface = new VatSearch().getParser('FI')
