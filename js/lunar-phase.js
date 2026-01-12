// lunar-phase-novo.js - VERSÃO 100% FUNCIONAL
// Copie e cole isto em um NOVO arquivo

const LunarPhaseCalculator = {
    // CONSTANTES
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
    
    // MÉTODO PRINCIPAL
    calculatePhase(date = new Date()) {
        try {
            // Usar SunCalc diretamente
            const moon = SunCalc.getMoonIllumination(date);
            
            // Determinar fase
            let phaseName = 'Lua Nova';
            let emoji = '🌑';
            let score = 9;
            
            if (moon.phase < 0.03 || moon.phase > 0.97) {
                phaseName = 'Lua Nova'; emoji = '🌑'; score = 9;
            } else if (moon.phase < 0.25) {
                phaseName = 'Crescente'; emoji = '🌒'; score = 7;
            } else if (moon.phase < 0.28) {
                phaseName = 'Quarto Crescente'; emoji = '🌓'; score = 8;
            } else if (moon.phase < 0.47) {
                phaseName = 'Gibosa Crescente'; emoji = '🌔'; score = 6;
            } else if (moon.phase < 0.53) {
                phaseName = 'Lua Cheia'; emoji = '🌕'; score = 9;
            } else if (moon.phase < 0.72) {
                phaseName = 'Gibosa Minguante'; emoji = '🌖'; score = 5;
            } else if (moon.phase < 0.75) {
                phaseName = 'Quarto Minguante'; emoji = '🌗'; score = 7;
            } else {
                phaseName = 'Lua Minguante'; emoji = '🌘'; score = 4;
            }
            
            return {
                phase: phaseName,
                emoji: emoji,
                percentage: Math.round(moon.fraction * 100),
                phaseValue: moon.phase,
                illumination: moon.fraction,
                fishingInfo: {
                    score: score,
                    tip: this._getFishingTip(phaseName),
                    bestTime: this._getBestTime(phaseName),
                    recommendedBait: this._getRecommendedBait(phaseName),
                    fishActivity: this._getFishActivity(phaseName)
                },
                calculationMethod: 'SunCalc'
            };
            
        } catch (error) {
            console.error('Erro:', error);
            return this._getFallback(date);
        }
    },
    
    // MÉTODOS AUXILIARES
    _getFishingTip(phaseName) {
        const tips = {
            'Lua Nova': 'Excelente para pesca noturna!',
            'Crescente': 'Boa para pesca diurna.',
            'Quarto Crescente': 'Ótima para pesca ao entardecer.',
            'Gibosa Crescente': 'Condições moderadas.',
            'Lua Cheia': 'Excelente para pesca noturna!',
            'Gibosa Minguante': 'Pesca ao amanhecer.',
            'Quarto Minguante': 'Boa para pesca de fundo.',
            'Lua Minguante': 'Pesca mais desafiadora.'
        };
        return tips[phaseName] || 'Condições normais.';
    },
    
    _getBestTime(phaseName) {
        const times = {
            'Lua Nova': 'Noite e Madrugada',
            'Crescente': 'Manhã e Tarde',
            'Quarto Crescente': 'Entardecer',
            'Gibosa Crescente': 'Tarde e Noite',
            'Lua Cheia': 'Noite Inteira',
            'Gibosa Minguante': 'Amanhecer',
            'Quarto Minguante': 'Manhã',
            'Lua Minguante': 'Meio-dia'
        };
        return times[phaseName] || 'Manhã e Tarde';
    },
    
    _getRecommendedBait(phaseName) {
        const baits = {
            'Lua Nova': 'Iscas luminosas',
            'Crescente': 'Iscas naturais',
            'Quarto Crescente': 'Jigs, plugs',
            'Gibosa Crescente': 'Iscas de silicone',
            'Lua Cheia': 'Poppers, superficiais',
            'Gibosa Minguante': 'Iscas naturais',
            'Quarto Minguante': 'Iscas de fundo',
            'Lua Minguante': 'Iscas vivas'
        };
        return baits[phaseName] || 'Iscas naturais';
    },
    
    _getFishActivity(phaseName) {
        const activity = {
            'Lua Nova': 'Muito Alta',
            'Crescente': 'Alta',
            'Quarto Crescente': 'Muito Alta',
            'Gibosa Crescente': 'Moderada',
            'Lua Cheia': 'Muito Alta',
            'Gibosa Minguante': 'Moderada',
            'Quarto Minguante': 'Alta',
            'Lua Minguante': 'Baixa'
        };
        return activity[phaseName] || 'Moderada';
    },
    
    _getFallback(date) {
        return {
            phase: 'Lua Nova',
            emoji: '🌑',
            percentage: 0,
            phaseValue: 0,
            illumination: 0,
            fishingInfo: {
                score: 9,
                tip: 'Dados temporariamente indisponíveis.',
                bestTime: 'Manhã e Tarde',
                recommendedBait: 'Iscas naturais',
                fishActivity: 'Moderada'
            },
            calculationMethod: 'Fallback'
        };
    },
    
    calculateForecast(startDate = new Date(), days = 7) {
        const forecast = [];
        for (let i = 0; i < days; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            forecast.push(this.calculatePhase(date));
        }
        return forecast;
    }
};

// Exportar
window.LunarPhaseCalculator = LunarPhaseCalculator;
console.log('🌙 Sistema lunar SIMPLES carregado!');