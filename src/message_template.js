function userIdList(userIds) {
	return userIds.map((id) => `<@${id}>`);
}

function botMessage(memberList, chapText) { 
	let list = userIdList(memberList);
	for(let i=0; i<30; i++){
		const pickIndex1 = Math.floor(Math.random() * list.length);
		const pickIndex2 = Math.floor(Math.random() * list.length);
		const temp = list[pickIndex1];
		list[pickIndex1] = list[pickIndex2];
		list[pickIndex2] = temp;
	}
	const chapterNum = chapText.split('/');
	console.log(list)
	ladderResult = list.map((name) => (name + chapterNum.shift()))
	const message = [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": `사다리를 타봤습니다. \n ${ladderResult}
					`}
			},
		]
	return message;
}

module.exports = {
	botMessage,
}