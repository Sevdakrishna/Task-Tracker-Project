const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const { createUserTable } = require('./models/userModel');
const { createTaskTable } = require('./models/taskModel')

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


(async () => {
  await createUserTable();
  await createTaskTable();
})();