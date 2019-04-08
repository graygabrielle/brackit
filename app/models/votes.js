module.exports = function (sequelize, DataTypes) {
    let Vote = sequelize.define("Vote", {
        roundNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Vote: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    Vote.associate = function (models) {

        Vote.belongsTo(models.Candidate, {
            foreignKey: {
                allowNull: false
            }
        });

        Vote.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Vote;
}