interface PortfolioItem {
    title: string;
    imageUrl: string;
}

async function fetchPortfolioItems(): Promise<PortfolioItem[]> {
    const response = await fetch('../data/portfolioItems.json');
    if (!response.ok) {
        throw new Error('Could not fetch portfolio items.');
    }
    return response.json();
}

function createPortfolioItem(item: PortfolioItem): HTMLElement {
    const container = document.createElement('div');
    container.className = 'flex-item';

    const img = document.createElement('img');
    img.src = item.imageUrl && item.imageUrl.trim() !== "" ? item.imageUrl : '../img/placeholder-image.jpg';
    img.alt = item.title;

    const title = document.createElement('h3');
    title.textContent = item.title;

    container.appendChild(img);
    container.appendChild(title);

    return container;
}

async function loadPortfolio() {
    try {
        const portfolioItems = await fetchPortfolioItems();
        const container = document.getElementById('portfolio-container');
        if (container) {
            portfolioItems.forEach(item => {
                const portfolioItem = createPortfolioItem(item);
                container.appendChild(portfolioItem);
            });
        }
    } catch (error) {
        console.error('Failed to load portfolio items:', error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    loadPortfolio();
});