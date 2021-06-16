export function queryString (object: Record<string, any>): string {
    return Object.keys(object).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(object[key])
    }).join('&')
}
