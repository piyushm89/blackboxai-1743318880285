const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Sample data
let events = [
  {
    id: 1,
    name: "Welcome Freshers Party",
    date: "2023-09-15T18:00:00",
    location: "College Auditorium",
    description: "Annual welcome party for new students",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg"
  }
];

let registrations = [];

// API Routes
app.get('/api/events', (req, res) => {
  res.json(events);
});

app.post('/api/events', (req, res) => {
  const newEvent = {
    id: events.length + 1,
    ...req.body
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

app.post('/api/registrations', (req, res) => {
  const newRegistration = {
    id: registrations.length + 1,
    ...req.body,
    date: new Date().toISOString()
  };
  registrations.push(newRegistration);
  res.status(201).json(newRegistration);
});

app.get('/api/registrations', (req, res) => {
  res.json(registrations);
});

app.delete('/api/registrations/:id', (req, res) => {
  registrations = registrations.filter(r => r.id !== parseInt(req.params.id));
  res.sendStatus(204);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});