const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const { createUserTable } = require('./models/userModel');
const { createTaskTable } = require('./models/taskModel')

const taskRoutes = require('./routes/taskRoutes');
const adminRoutes = require('./routes/adminRoutes')



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


(async () => {
  await createUserTable();
  await createTaskTable();
})();