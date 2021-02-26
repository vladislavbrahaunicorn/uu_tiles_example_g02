"use strict";
const TilesExampleAbl = require("../../abl/tiles-example-abl.js");

class TilesExampleController {
  init(ucEnv) {
    return TilesExampleAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new TilesExampleController();
