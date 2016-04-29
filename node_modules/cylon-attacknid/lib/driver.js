"use strict";

var Cylon = require("cylon");

var Driver = module.exports = function Driver(opts) {
  Driver.__super__.constructor.apply(this, arguments);
  opts = opts || {};

  // Include a list of commands that will be made available to external APIs.
  this.commands = {
    // This is how you register a command function for the API;
    // the command should be added to the prototype, see below.
    sayhello: this.sayhello,
    moveforward : this.moveforward,
    movebackward : this.movebackward,
    turnleft : this.turnleft,
    turnright : this.turnright,
    up : this.up,
    down : this.down,
    light : this.light,
    fire : this.fire,
  };

  this.commandData = {
      forward : "7100028080808001",
      backward : "7100828080808002",
      left : "7100808280808008",
      right : "7100800280808004",

      down : "7100808002808010",
      up : "7100808082808020",

      light : "7100808080800240",
      fire : "7100808080808280"
  };

};

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function(callback) {
  callback();
};

Driver.prototype.halt = function(callback) {
  callback();
};

Driver.prototype.sayhello = function() {
  Cylon.Logger.info("Hello World!");
};

Driver.prototype.moveforward = function() {
  Cylon.Logger.info("Forward");
  this.connection.command = this.commandData.forward;
};

Driver.prototype.movebackward = function() {
  Cylon.Logger.info("Backward");
  this.connection.ommand = this.commandData.backward;
};

Driver.prototype.turnleft = function() {
  Cylon.Logger.info("Left");
  this.connection.command = this.commandData.left;
};

Driver.prototype.turnright = function() {
  Cylon.Logger.info("Right");
  this.connection.command = this.commandData.right;
};

Driver.prototype.up = function() {
  Cylon.Logger.info("Up");
  this.connection.command = this.commandData.up;
};

Driver.prototype.down = function() {
  Cylon.Logger.info("Down");
  this.connection.command = this.commandData.down;
};

Driver.prototype.fire = function() {
  Cylon.Logger.info("Fire");
  this.connection.command = this.commandData.fire;
};

Driver.prototype.light = function() {
  Cylon.Logger.info("Light");
  this.connection.command = this.commandData.light;
};
