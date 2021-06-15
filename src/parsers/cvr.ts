import { URLSearchParams } from 'url'
import { ParserInterface, ParserSettings } from '../interfaces/parser'
import { Company, RiskAnalyses } from '../interfaces/company'

const fetch = require('node-fetch')

export default class Cvr implements ParserInterface {
    public settings: ParserSettings = {
        documentation: 'https://cvrapi.dk/documentation',
        endpoints: {
            search: 'https://cvrapi.dk/api'
        }
    }

    all (): Promise<Company[]> {
        return Promise.reject(new Error('Not implemented'))
    }

    find (query: string | number, additionalParams?: Record<string, any>): Promise<Company[]> {
        const queryParams: URLSearchParams = new URLSearchParams({
            ...additionalParams,
            country: 'dk',
            name: query as string
        })

        return fetch(`${this.settings.endpoints.search}?${queryParams}`)
            .then((response: Response) => response.json())
            .then((response: Record<string, any>) => {
                return Promise.resolve(this.parse([response]))
            })
            .catch((error: Error) => {
                return Promise.reject(error)
            })
    }

    get (vatId: string | number): Promise<Company> {
        const queryParams: URLSearchParams = new URLSearchParams({
            country: 'dk',
            vat: vatId as string
        })

        return fetch(`${this.settings.endpoints.search}?${queryParams}`)
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
            vatid: data.vat,
            name: data.name,
            dateStarted: data.startdate,
            employees: data.employees,
            companyType: data.companydesc,
            address: {
                address: data.address,
                zip: data.zipcode,
                place: data.city,
                country: 'dk'
            },
            website: 'not_available',
            contact: {
                phone: data.phone,
                email: data.email
            },
            bankrupt: data.creditbankrupt,
            risk: this.risk(data)
        } as Company
    }

    risk (data: Record<string, any>): RiskAnalyses {
        const risks = []
        let score = 0
        if (data.creditbankrupt) {
            risks.push({ bankrupt: 10 })
            score = 10
        }
        return {
            score,
            risks,
            info: 'Lower score is better.'
        }
    }
}
