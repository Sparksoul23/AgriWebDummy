/**
 * AgriWeb - Smart Seed Selector Logic
 * Multi-step wizard with recommendation engine
 */

class SeedSelector {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 5;
        this.selections = {
            crop: null,
            location: null,
            soil: null,
            season: null,
            irrigation: null,
            rainfall: null,
            budget: 'medium',
            goal: null
        };

        this.init();
    }

    init() {
        this.container = document.querySelector('.selector-container');
        if (!this.container) return;

        this.bindEvents();
        this.updateProgress();
        this.showStep(1);
    }

    bindEvents() {
        // Option cards selection
        this.container.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', () => {
                const group = card.closest('.option-grid');
                const field = group.dataset.field;
                const value = card.dataset.value;

                // Update selection UI
                group.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');

                // Store selection
                this.selections[field] = value;
            });
        });

        // Range sliders
        this.container.querySelectorAll('.range-slider').forEach(slider => {
            slider.addEventListener('input', (e) => {
                const field = e.target.dataset.field;
                const value = e.target.value;
                const display = document.querySelector(`#${field}-value`);

                this.selections[field] = value;
                if (display) {
                    display.textContent = this.formatRangeValue(field, value);
                }
            });
        });

        // Navigation buttons
        document.querySelector('#selector-next')?.addEventListener('click', () => this.nextStep());
        document.querySelector('#selector-prev')?.addEventListener('click', () => this.prevStep());
        document.querySelector('#selector-restart')?.addEventListener('click', () => this.restart());
    }

    showStep(step) {
        this.container.querySelectorAll('.selector-step').forEach(s => {
            s.classList.remove('active');
        });

        const activeStep = this.container.querySelector(`[data-step="${step}"]`);
        if (activeStep) {
            activeStep.classList.add('active');
        }

        // Update button states
        const prevBtn = document.querySelector('#selector-prev');
        const nextBtn = document.querySelector('#selector-next');

        if (prevBtn) {
            prevBtn.style.visibility = step === 1 ? 'hidden' : 'visible';
        }

        if (nextBtn) {
            if (step === this.totalSteps) {
                nextBtn.textContent = 'Get Recommendations';
                nextBtn.onclick = () => this.showResults();
            } else {
                nextBtn.textContent = 'Next Step';
                nextBtn.onclick = () => this.nextStep();
            }
        }
    }

    nextStep() {
        if (this.validateStep()) {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.showStep(this.currentStep);
                this.updateProgress();
            }
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
            this.updateProgress();
        }
    }

    validateStep() {
        const stepValidation = {
            1: () => this.selections.crop !== null,
            2: () => this.selections.location !== null,
            3: () => this.selections.soil !== null && this.selections.season !== null,
            4: () => this.selections.irrigation !== null,
            5: () => this.selections.goal !== null
        };

        const isValid = stepValidation[this.currentStep]?.() ?? true;

        if (!isValid) {
            this.showValidationError();
        }

        return isValid;
    }

    showValidationError() {
        const alert = document.createElement('div');
        alert.className = 'alert alert--error';
        alert.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span>Please make a selection before continuing.</span>
    `;

        const stepContent = this.container.querySelector('.selector-step.active');
        const existingAlert = stepContent.querySelector('.alert');
        if (existingAlert) existingAlert.remove();

        stepContent.insertBefore(alert, stepContent.firstChild);

        setTimeout(() => alert.remove(), 3000);
    }

    updateProgress() {
        const progressFill = document.querySelector('.progress-bar__fill');
        const progressSteps = document.querySelectorAll('.progress-step');

        if (progressFill) {
            const percentage = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
            progressFill.style.width = `${percentage}%`;
        }

        progressSteps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index + 1 === this.currentStep) {
                step.classList.add('active');
            } else if (index + 1 < this.currentStep) {
                step.classList.add('completed');
            }
        });
    }

    showResults() {
        const recommendations = this.generateRecommendations();
        const resultsStep = this.container.querySelector('[data-step="results"]');
        const resultsContainer = resultsStep?.querySelector('.recommended-seeds');

        if (resultsContainer) {
            resultsContainer.innerHTML = recommendations.map(rec => this.renderRecommendation(rec)).join('');
        }

        // Hide all steps and show results
        this.container.querySelectorAll('.selector-step').forEach(s => s.classList.remove('active'));
        if (resultsStep) {
            resultsStep.classList.add('active');
        }

        // Update progress to complete
        const progressFill = document.querySelector('.progress-bar__fill');
        if (progressFill) progressFill.style.width = '100%';

        document.querySelectorAll('.progress-step').forEach(s => s.classList.add('completed'));

        // Update navigation
        document.querySelector('#selector-prev').style.display = 'none';
        document.querySelector('#selector-next').style.display = 'none';
        document.querySelector('#selector-restart').style.display = 'flex';
    }

    generateRecommendations() {
        // Recommendations using robust product matching logic
        const seedDatabase = [
            {
                name: 'AgriWeb Supreme',
                variety: 'Hybrid Paddy',
                crops: ['rice'],
                soils: ['clay', 'loamy'],
                seasons: ['kharif'],
                irrigation: ['irrigated', 'both'],
                yield: '25-30 Qtl/Acre',
                duration: '125-130 days',
                resistances: ['Blast', 'Bacterial Leaf Blight'],
                score: 0
            },
            {
                name: 'AgriWeb Gold',
                variety: 'Basmati Type',
                crops: ['rice'],
                soils: ['loamy', 'black'],
                seasons: ['kharif'],
                irrigation: ['irrigated'],
                yield: '22-24 Qtl/Acre',
                duration: '140-145 days',
                resistances: ['Rust', 'Drought'],
                score: 0
            },
            {
                name: 'AgriWeb Thunder',
                variety: 'Short Duration Rice',
                crops: ['rice'],
                soils: ['sandy-loam', 'clay'],
                seasons: ['kharif'],
                irrigation: ['both', 'rainfed'],
                yield: '24-26 Qtl/Acre',
                duration: '100-105 days',
                resistances: ['Brown Spot'],
                score: 0
            },
            {
                name: 'AgriWeb Shakti',
                variety: 'HD-2967 Type Wheat',
                crops: ['wheat'],
                soils: ['loamy', 'black'],
                seasons: ['rabi'],
                irrigation: ['irrigated'],
                yield: '50-60 Qtl/Hectare',
                duration: '140-145 days',
                resistances: ['Yellow Rust', 'Brown Rust', 'Karnal Bunt'],
                score: 0
            },
            {
                name: 'AgriWeb Protein Plus',
                variety: 'Desi Chickpea',
                crops: ['pulses'],
                soils: ['sandy-loam', 'loamy'],
                seasons: ['rabi'],
                irrigation: ['rainfed', 'both'],
                yield: '18-22 Qtl/Hectare',
                duration: '95-100 days',
                resistances: ['Fusarium Wilt', 'Collar Rot'],
                score: 0
            },
            {
                name: 'AgriWeb Sunburst',
                variety: 'Sunflower Hybrid',
                crops: ['oilseeds'],
                soils: ['black', 'loamy'],
                seasons: ['kharif', 'rabi'],
                irrigation: ['both', 'irrigated', 'rainfed'],
                yield: '20-25 Qtl/Hectare',
                duration: '90-95 days',
                resistances: ['Alternaria', 'Downy Mildew'],
                score: 0
            },
            {
                name: 'AgriWeb Mustard King',
                variety: 'Indian Mustard',
                crops: ['oilseeds'],
                soils: ['loamy', 'sandy-loam'],
                seasons: ['rabi'],
                irrigation: ['both', 'irrigated', 'rainfed'],
                yield: '18-22 Qtl/Hectare',
                duration: '125-130 days',
                resistances: ['White Rust', 'Aphids'],
                score: 0
            },
            {
                name: 'AgriWeb Tamatar Pro',
                variety: 'Determinate Tomato',
                crops: ['vegetables'],
                soils: ['loamy', 'clay'],
                seasons: ['kharif', 'rabi'],
                irrigation: ['irrigated'],
                yield: '400-500 Qtl/Hectare',
                duration: '60-65 days',
                resistances: ['ToLCV', 'Bacterial Wilt'],
                score: 0
            },
            {
                name: 'AgriWeb Mirchi Max',
                variety: 'Hot Pepper',
                crops: ['vegetables'],
                soils: ['loamy', 'black'],
                seasons: ['kharif'],
                irrigation: ['irrigated'],
                yield: '150-180 Qtl/Hectare',
                duration: '70-75 days',
                resistances: ['Anthracnose', 'Leaf Curl'],
                score: 0
            },
            {
                name: 'AgriWeb Bajra Plus',
                variety: 'Pearl Millet Hybrid',
                crops: ['millets'],
                soils: ['sandy-loam', 'loamy', 'clay'],
                seasons: ['kharif'],
                irrigation: ['rainfed', 'both'],
                yield: '25-30 Qtl/Hectare',
                duration: '80-85 days',
                resistances: ['Downy Mildew', 'Ergot'],
                score: 0
            }
        ];

        // Score each seed strictly matching crop
        const scored = seedDatabase.map(seed => {
            let score = 0;
            
            // Crucial fix: filter out seeds that definitely don't match the selected crop
            if (!seed.crops.includes(this.selections.crop)) return null;
            score += 30; // base crop match score

            if (seed.soils.includes(this.selections.soil)) score += 20;
            if (seed.seasons.includes(this.selections.season)) score += 20;
            if (seed.irrigation.includes(this.selections.irrigation)) score += 15;

            // Bonus items
            const seedResistances = seed.resistances || [];
            if (this.selections.goal === 'yield' && (seed.yield || '').includes('50')) score += 10;
            if (this.selections.goal === 'quality' && (seed.variety || '').includes('Basmati')) score += 10;
            if (this.selections.goal === 'resistance' && seedResistances.length > 1) score += 10;

            return { ...seed, score, resistances: seedResistances };
        }).filter(Boolean); // removes null unmatched crop records

        let matches = scored
            .filter(s => s.score > 30) // at least one environmental match in addition to crop
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
            
        // If environmental filters are too strict to get options, give default crop recommendations
        if (matches.length === 0) {
            matches = scored.sort((a, b) => b.score - a.score).slice(0, 3);
        }
        
        return matches;
    }

    renderRecommendation(rec) {
        const scoreLabel = rec.score >= 80 ? 'Excellent Match' :
            rec.score >= 60 ? 'Good Match' : 'Suitable';

        return `
      <div class="recommended-seed">
        <div class="recommended-seed__header">
          <div>
            <h4 class="recommended-seed__name">${rec.name}</h4>
            <p style="margin:0;color:var(--text-muted);font-size:0.9rem;">${rec.variety}</p>
          </div>
          <span class="recommended-seed__score">${scoreLabel} (${rec.score}%)</span>
        </div>
        <div class="recommended-seed__details">
          <div class="seed-detail">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>
            <span>Yield: ${rec.yield}</span>
          </div>
          <div class="seed-detail">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <span>Duration: ${rec.duration}</span>
          </div>
        </div>
        <div class="recommended-seed__resistances">
          ${(rec.resistances || []).map(r => `<span class="resistance-tag">${r} Resistant</span>`).join('')}
        </div>
        <div class="recommended-seed__reason">
          <strong>Why this seed:</strong> Best match for your ${this.selections.soil} soil type during ${this.selections.season} season with ${this.selections.irrigation} irrigation.
        </div>
        <a href="product-detail.html" class="btn btn--primary btn--sm">View Full Details</a>
      </div>
    `;
    }

    formatRangeValue(field, value) {
        const formats = {
            rainfall: `${value} mm/year`,
            budget: ['Low', 'Medium', 'High', 'Premium'][Math.floor(value / 25)]
        };
        return formats[field] || value;
    }

    restart() {
        this.currentStep = 1;
        this.selections = {
            crop: null,
            location: null,
            soil: null,
            season: null,
            irrigation: null,
            rainfall: null,
            budget: 'medium',
            goal: null
        };

        // Reset UI
        this.container.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
        this.showStep(1);
        this.updateProgress();

        // Reset navigation
        document.querySelector('#selector-prev').style.display = 'flex';
        document.querySelector('#selector-next').style.display = 'flex';
        document.querySelector('#selector-restart').style.display = 'none';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.selector-container')) {
        window.seedSelector = new SeedSelector();
    }
});
