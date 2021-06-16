export enum VatRegister {
    NO = 'Brreg',
    NB = 'Brreg',
    DK = 'Cvr',
    DA = 'Cvr',
    FI = 'Ytj',
    SV = 'Ytj',
    SE = 'Ytj',
}

export interface VatSearchOptions {
    register: VatRegister
}
