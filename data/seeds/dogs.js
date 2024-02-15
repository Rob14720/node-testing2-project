exports.seed = function(knex) {
    return knex('dogs').truncate()
        .then(function() {
            return knex('dogs').insert([
                {dog_name: 'Bullet', dog_breed: 'Malimute'},
                {dog_name: 'Caska', dog_breed: 'Husky'},
                {dog_name: 'Jinx', dog_breed: 'Pitbull'},
            ]);
        });
};