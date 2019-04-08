module.exports = function(sequelize, DataTypes) {
    const Matchup = sequelize.define("Matchup", {
        roundNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        matchup: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    Matchup.associate = function(models) {

        Matchup.belongsTo(models.Candidate, {
            foreignKey: {
              allowNull: false
            }
          });
    }

    return Matchup;
}