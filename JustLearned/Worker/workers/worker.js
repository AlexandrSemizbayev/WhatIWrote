onmessage = arg => {
	postMessage(arg.data.split('').reverse().join(''));		//Posting reversed argument back to Parrent
}