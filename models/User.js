const { DataTypes } = require("sequelize");
const sequelize = require("./Sequelize");

const User = sequelize.define(
  "User",
  {
    IDsick: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      referencesKey: "id",
      primaryKey: true

      //   defaultValue: "Ali" instead of null
    },
    FNamesick: {
      type: DataTypes.STRING,
      allowNull: true
    },
    LNamesick: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Tel: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue("Tel");
        // contains letters in Tel
        var regExp = /[a-zA-Z]/g;
        if (!rawValue || regExp.test(rawValue)) {
          return "";
          // throw new Error(`Tel should consists only of numbers !!!!`);
        } else {
          return rawValue;
        }
      }
    },
    TelQuick: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: false,
        notContains: "-" || "_" || "+",
        notNull: {
          msg: "Should not be null"
        }
      }
    },
    meliCode: {
      type: DataTypes.STRING,
      unique: true,
      get() {
        const rawMeliCode = this.getDataValue("meliCode");
        // contains letters in Tel
        var regExp = /[a-zA-Z]/g;
        if (!rawMeliCode || regExp.test(rawMeliCode) || rawMeliCode === null) {
          return "";
          // throw new Error(`Tel should consists only of numbers !!!!`);
        } else {
          return rawMeliCode;
        }
      }
    },

    fullname: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.FNamesick} ${this.LNamesick}`;
      },
      set() {
        throw new Error("Dont set a value for fullname");
      }
    }
  },
  {
    tableName: "InfoSick",
    timestamps: false
  }
);

module.exports = User;
