# Viagens diárias dos ônibus do Transcol

Serviço simples que busca as informações de viagens cadastradas para o dia em um endpoint rest e salva os dados em um banco de dados SQL-Server

## Configuração do ambiente

```bash
DB_HOST             # endereço do banco
DB_PORT             # porta do banco
DB_USER             # usuario do banco
DB_PASSWORD         # senha do banco
DB_SCHEMA           # nome do banco
ORM_SYNC            # boolean para gerar automaticamente a tabela
ORM_LOGGING         # boolean para definir o logging
```

## Executando
Suba um banco qualquer num SQL-Server e passe as configurações dele nas variáveis de ambiente acima.  
Opcionalmente, você pode usar o banco em Docker pré configurado que está no script do package.json do projeto.
```
npm run mssql:test
```
ao usar esse script, não é necessário passar nenhuma das configurações de ambiente acima.

Após configurar o banco, é só startar:
```
npm start
```
