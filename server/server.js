const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const request = require('request');

app.use(express.json()); // Middleware to parse JSON body
app.use(cors());

app.post('/api/hash/:hash', (req, res) => {
  const hash = req.params.hash;
  const { apiKey } = req.body;
 
  const options = {
    url: `http://www.virustotal.com/api/v3/files/${hash}`,
    headers: {
      accept: 'application/json',
      'x-apikey': apiKey
    }
  };
  request(options).pipe(res);
});


app.post('/api/check/:ip', async (req, res) => {
  const ip = req.params.ip;
  const { apiKey } = req.body;
 
  // const option1 = {
  //   url: 'https://api.abuseipdb.com/api/v2/check',
  //   params: { ipAddress: ip, verbose: true },
  //   headers: {
  //     'Accept': 'application/json',
  //     'Key': 'ca82246533814382b7d1b17fbdd67c3010a1bcb2c646f5f7045d1762d2c1490b6a34bfdc0be0f7c6',
  //   },
  // };

  const option2 = {
    url: `https://www.virustotal.com/api/v3/ip_addresses/${ip}`,
    headers: {
      accept: 'application/json',
      'X-ApiKey': apiKey,
    },
  };

  // const option3 = {
  //   url: `https://api.metadefender.com/v4/ip/${ip}`,
  //   headers: {
  //     'apikey': 'b4d7b507832f3240e11faf1b2bf1724d',
  //   },
  // };
  try {

    const [ response2] = await Promise.all([
      // axios(option1),
      axios(option2),
      // axios(option3 ),
    ]);

    // Combine the data from both responses
    const combinedResponse = {
      // abuseIPDB: response1.data,
      virusTotal: response2.data,
      // metaDefender: response3.data,
    };

    console.log('Combined API Response:', combinedResponse);
    res.json(combinedResponse);
  } catch (error) {
    console.error('Error from API:', error.combinedResponse?.data || error.message);
    res.status(error.combinedResponse?.status || 500).json({
      error: error.combinedResponse?.data || 'An error occurred',
    });
  }
});


app.post('/api/domain/:domain', (req, res) => {
  const domain = req.params.domain;
  const { apiKey } = req.body;
 
  const options = {
    url: `https://www.virustotal.com/api/v3/domains/${domain}`,
    headers: {
      accept: 'application/json',
      'x-apikey': apiKey
    }
  };
  request(options).pipe(res);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
