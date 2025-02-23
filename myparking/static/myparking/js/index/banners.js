let currentBanner = 0;
let bannerContainer = document.querySelector('.banner-container');
let global_interval = +bannerContainer.dataset.interval || 5000;
console.log("Banner, banner interval", {bannerContainer, global_interval})
let banners = bannerContainer.querySelectorAll('.banner');
let intervalId;

rotateBanner();
startRotation();

window.addEventListener('focus', startRotation);
window.addEventListener('blur', stopRotation);

function rotateBanner()
{
    for (let i = 0; i < banners.length; i++) {
        if(i === currentBanner)
        {
            // Show banner
            banners[i].hidden = false;
        }
        else  banners[i].hidden = true;
    }

    currentBanner++;
    if (currentBanner === banners.length) {
        currentBanner = 0;
    }
}

function startRotation() {
    intervalId = setInterval(rotateBanner, global_interval);
}

function stopRotation() {
    clearInterval(intervalId);
}