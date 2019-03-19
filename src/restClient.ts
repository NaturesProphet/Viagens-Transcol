import * as request from 'request-promise';
const endpoint: string = 'https://api.es.gov.br/dev/transcol/viagens';


export async function get (): Promise<any> {

    const options = {
        uri: endpoint,
        headers: {
            'User-Agent': 'Request-Promise',
        },
        json: true
    }
    return await request.get( options );
}
