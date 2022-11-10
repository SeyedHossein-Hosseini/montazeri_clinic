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
      //   primaryKey:true
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
          return "000000000";
          // throw new Error(`Tel should consists only of numbers !!!!`);
        } else {
          return rawValue;
        }
      }
    },
    TelQuick: {
      type: DataTypes.STRING
      // validate: {
      //   isNumeric: false,
      //   notContains: "-",
      //   notNull: {
      // msg: "Should not be null"
      // }
      // }
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
    // Password: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   get() {
    //     return "Now does not password";
    //   },
    //   set(value) {
    //     this.setDataValue("Password", value);
    //   }
    // }
  },
  {
    tableName: "InfoSick",
    timestamps: false
  }
);

module.exports = User;
