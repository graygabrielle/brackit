module.exports = function(sequelize, DataTypes) {
    const Bracket = sequelize.define("Bracket", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        numberCandidates: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    })

    Bracket.associate = function(models) {

        Bracket.belongsTo(models.Admin, {
            foreignKey: {
              allowNull: false
            }
          });


        Bracket.hasMany(models.User, {
            onDelete: "cascade"
        });
        
        Bracket.hasMany(models.Candidate, {
            onDelete: "cascade"
        })
    }

    return Bracket;
}