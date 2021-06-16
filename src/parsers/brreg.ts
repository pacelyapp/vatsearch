import { ParserInterface, ParserSettings, Company, RiskAnalyses } from '../interfaces'

import { queryString } from '../helpers'

const fetch = require('node-fetch')

export default class Brreg implements ParserInterface {
    public settings: ParserSettings = {
        documentation: 'https://data.brreg.no/enhetsregisteret/api/docs/index.html#enheter-sok',
        endpoints: {
            search: 'https://data.brreg.no/enhetsregisteret/api/enheter'
        }
    }

    all (): Promise<Company[]> {
        return fetch(this.settings.endpoints.search)
            .then((response: Response) => response.json())
            .then((response: Record<string, any>) => {
                return Promise.resolve(this.parse(response._embedded.enheter) as Company[])
            })
            .catch((error: Error) => {
                return Promise.reject(error)
            })
    }

    find (query: string | number, additionalParams?: Record<string, any>): Promise<Company[]> {
        const queryParams = queryString({
            ...additionalParams,
            navn: query as string
        })

        return fetch(`${this.settings.endpoints.search}?${queryParams}`)
            .then((response: Response) => response.json())
            .then((response: Record<string, any>) => {
                return Promise.resolve(this.parse(response._embedded.enheter))
            })
            .catch((error: Error) => {
                return Promise.reject(error)
            })
    }

    get (vatId: string | number): Promise<Company> {
        return fetch(`${this.settings.endpoints.search}/${vatId}`)
            .then((response: Response) => response.json())
            .then((response: Record<string, any>) => {
                return Promise.resolve(this.parse(response) as Company)
            })
            .catch((error: Error) => {
                return Promise.reject(error)
            })
    }

    parse (data: Record<string, any> | Record<string, any>[]): Company | Company[] {
        if (Array.isArray(data)) {
            return data!.map((record: Record<string, any>) => {
                return this.parse(record as Record<string, any>) as Company
            })
        }

        return {
            vatid: data.organisasjonsnummer,
            name: data.navn,
            dateStarted: data.stiftelsesdato,
            employees: data.antallAnsatte,
            companyType: data.organisasjonsform.beskrivelse,
            address: {
                address: data.forretningsadresse.adresse.length > 0 ? data.forretningsadresse.adresse[0] : '',
                zip: data.forretningsadresse.postnummer,
                place: data.forretningsadresse.poststed,
                municipal: data.forretningsadresse.kommune,
                country: data.forretningsadresse.land
            },
            website: data.hjemmeside || '',
            contact: 'not_available',
            bankrupt: data.konkurs,
            risk: this.risk(data)
        } as Company
    }

    risk (data: Record<string, any>): RiskAnalyses {
        let risks = []
        let score = 0
        if (!data.registrertIMvaregisteret) {
            risks.push({ not_mva_registered: 1 })
            score++
        }
        if (!data.registrertIForetaksregisteret) {
            risks.push({ not_commercially_registered: 1 })
            score++
        }
        if (data.underAvvikling) {
            risks.push({ liquidating: 3 })
            score += 3
        }
        if (data.konkurs) {
            risks = []
            risks.push({ bankrupt: 10 })
            score = 10
        }
        if (data.underTvangsavviklingEllerTvangsopplosning) {
            risks = []
            risks.push({ forced_bankruptcy: 10 })
            score = 10
        }
        return {
            score,
            risks,
            info: 'Lower score is better.'
        }
    }
}
