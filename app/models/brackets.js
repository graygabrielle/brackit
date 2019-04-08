module.exports = function(sequelize, DataTypes) {
    let Bracket = sequelize.define("Bracket", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    })

    Bracket.associate = function(models) {
        Bracket.hasMany(models.User, {
            onDelete: "cascade"
        });
        
        Bracket.hasMany(models.Candidate, {
            onDelete: "cascade"
        })
    }

    return Bracket;
}