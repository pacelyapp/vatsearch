import { ParserInterface, ParserSettings, Company, RiskAnalyses } from '../interfaces'
import { queryString } from '../helpers'

const fetch = require('node-fetch')

export default class Ytj implements ParserInterface {
    public settings: ParserSettings = {
        documentation: 'http://avoindata.prh.fi/tr_en.html',
        endpoints: {
            search: 'http://avoindata.prh.fi/tr/v1/',
            single: 'http://avoindata.prh.fi/bis/v1/'
        }
    }

    all (): Promise<Company[]> {
        return Promise.reject(new Error('Not implemented'))
    }

    find (query: string | number, additionalParams?: Record<string, any>): Promise<Company[]> {
        const queryParams = queryString({
            ...additionalParams,
            name: query as string
        })

        return fetch(`${this.settings.endpoints.search}?${queryParams}`)
            .then((response: Response) => response.json())
            .then((response: Record<string, any>) => {
                return Promise.resolve(this.parse(response.results))
            })
            .catch((error: Error) => {
                return Promise.reject(error)
            })
    }

    get (vatId: string | number): Promise<Company> {
        return fetch(`${this.settings.endpoints.single}/${vatId}`)
            .then((response: Response) => response.json())
            .then((response: Record<string, any>) => {
                return Promise.resolve(this.parse(response.results[0]) as Company)
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
            vatid: data.businessId,
            name: data.name,
            dateStarted: data.registrationDate,
            employees: 'not_available',
            companyType: data.companyForm,
            address: {
                address: (data.addresses && data.addresses.length > 0) ? data.addresses[0].street : 'not_available',
                zip: (data.addresses && data.addresses.length > 0) ? data.addresses[0].postCode : 'not_available',
                place: (data.addresses && data.addresses.length > 0) ? data.addresses[0].city : 'not_available',
                country: (data.addresses && data.addresses.length > 0) ? data.addresses[0].language : 'not_available'
            },
            website: 'not_available',
            contact: 'not_available',
            bankrupt: 'not_available',
            risk: this.risk(data)
        } as Company
    }

    risk (_data: Record<string, any>): RiskAnalyses {
        const risks = [] as any[]
        const score = 0
        return {
            score,
            risks,
            info: 'Lower score is better.'
        }
    }
}
