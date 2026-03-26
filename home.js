const express = require('express');
const redis = require('redis');
const path = require('path');
const app = express();

const client = redis.createClient({
    host: 'redis',
    port: 6379
});

client.set('visitsCounter', 0)

app.use(express.static(path.join(__dirname, 'public')));

app.get('/visits', (req, res) => {
    client.incr('visitsCounter', (err, visitsCounter) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ visitsCounter });
    });
});
app.listen(8080, () => {
    console.log('Listening on Port 8080');
})