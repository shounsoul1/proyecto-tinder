import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _match from  "./match.js";
import _profiles from  "./profiles.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const match = _match.init(sequelize, DataTypes);
  const profiles = _profiles.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  match.belongsTo(users, { as: "usera", foreignKey: "useraid"});
  users.hasMany(match, { as: "matches", foreignKey: "useraid"});
  match.belongsTo(users, { as: "userb", foreignKey: "userbid"});
  users.hasMany(match, { as: "userb_matches", foreignKey: "userbid"});
  users.hasOne(profiles, { foreignKey: 'user_id' }); 
  profiles.belongsTo(users, { foreignKey: 'user_id' });

  return {
    match,
    profiles,
    users,
  };
}
