interface PortfolioItem {
    title: string;
    imageUrl: string;
}

const portfolioItems: PortfolioItem[] = [
    { title: "PortfolioItem1", imageUrl: "./img/image1.png" },
    { title: "PortfolioItem2", imageUrl: "./img/image2.png" },
    { title: "PortfolioItem3", imageUrl: "./img/image3.png" },
    { title: "PortfolioItem4", imageUrl: "./img/image4.png" }
];

function createPortfolioItem(item: PortfolioItem): HTMLElement {
    const container = document.createElement('div');
    container.className = 'flex-item';

    const img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.title;

    const title = document.createElement('h3');
    title.textContent = item.title;

    container.appendChild(img);
    container.appendChild(title);

    return container;
}

function loadPortfolio() {
    const container = document.getElementById('portfolio-container');
    if (container) {
        portfolioItems.forEach(item => {
            const portfolioItem = createPortfolioItem(item);
            container.appendChild(portfolioItem);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    loadPortfolio();
});