export interface CompanyAddress {
    address: string;
    zip: number;
    place: string;
    municipal?: string;
    country: string;
}

export interface CompanyContact {
    phone?: string | number;
    email?: string;
    fax?: string | number;
}

export interface RiskAnalyses {
    score: number
    risks: {
        [x: string]: any;
    }[]
    info: string
}

export interface Company {
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
