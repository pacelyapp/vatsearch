import VatSearch from '../src'
import { VatRegister } from '../src/interfaces/config'
import { ParserInterface } from '../src/interfaces/parser'

describe('testing results', () => {
    let fetcher: ParserInterface

    beforeEach(() => {
        fetcher = new VatSearch({
            register: VatRegister.NO
        }).parser()
    })

    it('finds the correct company based on Vat ID', async () => {
        expect.assertions(1)
        const data = await fetcher.get(996223698)

        expect(data).toMatchObject({
            name: 'HIRVI AS'
        })
    })

    it('responds with the correct object structure', async () => {
        expect.assertions(1)
        const data = await fetcher.get(996223698)

        expect(data).toEqual(expect.objectContaining({
            vatid: expect.any(String),
            name: expect.any(String),
            dateStarted: expect.any(String),
            employees: expect.any(Number),
            companyType: expect.any(String),
            address: {
                address: expect.any(String),
                zip: expect.any(String),
                place: expect.any(String),
                municipal: expect.any(String),
                country: expect.any(String)
            },
            website: expect.any(String),
            contact: expect.any(String),
            bankrupt: expect.any(Boolean),
            risk: expect.any(Object)
        }))
    })
})
