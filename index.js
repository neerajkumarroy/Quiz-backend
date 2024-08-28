require("./Database/config.js");
const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
const Admin_route = require("./Routes/Admin.js");
const questionRoutes = require('./Routes/questionRoutes.js');


app.use(express.json());
app.use(cors());

app.use("/api/v1", Admin_route);
//Add question
app.use('/api/v1', questionRoutes);

app.listen(PORT, () => {
    console.log(`This App is running on the port number ${PORT}`);
})
