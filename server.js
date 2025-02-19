const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
let fetch;

import('node-fetch').then(mod => {
    fetch = mod.default;
}).catch(err => console.error('Failed to load node-fetch:', err)); // Make sure to have node-fetch installed

const app = express();
const PORT = 6000; // Change this if you prefer a different port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Proxy route for /ext-login
app.post('/api/ext-login', async (req, res) => {
    try {
        const response = await fetch('https://ime.finloge.com/api/ext-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body) // Forward the body from the incoming request
        });

        if (response.ok) {
            const data = await response.json();
            res.status(200).json(data);
        } else {
            if (response.headers.get('content-type')?.includes('application/json')) {
                const errorData = await response.json();
                res.status(response.status).json(errorData);
            } else {
                const errorData = await response.text();
                res.status(response.status).send(errorData);
            }
        }
    } catch (error) {
        console.error('Error during login proxy:', error);
        res.status(500).json({ error: 'Internal server error during login' });
    }
});

// Proxy route for /ext-balance
app.get('/api/ext-balance', async (req, res) => {
    try {
        const authToken = req.header('Authorization');
        if (!authToken) {
            return res.status(401).json({ error: 'Authorization token is required' });
        }

        const response = await fetch('https://ime.finloge.com/api/ext-balance', {
            method: 'GET',
            headers: {
                'Authorization': authToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            res.status(200).json(data);
        } else {
            if (response.headers.get('content-type')?.includes('application/json')) {
                const errorData = await response.json();
                res.status(response.status).json(errorData);
            } else {
                const errorData = await response.text();
                res.status(response.status).send(errorData);
            }
        }
    } catch (error) {
        console.error('Error fetching balance:', error);
        res.status(500).json({ error: 'Internal server error during balance fetch' });
    }
});

// Proxy route for /ext-profile
// Proxy route for /api/ext-profile to handle PUT requests
app.get('/api/ext-profile', async (req, res) => {
    try {
        const authToken = req.header('Authorization');
        if (!authToken) {
            return res.status(401).json({ error: 'Authorization token is required' });
        }

        const response = await fetch('https://ime.finloge.com/api/ext-profile', {
            method: 'GET',
            headers: {
                'Authorization': authToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            res.status(200).json(data);
        } else {
            if (response.headers.get('content-type')?.includes('application/json')) {
                const errorData = await response.json();
                res.status(response.status).json(errorData);
            } else {
                const errorData = await response.text();
                res.status(response.status).send(errorData);
            }
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal server error during profile fetch' });
    }
});





// Proxy route for /ext-logout
app.get('/api/ext-logout', async (req, res) => {
    try {
        const authToken = req.header('Authorization');
        if (!authToken) {
            return res.status(401).json({ error: 'Authorization token is required' });
        }

        const response = await fetch('https://ime.finloge.com/api/ext-logout', {
            method: 'GET',
            headers: {
                'Authorization': authToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            res.status(200).json(data);
        } else {
            if (response.headers.get('content-type')?.includes('application/json')) {
                const errorData = await response.json();
                res.status(response.status).json(errorData);
            } else {
                const errorData = await response.text();
                res.status(response.status).send(errorData);
            }
        }
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'Internal server error during logout' });
    }
});

// Proxy route for /ext-transaction with pagination support
app.get('/api/ext-transaction', async (req, res) => {
    try {
        const authToken = req.header('Authorization');
        if (!authToken) {
            return res.status(401).json({ error: 'Authorization token is required' });
        }

        // Extract query parameters
        const page = req.query.page || 1; // Default to page 1
        const pageSize = req.query.page_size || 5; // Default to 10 items per page
        const startDate = req.query.start_date || ''; // Optional start date
        const endDate = req.query.end_date || ''; // Optional end date
        const pageCount = req.query.page_count || ''; // Optional total pages

        // Construct API URL with query parameters
        const apiUrl = `https://ime.finloge.com/api/ext-transaction?page=${page}&page_size=${pageSize}&page_count=${pageCount}&start_date=${startDate}&end_date=${endDate}`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': authToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            res.status(200).json(data);
        } else {
            if (response.headers.get('content-type')?.includes('application/json')) {
                const errorData = await response.json();
                res.status(response.status).json(errorData);
            } else {
                const errorData = await response.text();
                res.status(response.status).send(errorData);
            }
        }
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal server error during transactions fetch' });
    }
});


// Proxy route for updating /ext-transaction
app.put('/api/ext-transaction', async (req, res) => {
    try {
        const authToken = req.header('Authorization');
        if (!authToken) {
            return res.status(401).json({ error: 'Authorization token is required' });
        }

        const response = await fetch('https://ime.finloge.com/api/ext-transaction', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            },
            body: JSON.stringify(req.body) // Forward the body from the incoming request
        });

        if (response.ok) {
            const data = await response.json();
            res.status(200).json(data);
        } else {
            if (response.headers.get('content-type')?.includes('application/json')) {
                const errorData = await response.json();
                res.status(response.status).json(errorData);
            } else {
                const errorData = await response.text();
                res.status(response.status).send(errorData);
            }
        }
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ error: 'Internal server error during transaction update' });
    }
});

// Proxy route for /api/ext-profile to handle PUT requests
app.put('/api/ext-profile', async (req, res) => {
    try {
        const authToken = req.header('Authorization');
        if (!authToken) {
            console.log('No Authorization token found in request headers.');
            return res.status(401).json({ error: 'Authorization token is required' });
        }

        // Validate request body for required field 'domain'
        if (!req.body.domain) {
            console.log('Missing "domain" field in request body.');
            return res.status(400).json({ error: 'Domain is required' });
        }

        console.log('Received PUT request to /api/ext-profile');
        console.log('Request Body:', req.body); 

        // Set the options for the fetch request to perform a PUT operation
        const options = {
            method: 'PUT',
            headers: {
                'Authorization': authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body) 
        };

        console.log('Sending request to external API:', 'https://ime.finloge.com/api/ext-profile');
        const response = await fetch('https://ime.finloge.com/api/ext-profile', options);

        // Handle the response based on its success
        if (response.ok) {
            console.log('External API responded with success.');
            const data = await response.json();
            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: data
            });
        } else {
            console.error(`Failed to update profile. Status: ${response.status}`);
            // Detailed error handling based on content type
            if (response.headers.get('content-type')?.includes('application/json')) {
                const errorData = await response.json();
                console.error('Error response from external API:', errorData); 
                res.status(response.status).json(errorData);
            } else {
                const errorText = await response.text();
                console.error('Error response from external API:', errorText); 
                res.status(response.status).send(errorText);
            }
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal server error during profile update' });
    }
});
// Proxy route for /api/ext-transaction-count
app.get('/api/ext-transaction-count', async (req, res) => {
    try {
        const authToken = req.header('Authorization');
        if (!authToken) {
            return res.status(401).json({ error: 'Authorization token is required' });
        }

        // Add a filter query parameter
        const filterQuery = 'count'; // As specified in your curl command to always use 'count'

        // Construct the full API URL with the query parameter
        const apiUrl = `https://ime.finloge.com/api/ext-transaction?filter=${filterQuery}`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                'Authorization': authToken,
                'Content-Type': 'application/json',
                'Cookie': 'csrftoken=S5PcdDgSrNo0FW7ZLBuBobHoWeCplg0d; csrftoken=S5PcdDgSrNo0FW7ZLBuBobHoWeCplg0d'
            }
        });

        if (response.ok) {
            const data = await response.json();
            res.status(200).json(data);
        } else {
            // Detailed error handling based on the content type in the response header
            if (response.headers.get('content-type')?.includes('application/json')) {
                const errorData = await response.json();
                res.status(response.status).json(errorData);
            } else {
                const errorData = await response.text();
                res.status(response.status).send(errorData);
            }
        }
    } catch (error) {
        console.error('Error fetching transaction count:', error);
        res.status(500).json({ error: 'Internal server error during transaction count fetch' });
    }
});

// Proxy route for /api/ext-check-auth
app.get('/api/ext-check-auth', async (req, res) => {
    try {
        // Extract email from query parameters
        const email = encodeURIComponent(req.query.email);

        // Construct the URL with query parameters
        const apiUrl = `https://ime.finloge.com/api/ext-check-auth?email=${email}`;

        // Retrieve the cookie from the incoming request's headers, if available
        const cookie = req.headers['cookie'];

        // Prepare headers for the external API request
        const headers = {
            'Authorization': req.header('Authorization'),
            'Content-Type': 'application/json'
        };

        // Include cookie in headers if present
        if (cookie) {
            headers['Cookie'] = cookie;
        }

        // Perform the fetch request to the external API
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers
        });

        // Check if the response was ok
        if (response.ok) {
            const data = await response.json();
            res.status(200).json(data);
        } else {
            // Handle non-200 responses
            if (response.headers.get('content-type')?.includes('application/json')) {
                const errorData = await response.json();
                res.status(response.status).json(errorData);
            } else {
                const errorData = await response.text();
                res.status(response.status).send(errorData);
            }
        }
    } catch (error) {
        console.error('Error during auth check:', error);
        res.status(500).json({ error: 'Internal server error during auth check' });
    }
});

// Proxy route for /api/ext-check-connected-site
app.get('/api/ext-check-connected-site', async (req, res) => {
    const domain = req.query.domain; // Expecting domain to be passed as a query parameter
    const authToken = req.header('Authorization');

    if (!authToken) {
        return res.status(401).json({ error: 'Authorization token is required' });
    }

    try {
        const apiUrl = `https://ime.finloge.com/api/ext-check-connected-site?domain=${domain}`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': authToken,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            res.status(200).json(data);
        } else {
            // Handle non-200 responses
            if (response.headers.get('content-type')?.includes('application/json')) {
                const errorData = await response.json();
                res.status(response.status).json(errorData);
            } else {
                const errorData = await response.text();
                res.status(response.status).send(errorData);
            }
        }
    } catch (error) {
        console.error('Error during check for connected site:', error);
        res.status(500).json({ error: 'Internal server error during check for connected site' });
    }
});

// API route to get URLs
let urls = {
    forgotPassword: "https://ime.finloge.com/forgot-password/",
    buyAED: "https://ime.finloge.com/payment/"
};

// API endpoint to get the Forgot Password URL
app.get('/api/forgot-password', (req, res) => {
    res.json({ forgotPassword: urls.forgotPassword });
});

// API endpoint to get the Buy AED URL
app.get('/api/buy-aed', (req, res) => {
    res.json({ buyAED: urls.buyAED });
});

// API endpoint to set the Forgot Password URL
app.post('/api/forgot-password', (req, res) => {
    if (req.body.url) {
        urls.forgotPassword = req.body.url;
        res.status(200).send("Forgot Password URL updated successfully");
    } else {
        res.status(400).send("URL is required");
    }
});

// API endpoint to set the Buy AED URL
app.post('/api/buy-aed', (req, res) => {
    if (req.body.url) {
        urls.buyAED = req.body.url;
        res.status(200).send("Buy AED URL updated successfully");
    } else {
        res.status(400).send("URL is required");
    }
});

// Proxy route for /api/ext-transaction-pdf to get transaction PDFs between two dates
app.get('/api/ext-transaction-pdf', async (req, res) => {
    try {
        // Extract query parameters
        const startDate = req.query.start_date;
        const endDate = req.query.end_date;

        // Validate the presence of required parameters
        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Start date and end date are required' });
        }

        // Prepare the headers for the fetch request
        const authToken = req.header('Authorization');
        const cookie = req.header('Cookie');

        // Check if the Authorization token is provided
        if (!authToken) {
            return res.status(401).json({ error: 'Authorization token is required' });
        }

        // Construct the API URL with query parameters
        const apiUrl = `http://ime.finloge.com/api/ext-transaction-pdf/?start_date=${startDate}&end_date=${endDate}`;

        // Perform the fetch request to the external API
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': authToken,
                'Cookie': cookie || ''  // Include cookie if present
            }
        });

        // Handle the response from the external API
        if (response.ok) {
            // If the API call is successful, assume PDF was sent successfully
            res.status(200).json({ message: "PDF sent successfully" });
        } else {
            // Handle non-200 responses
            if (response.headers.get('content-type')?.includes('application/json')) {
                const errorData = await response.json();
                res.status(response.status).json(errorData);
            } else {
                const errorData = await response.text();
                res.status(response.status).send(errorData);
            }
        }
    } catch (error) {
        console.error('Error fetching transaction PDF:', error);
        res.status(500).json({ error: 'Internal server error during transaction PDF fetch' });
    }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});