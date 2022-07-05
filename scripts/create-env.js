const fs = require('fs');

fs.writeSync('./.env', 'API=${process.env.API}\n');