var fileServer = require("./lib/server");
var HttpTranspondBird = require("./lib/transpond");
var serverSettings = require("./config.js").Server;

var httpTranspond = new HttpTranspondBird();

fileServer.start(serverSettings, httpTranspond.transpond);