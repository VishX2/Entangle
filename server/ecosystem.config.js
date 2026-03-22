const e = require("express");

module.exports = {
  apps: [
    { name:'entangle', 
       script: "npm", args: "run dev", env: { NODE_ENV: "development", ENV_VAR1: "environment-variable-1" }, 
 } ],
};