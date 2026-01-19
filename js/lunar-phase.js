// ==============================================
// PescApp - Sistema de Fases da Lua (CORRIGIDO)
// Versão: 2.0 - Sem loops infinitos
// ==============================================

class LunarPhaseCalculator {
    constructor() {
        console.log("✅ Sistema Lunar iniciado");
        this.lunarCycle = 29.53058867; // Duração do ciclo lunar em dias
    }

    // ==================== CÁLCULO SIMPLES E CONFIÁVEL ====================

    calculatePhase(date = new Date()) {
        // Data de referência: Lua Nova em 1 de janeiro de 2000
        const referenceNewMoon = new Date(2000, 0, 6, 18, 14, 0);
        const daysSinceReference = (date - referenceNewMoon) / (1000 * 60 * 60 * 24);
        
        // Idade da lua em dias (0 = lua nova)
        const moonAge = daysSinceReference % this.lunarCycle;
        if (moonAge < 0) moonAge += this.lunarCycle;
        
        // Converter para porcentagem (0-100%)
        const phasePercentage = (moonAge / this.lunarCycle) * 100;
        
        return {
            age: moonAge,
            percentage: phasePercentage,
            phase: this._getPhaseName(phasePercentage),
            icon: this._getPhaseIcon(phasePercentage)
        };
    }

    // ==================== PREVISÃO PARA OS PRÓXIMOS DIAS ====================

    getForecast(days = 7) {
        const forecast = [];
        const today = new Date();
        
        for (let i = 0; i < days; i++) {
            const forecastDate = new Date(today);
            forecastDate.setDate(today.getDate() + i);
            
            const phaseData = this.calculatePhase(forecastDate);
            
            forecast.push({
                date: forecastDate,
                dayName: this.getDayName(forecastDate),
                phase: phaseData.phase,
                icon: phaseData.icon,
                percentage: phaseData.percentage,
                age: phaseData.age
            });
        }
        
        // VERIFICAÇÃO DE CONSISTÊNCIA
        this._validateForecastConsistency(forecast);
        
        return forecast;
    }

    // ==================== FUNÇÕES AUXILIARES (CORRETAS) ====================

    getDayName(date) {
        const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        return days[date.getDay()];
    }

    _getPhaseName(percentage) {
        if (percentage < 1.5 || percentage > 98.5) return "Nova";
        if (percentage < 23.5) return "Crescente";
        if (percentage < 26.5) return "Quarto Crescente";
        if (percentage < 48.5) return "Crescente Gibosa";
        if (percentage < 51.5) return "Cheia";
        if (percentage < 73.5) return "Minguante Gibosa";
        if (percentage < 76.5) return "Quarto Minguante";
        return "Minguante";
    }

    _getPhaseIcon(percentage) {
        if (percentage < 1.5 || percentage > 98.5) return "🌑";
        if (percentage < 23.5) return "🌒";
        if (percentage < 26.5) return "🌓";
        if (percentage < 48.5) return "🌔";
        if (percentage < 51.5) return "🌕";
        if (percentage < 73.5) return "🌖";
        if (percentage < 76.5) return "🌗";
        return "🌘";
    }

    // ==================== VALIDAÇÃO DE CONSISTÊNCIA ====================

    _validateForecastConsistency(forecast) {
        console.log("🔍 Validando consistência da previsão...");
        
        const phaseOrder = ["Nova", "Crescente", "Quarto Crescente", "Crescente Gibosa", 
                           "Cheia", "Minguante Gibosa", "Quarto Minguante", "Minguante"];
        
        let hasInconsistency = false;
        
        for (let i = 1; i < forecast.length; i++) {
            const currentPhase = forecast[i].phase;
            const previousPhase = forecast[i-1].phase;
            
            // Encontrar índices na ordem correta
            const currentIndex = phaseOrder.indexOf(currentPhase);
            const previousIndex = phaseOrder.indexOf(previousPhase);
            
            // Verificar se a transição faz sentido
            const expectedNextIndex = (previousIndex + 1) % phaseOrder.length;
            
            if (currentIndex !== expectedNextIndex && currentIndex !== previousIndex) {
                console.warn(`⚠️ Inconsistência detectada: ${previousPhase} → ${currentPhase}`);
                hasInconsistency = true;
            }
        }
        
        if (!hasInconsistency) {
            console.log("✅ Previsão lunar consistente!");
        }
    }

    // ==================== MÉTODOS DE UTILIDADE ====================

    getCurrentPhase() {
        return this.calculatePhase();
    }

    getNextFullMoon() {
        const current = this.calculatePhase();
        const daysToFullMoon = (this.lunarCycle - current.age) % this.lunarCycle;
        
        const nextFullMoon = new Date();
        nextFullMoon.setDate(nextFullMoon.getDate() + Math.ceil(daysToFullMoon));
        
        return {
            date: nextFullMoon,
            daysFromNow: Math.ceil(daysToFullMoon),
            dayName: this.getDayName(nextFullMoon)
        };
    }
}

// ==================== INICIALIZAÇÃO E TESTE ====================

// Criar instância global
window.lunarCalculator = new LunarPhaseCalculator();

// Teste automático ao carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log("=== 🧪 TESTE DO SISTEMA LUNAR ===");
    
    // Testar função getDayName
    console.log("Teste getDayName:", lunarCalculator.getDayName(new Date()));
    
    // Testar previsão
    const forecast = lunarCalculator.getForecast(7);
    console.log("Previsão 7 dias:", forecast.map(f => `${f.dayName}: ${f.phase} ${f.icon}`));
    
    // Testar próxima lua cheia
    const nextFullMoon = lunarCalculator.getNextFullMoon();
    console.log(`Próxima lua cheia: ${nextFullMoon.dayName}, em ${nextFullMoon.daysFromNow} dias`);
    
    console.log("=== ✅ TESTE CONCLUÍDO ===");
    
    // Exibir no console de forma organizada
    console.table(forecast.map(f => ({
        Dia: f.dayName,
        Fase: f.phase,
        Ícone: f.icon,
        'Idade (dias)': f.age.toFixed(2)
    })));
});

// ==================== INTEGRAÇÃO COM A INTERFACE ====================

function displayLunarForecast() {
  if (!window.lunarCalculator) {
    console.error("Sistema lunar não carregado!");
    return;
  }
  
  try {
    // Obter previsão para 7 dias
    const forecast = lunarCalculator.getForecast(7);
    const container = document.getElementById('lunar-forecast');
    
    if (container) {
      // Criar HTML das fases
      container.innerHTML = forecast.map(day => `
        <div class="lunar-day" title="${day.phase} - ${day.age.toFixed(1)} dias">
          <div class="day">${day.dayName}</div>
          <div class="phase-icon">${day.icon}</div>
          <div class="phase-name">${day.phase}</div>
        </div>
      `).join('');
      
      console.log("✅ Previsão lunar exibida na interface!");
    }
    
    // Atualizar próxima lua cheia
    const nextFullMoon = lunarCalculator.getNextFullMoon();
    const fullMoonElement = document.getElementById('next-full-moon');
    if (fullMoonElement) {
      fullMoonElement.textContent = 
        `${nextFullMoon.dayName}, em ${nextFullMoon.daysFromNow} dias`;
    }
    
  } catch (error) {
    console.error("Erro ao exibir previsão lunar:", error);
    const container = document.getElementById('lunar-forecast');
    if (container) {
      container.innerHTML = '<div class="lunar-loading">Erro ao carregar previsão lunar</div>';
    }
  }
}

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
  console.log("📅 Iniciando sistema lunar da interface...");
  
  // Pequeno delay para garantir que tudo carregou
  setTimeout(displayLunarForecast, 100);
  
  // Atualizar a cada hora (opcional)
  // setInterval(displayLunarForecast, 60 * 60 * 1000);
});

// ==================== FIM DO ARQUIVO ====================