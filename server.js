const express = require('express');
const path = require('path');
const app = express();
const portNumber = process.env.PORT || 3001;
const sourceDir = 'dist';

app.use(express.static(sourceDir));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, sourceDir + '/index.html'));
});

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});
