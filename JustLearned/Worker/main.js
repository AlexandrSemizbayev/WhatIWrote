window.onload = function() {
    if (window.Worker) {
        let input = document.querySelector('#input'); //input element in DOM
        const myWorker = new Worker('./workers/worker.js'); //creating new Worker
        input.addEventListener('change', function(e) { //Listener for input
            myWorker.postMessage(input.value) //Posting our value
        })
        myWorker.onmessage = function(e) { //Await for post from Worker
            console.log(e.data); //Received content is in data field by default
        }
    }
}