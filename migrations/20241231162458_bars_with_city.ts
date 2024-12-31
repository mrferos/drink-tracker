import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("bars", table => {
        table.text("city")
        table.text("state")
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("bars", table => {
        table.dropColumn("city")
        table.dropColumn("state")
    })
}

