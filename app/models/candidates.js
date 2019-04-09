module.exports = function(sequelize, DataTypes) {
    const Candidate = sequelize.define("Candidate", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    })

    Candidate.associate = function(models) {

        Candidate.belongsTo(models.Bracket, {
            foreignKey: {
              allowNull: false
            }
          });

        Candidate.hasMany(models.Vote, {
            onDelete: "cascade"
        });
        
        Candidate.hasMany(models.Matchup, {
            onDelete: "cascade"
        })
    }

    return Candidate;
}