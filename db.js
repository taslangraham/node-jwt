const dbUri = require("./config").dbUri;
const mongoose = require('mongoose');
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });