'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable("mysql_testing", {
    id: {
      type: "int", length: 21,
      unsigned: true,
      notNull: true,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: "string",
      length: 256,
      notNull: false
    },
    age: {
      type: "smallint",
      unsigned: true,
      notNull: false
    },
    profile_picture: {
      type: "string",
      length: 2048,
      notNull: false
    },
    phone: {
      type: "string",
      length: 50,
      notNull: false
    },
    uuid: {
      type: "string",
      length: 50,
      notNull: false
    },
    ipv6: {
      type: "string",
      length: 50,
      notNull: false
    },
    ipv4: {
      type: "string",
      length: 20,
      notNull: false
    },
    deleted_at: {
      type: "timestamp",
      notNull: false,
      defaultValue: new String("null")
    },
    created_at: {
      type: "timestamp",
      notNull: true,
    },
    updated_at: {
      type: "timestamp",
      notNull: false,
      defaultValue: new String('CURRENT_TIMESTAMP')
    }
  })
};

exports.down = function(db) {
  return db.dropTable("mysql_testing");
};

exports._meta = {
  "version": 1
};
