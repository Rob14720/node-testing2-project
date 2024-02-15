/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable("dogs", tbl => {
            tbl.increments("dog_id");
            tbl.text("dog_name").notNullable()
            tbl.text("dog_breed").notNullable()
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("dogs")
};
