export const databaseConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'Head_hunt',
    entities: ['dist/**/**.entity{.ts,.js}'],
    bigNumberStrings: false,
    logging: true,
    synchronize: true,
    migrations: ['dist/migration/*.js'],
}

// entities don't work -> solution: https://stackoverflow.com/questions/59435293/typeorm-entity-in-nestjs-cannot-use-import-statement-outside-a-module
// I changed like above
// before was
// entities: ['**/**.entity{.ts,.js}'],
