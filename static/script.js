var portfolioItems = [
    { title: "PortfolioItem1", imageUrl: "./img/image1.png" },
    { title: "PortfolioItem2", imageUrl: "./img/image2.png" },
    { title: "PortfolioItem3", imageUrl: "./img/image3.png" },
    { title: "PortfolioItem4", imageUrl: "./img/image4.png" }
];
function createPortfolioItem(item) {
    var container = document.createElement('div');
    container.className = 'flex-item';
    var img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.title;
    var title = document.createElement('h3');
    title.textContent = item.title;
    container.appendChild(img);
    container.appendChild(title);
    return container;
}
function loadPortfolio() {
    var container = document.getElementById('portfolio-container');
    if (container) {
        portfolioItems.forEach(function (item) {
            var portfolioItem = createPortfolioItem(item);
            container.appendChild(portfolioItem);
        });
    }
}
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");
    loadPortfolio();
});
