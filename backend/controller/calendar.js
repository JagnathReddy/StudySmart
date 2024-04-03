const https = require('https');

const url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
const token = 'ya29.a0Ad52N39OJBkdasOCcY4DodO4ApwiLDF-VjgmGoaEv75QY3TMcEf0wFHV3njaBAM3eisvPNb-lnlm9JXuehQLbDpNolnzOaVqm270LB1JLbjR6FtnYBsEFwG2tcyVbXqRhDOUXj7uZLO1jDahGGWMCJYU3TvjOkhstxIaCgYKARUSARESFQHGX2Miaut50eVm4APRw98OpcaLjQ0170'; // Replace with your actual access token

const options = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const req = https.request(url, options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Response:', data);
    // Handle the response data here
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();
