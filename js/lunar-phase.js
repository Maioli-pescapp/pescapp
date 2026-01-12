// lunar-phase.js - Cálculo SIMPLIFICADO de fase lunar para PescApp
// Versão: 3.0.0 - SUPER SIMPLES e FUNCIONAL
// Última atualização: 2026-01-12

const LunarPhaseCalculator = {
    // ============ CONSTANTES ============
    MOON_PHASES: [
        { min: 0, max: 0.03, name: 'Lua Nova', emoji: '🌑', score: 9 },
        { min: 0.03, max: 0.25, name: 'Crescente', emoji: '🌒', score: 7 },
        { min: 0.25, max: 0.28, name: 'Quarto Crescente', emoji: '🌓', score: 8 },
        { min: 0.28, max: 0.47, name: 'Gibosa Crescente', emoji: '🌔', score: 6 },
        { min: 0.47, max: 0.53, name: 'Lua Cheia', emoji: '🌕', score: 9 },
        { min: 0.53, max: 0.72, name: 'Gibosa Minguante', emoji: '🌖', score: 5 },
        { min: 0.72, max: 0.75, name: 'Quarto Minguante', emoji: '🌗', score: 7 },
        { min: 0.75, max: 1.0, name: 'Lua Minguante', emoji: '🌘', score: 4 }
    ],
    
    FISHING_TIPS: {
        'Lua Nova': 'Excelente para pesca noturna! Peixes em alimentação intensa.',
        'Crescente': 'Boa para pesca diurna. Procure peixes em águas rasas.',
        'Quarto Crescente': 'Ótima para pesca ao entardecer.',
        'Gibosa Crescente': 'Condições moderadas. Melhor na maré alta.',
        'Lua Cheia': 'Excelente para pesca noturna! Peixes mais visíveis.',
        'Gibosa Minguante': 'Pesca ao amanhecer pode render bons resultados.',
        'Quarto Minguante': 'Boa para pesca de espécies de fundo.',
        'Lua Minguante': 'Pesca mais desafiadora. Foque em pontos profundos.'
    },
    
    BEST_TIMES: {
        'Lua Nova': 'Noite e Madrugada',
        'Crescente': 'Manhã e Tarde',
        'Quarto Crescente': 'Entardecer',
        'Gibosa Crescente': 'Tarde e Início da Noite',
        'Lua Cheia': 'Noite Inteira',
        'Gibosa Minguante': 'Amanhecer',
        'Quarto Minguante': 'Manhã',
        'Lua Minguante': 'Meio-dia'
    },
    
    RECOMMENDED_BAITS: {
        'Lua Nova': 'Iscas artificiais luminosas',
        'Crescente': 'Iscas naturais (camarão, minhoca)',
        'Quarto Crescente': 'Jigs, plugs sub-superficiais',
        'Gibosa Crescente': 'Iscas de silicone',
        'Lua Cheia': 'Iscas de superfície, poppers',
        'Gibosa Minguante': 'Iscas naturais, jigs lentos',
        'Quarto Minguante': 'Iscas de fundo',
        'Lua Minguante': 'Iscas vivas'
    },
    
    // ============ MÉTODOS PÚBLICOS ============
    
    /**
     * Calcula fase lunar de forma SUPER SIMPLES
     */
    calculatePhase(date = new Date()) {
        try {
            // Tentar SunCalc primeiro
            if (typeof SunCalc !== 'undefined') {
                return this._calculateWithSunCalc(date);
            }
        } catch (error) {
            console.warn('SunCalc falhou, usando cálculo local:', error.message);
        }
        
        // Fallback super simples
        return this._calculateSimple(date);
    },
    
    /**
     * Calcula previsão para N dias
     */
    calculateForecast(startDate = new Date(), days = 7) {
        const forecast = [];
        const start = new Date(startDate);
        
        for (let i = 0; i < days; i++) {
            const currentDate = new Date(start);
            currentDate.setDate(start.getDate() + i);
            
            const phase = this.calculatePhase(currentDate);
            forecast.push({
                date: currentDate,
                ...phase,
                dayName: this._getDayName(currentDate),
                shortDate: currentDate.toLocaleDateString('pt-BR', { 
                    day: '2-digit', 
                    month: 'short' 
                })
            });
        }
        
        return forecast;
    },
    
    /**
     * Retorna informações de pesca
     */
    getFishingInfo(phaseName) {
        return {
            score: this._getPhaseScore(phaseName),
            tip: this.FISHING_TIPS[phaseName] || 'Condições normais para pesca.',
            bestTime: this.BEST_TIMES[phaseName] || 'Manhã e Tarde',
            recommendedBait: this.RECOMMENDED_BAITS[phaseName] || 'Iscas naturais',
            fishActivity: this._getFishActivity(phaseName)
        };
    },
    
    // ============ MÉTODOS PRIVADOS SIMPLES ============
    
    _calculateWithSunCalc(date) {
        const moon = SunCalc.getMoonIllumination(date);
        const phase = this._determinePhase(moon.phase);
        const illumination = Math.round(moon.fraction * 100);
        
        return {
            phase: phase.name,
            emoji: phase.emoji,
            percentage: illumination,
            phaseValue: moon.phase,
            illumination: moon.fraction,
            fishingInfo: this.getFishingInfo(phase.name),
            calculationMethod: 'SunCalc'
        };
    },
    
    _calculateSimple(date = new Date()) {
        // Algoritmo SIMPLÍSSIMO baseado no dia do ano
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        // Fórmula simplificada: ciclo de 29.5 dias
        const dayOfYear = this._getDayOfYear(date);
        const moonPhase = (dayOfYear % 29.5) / 29.5;
        
        const phase = this._determinePhase(moonPhase);
        const illumination = Math.round(this._calculateIllumination(moonPhase) * 100);
        
        return {
            phase: phase.name,
            emoji: phase.emoji,
            percentage: illumination,
            phaseValue: moonPhase,
            illumination: illumination / 100,
            fishingInfo: this.getFishingInfo(phase.name),
            calculationMethod: 'Cálculo local simples'
        };
    },
    
    _getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    },
    
    _calculateIllumination(phase) {
        // Fórmula simples para iluminação
        return 0.5 * (1 - Math.cos(2 * Math.PI * phase));
    },
    
    _determinePhase(phaseValue) {
        for (const phase of this.MOON_PHASES) {
            if (phaseValue >= phase.min && phaseValue < phase.max) {
                return phase;
            }
        }
        return this.MOON_PHASES[0]; // Fallback: Lua Nova
    },
    
    _getPhaseScore(phaseName) {
        const phase = this.MOON_PHASES.find(p => p.name === phaseName);
        return phase ? phase.score : 5;
    },
    
    _getFishActivity(phaseName) {
        const scores = {
            'Lua Nova': 'Muito Alta',
            'Crescente': 'Alta',
            'Quarto Crescente': 'Muito Alta',
            'Gibosa Crescente': 'Moderada',
            'Lua Cheia': 'Muito Alta',
            'Gibosa Minguante': 'Moderada',
            'Quarto Minguante': 'Alta',
            'Lua Minguante': 'Baixa'
        };
        return scores[phaseName] || 'Moderada';
    },
    
    _getDayName(date) {
        const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        return days[date.getDay()];
    },
    
    // ============ RENDERIZAÇÃO ============
    
    render(container, phaseData) {
        if (!container) return;
        
        const fishingInfo = phaseData.fishingInfo || this.getFishingInfo(phaseData.phase);
        
        container.innerHTML = `
            <div class="lunar-phase-card">
                <div class="lunar-header">
                    <div class="lunar-phase-icon">
                        <span class="moon-emoji">${phaseData.emoji}</span>
                        <div class="moon-phase">
                            <div class="moon-phase-name">${phaseData.phase}</div>
                            <div class="moon-percentage">${phaseData.percentage}% iluminada</div>
                        </div>
                    </div>
                    <div class="lunar-score">
                        <div class="score-label">PONTUAÇÃO PESCA</div>
                        <div class="score-value">${fishingInfo.score}/10</div>
                    </div>
                </div>
                
                <div class="lunar-details">
                    <div class="detail-item">
                        <i class="fas fa-fish"></i>
                        <div>
                            <div class="detail-label">Atividade dos Peixes</div>
                            <div class="detail-value">${fishingInfo.fishActivity}</div>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <div>
                            <div class="detail-label">Melhor Horário</div>
                            <div class="detail-value">${fishingInfo.bestTime}</div>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <i class="fas fa-worm"></i>
                        <div>
                            <div class="detail-label">Isca Recomendada</div>
                            <div class="detail-value">${fishingInfo.recommendedBait}</div>
                        </div>
                    </div>
                </div>
                
                <div class="fishing-tip">
                    <i class="fas fa-lightbulb"></i>
                    <p>${fishingInfo.tip}</p>
                </div>
                
                <div class="lunar-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${phaseData.percentage}%"></div>
                    </div>
                    <div class="progress-labels">
                        <span>🌑 Nova</span>
                        <span>🌕 Cheia</span>
                    </div>
                </div>
            </div>
        `;
    },
    
    renderForecast(container, forecast) {
        if (!container || !forecast || !forecast.length) return;
        
        container.innerHTML = forecast.map(day => `
            <div class="forecast-day">
                <div class="forecast-date">${day.dayName}<br>${day.shortDate}</div>
                <div class="forecast-moon">
                    <span class="forecast-emoji">${day.emoji}</span>
                    <div class="forecast-phase">${day.phase}</div>
                </div>
                <div class="forecast-score">
                    <div class="forecast-percentage">${day.percentage}%</div>
                    <div class="forecast-fishing">${day.fishingInfo.score}/10</div>
                </div>
            </div>
        `).join('');
    }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LunarPhaseCalculator;
} else {
    window.LunarPhaseCalculator = LunarPhaseCalculator;
}

console.log('🌙 LunarPhaseCalculator v3.0.0 - SIMPLES e FUNCIONAL!');