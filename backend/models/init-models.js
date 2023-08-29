import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _perfiles from  "./perfiles.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const perfiles = _perfiles.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);


  return {
    perfiles,
    users,
  };
}
