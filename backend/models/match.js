import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class match extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_match: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    useraid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id_user'
      }
    },
    userbid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id_user'
      }
    }
  }, {
    sequelize,
    tableName: 'match',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "match_pkey",
        unique: true,
        fields: [
          { name: "id_match" },
        ]
      },
    ]
  });
  }
}
