const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;
const activitiesFile = path.join(__dirname, 'activities.json');

// Apply CORS middleware
app.use(cors());

// Handle POST requests to save activity
app.post('/save-activity', (req, res) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const activity = JSON.parse(body);

    fs.readFile(activitiesFile, 'utf8', (err, data) => {
      let activities = [];
      if (!err && data) {
        activities = JSON.parse(data);
      }

      activities.push(activity);

      fs.writeFile(activitiesFile, JSON.stringify(activities, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing file:', err);
          res.status(500).json({ error: 'Failed to save activity' });
        } else {
          res.status(200).json({ message: 'Activity saved successfully' });
        }
      });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
