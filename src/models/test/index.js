const {
    Sequelize,
    Model,
    DataTypes
} = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:');

export default class Test extends Model {}

Test.init({
    name: DataTypes.STRING,
    body: DataTypes.JSON,
}, {
    sequelize,
    modelName: 'test'
});

(async () => {
    await sequelize.sync();
})();