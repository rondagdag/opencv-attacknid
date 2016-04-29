"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    attacknid: { adaptor: "attacknid", address : "0000000000" }
  },

  devices: {
    spider: { driver: "attacknid"}
  },

  work: function(my) {
    every((1).seconds(), function() { my.spider.forward(); });
  }
}).start();
