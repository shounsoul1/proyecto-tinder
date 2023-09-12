import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class profiles extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_perfil: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    genero: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    intereses: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url_photo: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'profiles',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "perfiles_pkey",
        unique: true,
        fields: [
          { name: "id_perfil" },
        ]
      },
    ]
  });
  }
}
