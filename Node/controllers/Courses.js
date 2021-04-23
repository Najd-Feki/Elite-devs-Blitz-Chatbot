const request = require('request');
 
const options = {
    url: 'https://www.udemy.com/api-2.0/courses/',
       
    headers: {
      'Authorization': 'Basic c2Y5TXgyZWdHeDBwbHVUblBWd3paTGNlMW5XTUVCOTF0MHdDYlNJZTpoazJaaWdxbDVEZENkdkNoNjJrbFI2UGp1SkE3aThUTDF0TldCQkVQcFFIWlVCcVREajZ5dEtFTjNpSEJRYzZ4bnNxMkFPQjZZUjhHRlh0NUs0NmtlZjRIR1dCSWtsckxYbTRuZmlaRmNpQlAyM1RSNUxPUHR5Q0tVUjNNVHcyVw=='
    }
  };
   
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
    }
  }
   
  request(options, callback);