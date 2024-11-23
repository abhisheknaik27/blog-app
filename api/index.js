const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 4000;

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    res.json({ username, password });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`))