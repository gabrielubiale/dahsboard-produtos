import { createApp } from './app'

// Entry point for the mock API.
// This file is intentionally tiny: it just creates the app and starts listening.
const app = createApp()
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`API mock listening on http://localhost:${PORT}`)
})

