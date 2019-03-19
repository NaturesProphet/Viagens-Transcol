import "reflect-metadata";
import { createConnection, ConnectionOptions, Connection } from "typeorm";
import { Viagem } from "./models/viagem.model";
import { get } from './restClient'

const options: ConnectionOptions = {
    type: "mssql",
    host: String( process.env.DB_HOST ) || "localhost",
    port: Number( process.env.DB_PORT ) || 1433,
    username: String( process.env.DB_USER ) || "SA",
    password: String( process.env.DB_PASSWORD ) || "!SenhaDificil%",
    database: String( process.env.DB_SCHEMA ) || "tempdb",
    entities: [
        Viagem
    ],
    synchronize: Boolean( process.env.ORM_SYNC ) || true,
    logging: Boolean( process.env.ORM_LOGGING ) || false
};
let erros: number = 0;
let sucesso: number = 0;

export async function populate () {
    console.log( `Iniciando conexão o banco...` );
    let conn: Connection;
    try {
        conn = await createConnection( options );
        console.log( `Conectado ao banco!` );
    } catch ( err ) {
        console.log( err.message );
    }
    let viagens: any[];
    try {
        console.log( `Enviando requisição GET à api-ceturb...` );
        viagens = await get();
        console.log( `Resposta OK. Iniciando inserções...` );
        for ( let i = 0; i < viagens.length; i++ ) {
            let viagem: Viagem = new Viagem();
            viagem.acessibilidade = viagens[ i ].acessibilidade;
            viagem.dataAgendada = viagens[ i ].dataAgendada;
            viagem.dataChegadaEstimada = viagens[ i ].dataChegadaEstimada;
            viagem.itinerarioId = viagens[ i ].itinerarioId;
            viagem.linhaId = viagens[ i ].linhaId;
            viagem.veiculo = viagens[ i ].veiculo;
            try {
                await conn.manager.save( viagem );
                sucesso++;
            } catch ( error ) {
                erros++
            }
        }
        console.log( `Viagens do dia salvas com sucesso no banco. 
        Sucesso: ${sucesso}
        Erros de inconsistência da Geocontrol: ${erros}` );
    } catch ( error ) {
        console.log( error.message );
    }
    console.log( `Fechando a conexão com o banco e saindo...` );
    conn.close();
    console.log( `Processo de carga concluído!` );
}
