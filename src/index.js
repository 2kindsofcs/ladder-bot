const { RTMClient } = require('@slack/rtm-api');
const { WebClient } = require('@slack/client');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const web = new WebClient(token1);

app.use(bodyParser.urlencoded({extended: true}));
app.listen(80);



app.post('/', async (req, res) => {
    const data = req.body;
    const text = data.text;
    const channelId = data.channel_id;
    console.log(channelId);
    const membersData = await web.conversations.members({
        channel: channelId,
    });
    console.log(membersData.members);
    const chapterNum = text.split('/');
    res.status(200).send("hey");
})

