/**
 * AgriWeb - Product Filter Module
 * Handles product listing, filtering, and sorting
 */

class ProductFilter {
    constructor(options = {}) {
        this.gridSelector = options.gridSelector || '#products-grid';
        this.filterSelector = options.filterSelector || '.filter-tag';
        this.sortSelector = options.sortSelector || '#product-sort';
        this.countSelector = options.countSelector || '#products-count';

        this.products = [];
        this.filteredProducts = [];
        this.activeFilters = {
            category: 'all',
            season: 'all'
        };
        this.sortBy = 'featured';

        this.init();
    }

    async init() {
        await this.loadProducts();
        this.bindEvents();
        this.render();
    }

    async loadProducts() {
        try {
            const response = await fetch('assets/js/data/products.json');
            const data = await response.json();
            this.products = data.products;
            this.filteredProducts = [...this.products];
        } catch (error) {
            console.error('Error loading products:', error);
            this.products = [];
            this.filteredProducts = [];
        }
    }

    bindEvents() {
        // Filter buttons
        document.querySelectorAll(this.filterSelector).forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filterType = e.target.dataset.filterType;
                const filterValue = e.target.dataset.filter;

                // Update active state
                document.querySelectorAll(`[data-filter-type="${filterType}"]`).forEach(b => {
                    b.classList.remove('active');
                });
                e.target.classList.add('active');

                this.activeFilters[filterType] = filterValue;
                this.applyFilters();
            });
        });

        // Sort dropdown
        const sortSelect = document.querySelector(this.sortSelector);
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.applyFilters();
            });
        }
    }

    applyFilters() {
        this.filteredProducts = this.products.filter(product => {
            const categoryMatch = this.activeFilters.category === 'all' ||
                product.category === this.activeFilters.category;
            const seasonMatch = this.activeFilters.season === 'all' ||
                product.season.toLowerCase().includes(this.activeFilters.season.toLowerCase());
            return categoryMatch && seasonMatch;
        });

        this.sortProducts();
        this.render();
    }

    sortProducts() {
        switch (this.sortBy) {
            case 'name-asc':
                this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'yield-high':
                this.filteredProducts.sort((a, b) => {
                    const yieldA = parseInt(a.yield.split('-')[1]) || 0;
                    const yieldB = parseInt(b.yield.split('-')[1]) || 0;
                    return yieldB - yieldA;
                });
                break;
            case 'featured':
            default:
                this.filteredProducts.sort((a, b) => {
                    if (a.isFeatured && !b.isFeatured) return -1;
                    if (!a.isFeatured && b.isFeatured) return 1;
                    return 0;
                });
        }
    }

    render() {
        const grid = document.querySelector(this.gridSelector);
        const countEl = document.querySelector(this.countSelector);

        if (!grid) return;

        if (this.filteredProducts.length === 0) {
            grid.innerHTML = `
        <div class="no-products" style="grid-column: 1 / -1;">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <h3>No products found</h3>
          <p>Try adjusting your filters to find what you're looking for.</p>
        </div>
      `;
        } else {
            grid.innerHTML = this.filteredProducts.map(product => this.renderProductCard(product)).join('');
        }

        if (countEl) {
            countEl.textContent = `Showing ${this.filteredProducts.length} of ${this.products.length} products`;
        }
    }

    renderProductCard(product) {
        const badgeHtml = product.badge ?
            `<span class="product-card__badge">${product.badge}</span>` : '';

        const featuresHtml = product.features.slice(0, 3).map(f =>
            `<span class="product-card__feature">${f}</span>`
        ).join('');

        return `
      <article class="card product-card">
        ${badgeHtml}
        <div class="product-card__image">
          <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:white;">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2" viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 4 13V4h9a7 7 0 0 1 7 7v9h-9Z"/><path d="M11 20V11"/></svg>
          </div>
        </div>
        <div class="card__body">
          <span class="product-card__category">${this.getCategoryName(product.category)}</span>
          <h3 class="product-card__title">${product.name}</h3>
          <p class="product-card__variety">${product.variety}</p>
          <div class="product-card__features">${featuresHtml}</div>
          <div class="product-card__footer">
            <span class="product-card__yield">Yield: <strong>${product.yield}</strong></span>
            <a href="product-detail.html?id=${product.id}" class="btn btn--sm btn--secondary">View Details</a>
          </div>
        </div>
      </article>
    `;
    }

    getCategoryName(categoryId) {
        const categories = {
            rice: 'Rice',
            wheat: 'Wheat',
            pulses: 'Pulses',
            oilseeds: 'Oilseeds',
            vegetables: 'Vegetables',
            millets: 'Millets'
        };
        return categories[categoryId] || categoryId;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#products-grid')) {
        window.productFilter = new ProductFilter();
    }
});
