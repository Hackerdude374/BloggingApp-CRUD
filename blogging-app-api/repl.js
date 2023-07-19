const repl = require("repl");
const db = require("./models");

const replServer = repl.start({
  prompt: "blogging application start > ",
});

for (let modelName in db) {
  replServer.context[modelName] = db[modelName];
}


function asArray(collection) {
  return Array.from(collection).map((record) => record.get({ plain: true }));
}

function asObject(record) {
  return record.get({ plain: true });
}
replServer.context.asArray = asArray;
replServer.context.asObject = asObject;