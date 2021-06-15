import { Company, RiskAnalyses } from './company'

export interface ParserInterface {
    /** Parser settings */
    settings: ParserSettings

    /** Get all units */
    all(): Promise<Company[]>

    /** Get single Unit  */
    get(vatId: string | number): Promise<Company>

    /** Find by name */
    find(query: string | number, additionalParams?: Record<string, any>): Promise<Company[]>

    /** Parse data */
    parse(data: Record<string, any> | Record<string, any>[]): Company | Company[]

    /** Do a risk analyses */
    risk?(data: Record<string, any>): RiskAnalyses
}

export interface ParserSettings {
    documentation: string
    endpoints: {
        [x: string]: string;
    }
    nameEndpoint?: string
}
