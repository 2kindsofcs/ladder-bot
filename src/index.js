const { WebClient } = require('@slack/client');
const { botMessage } = require('./message_template');
const express = require('express');
const bodyParser = require('body-parser');

const token = process.env.TOKEN
const port = process.env.PORT

const app = express();
const web = new WebClient(token);

app.use(bodyParser.urlencoded({extended: true}));
app.listen(port);

app.post('/', async (req, res) => {
    const data = req.body;
    const chapText = data.text;
    const userData = await web.users.list();
    // filter를 사용해서 나온 것은 말 그대로 걸러진 요소들이기 때문에 map을 사용해서 
    // 진짜 원하는 정보를 다시 뽑아서 정리한다. 
    let userList = userData.members.filter((data) => {
        return data.is_bot === false && data.id !== 'USLACKBOT' && data.id !== process.env.EXCEPT_ID
    }).map(data => data.id); 
    web.chat.postMessage({
        channel: `${data.channel_id}`,
        text: '',
        as_user: true,
        blocks: botMessage(userList, chapText),
    });
    res.status(200);
})
