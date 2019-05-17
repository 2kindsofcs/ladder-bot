const { RTMClient } = require('@slack/rtm-api');
const token = process.env.SLACK_BOT_TOKEN;
const rtm = new RTMClient(token);

// (async () => {
//     const { self, team } = await rtm.start();
// })();

rtm.start();

rtm.on('message', async (event) => {
    if(!event.text.includes("사다리")) {
        return
    } else {
        const reply = await rtm.sendMessage("사다리를 타자", event.channel)
        console.log(reply)
    }
})

