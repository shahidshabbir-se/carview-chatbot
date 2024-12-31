import dotenv from 'dotenv'
import setupModuleAliases from './moduleAlias'
dotenv.config()
setupModuleAliases()
import { connectDB } from '@configs/prisma.config'
import express from 'express'
import cors from 'cors'
import router from '@routes/export.routes'

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

const app = express()

app.use(express.json())
app.use(cors(corsOptions))

// API routes
app.use('/api', router)

// Test endpoint
app.get('/', (req: express.Request, res: express.Response) => {
  res.send(`<h3>App is running at port ${process.env.PORT}</h3>`)
})

// Start the server and connect to the database
const PORT = process.env.PORT || 8080 // Default to 5000 if PORT is not defined
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  await connectDB() // Connect to the database
})
