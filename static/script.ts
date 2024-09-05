interface PortfolioItem {
    title: string;
    imageUrl: string;
    description: string;
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

    const description = document.createElement('div');
    description.className = 'description';
    description.textContent = item.description;

    container.appendChild(title);
    container.appendChild(img);
    container.appendChild(description)

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

const newProjectButton = document.getElementById('new-project');
if (newProjectButton) {
    newProjectButton.addEventListener('click', () => {
        window.location.href = './new-project';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const titleInput = document.getElementById('title') as HTMLInputElement;
        // const imageInput = document.getElementById('image') as HTMLInputElement; TO DO
        const descriptionInput = document.getElementById('description') as HTMLInputElement;

        if (!titleInput || !descriptionInput ) return;

        const newProject = {
            title: titleInput.value,
            imageUrl: "",
            description: descriptionInput.value,
        };

        try {
            const response = await fetch('/submit-project', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProject),
            });

            if (!response.ok) {
                throw new Error('Error creating new project');
            }

            const result = await response.json();
            console.log('Success:', result);

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }

        window.location.href = '/';
    });
});


document.addEventListener("DOMContentLoaded", () => {
    loadPortfolio();
});