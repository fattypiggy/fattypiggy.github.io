if ('serviceWorker' in navigator) {
    console.log("Will the service worker register?");
    navigator.serviceWorker.register('service-worker.js')
        .then(function (reg) {
            console.log(`Yes, it did. scope:${reg.sc}`);
        }).catch(function (err) {
            console.log("No it didn't. This happened: ", err)
        });
}
window.addEventListener('beforeinstallprompt', function (e) {
    // beforeinstallprompt Event fired

    // e.userChoice will return a Promise.
    // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
    e.userChoice.then(function (choiceResult) {

        console.log(choiceResult.outcome);

        if (choiceResult.outcome == 'dismissed') {
            console.log('User cancelled home screen install');
        }
        else {
            console.log('User added to home screen');
        }
    });
});