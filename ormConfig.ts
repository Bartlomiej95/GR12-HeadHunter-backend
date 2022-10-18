export const databaseConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'head_hunt',
    entities: ['dist/**/**.entity{.ts,.js}'],
    bigNumberStrings: false,
    logging: false,
    synchronize: true,
    migrations: ['dist/migration/*.js'],
}