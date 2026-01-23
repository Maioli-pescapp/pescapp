// PescApp - Sistema com Arquivos Separados
// Carrega dados dinamicamente de arquivos por estado

// ============ SISTEMA DE ATUALIZAÇÃO AUTOMÁTICA ============
// NÃO ALTERE MANUALMENTE - O DEPLOY.JS ATUALIZA ESTA LINHA
const ULTIMO_COMMIT = 'c7c1c95-20260123-150606'; // ← SERÁ SUBSTITUÍDO PELO DEPLOY

// VERIFICAR SE PRECISA ATUALIZAR
(function verificarAtualizacao() {
    const COMMIT_SALVO = localStorage.getItem('pescapp_ultimo_commit');
    
    if (COMMIT_SALVO !== ULTIMO_COMMIT) {
        console.log('🔄 NOVA VERSÃO DETECTADA!');
        console.log('   Versão antiga:', COMMIT_SALVO);
        console.log('   Versão nova:', ULTIMO_COMMIT);
        
        // SALVAR NOVA VERSÃO
        localStorage.setItem('pescapp_ultimo_commit', ULTIMO_COMMIT);
        
        // SE É PWA INSTALADO, ATUALIZAR
        const isPWA = window.matchMedia('(display-mode: standalone)').matches || 
                     navigator.standalone ||
                     window.navigator.standalone;
        
        if (isPWA) {
            console.log('📱 PWA detectado - atualizando...');
            
            // 1. LIMPAR CACHE
            if ('caches' in window) {
                caches.keys().then(cacheNames => {
                    cacheNames.forEach(cacheName => {
                        caches.delete(cacheName);
                        console.log('🗑️ Cache removido:', cacheName);
                    });
                });
            }
            
            // 2. LIMPAR SERVICE WORKER
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(registrations => {
                    registrations.forEach(registration => {
                        registration.unregister();
                        console.log('🔄 Service Worker removido');
                    });
                });
            }
            
            // 3. RECARREGAR APÓS 1 SEGUNDO
            setTimeout(() => {
                console.log('🔄 Recarregando aplicativo...');
                window.location.reload(true); // true = força do servidor
            }, 1000);
        } else {
            console.log('🌐 Modo navegador - cache será atualizado na próxima visita');
        }
    } else {
        console.log('✅ Versão atual:', ULTIMO_COMMIT);
    }
})();
// ============ FIM DO SISTEMA DE ATUALIZAÇÃO ============

// ============ FORÇAR ATUALIZAÇÃO DO PWA ============
console.log('🔧 PescApp iniciando...');

// 1. Detectar se é PWA instalado
const isPWA = window.matchMedia('(display-mode: standalone)').matches;

if (isPWA) {
    console.log('📱 PWA DETECTADO');
    
    // 2. Versão atual do sistema lunar
    const LUNAR_VERSION = '3.0-corrigido-' + new Date().toISOString().split('T')[0];
    
    // 3. Verificar versão instalada
    if (localStorage.getItem('pescapp_lunar_version') !== LUNAR_VERSION) {
        console.log('🔄 ATUALIZAÇÃO NECESSÁRIA!');
        console.log('   Nova versão:', LUNAR_VERSION);
        
        // 4. Salvar nova versão
        localStorage.setItem('pescapp_lunar_version', LUNAR_VERSION);
        
        // 5. Limpar caches
        if ('caches' in window) {
            caches.keys().then(cacheNames => {
                cacheNames.forEach(name => caches.delete(name));
            });
        }
        
        // 6. Forçar recarregamento
        setTimeout(() => {
            console.log('🔄 Recarregando PWA...');
            window.location.reload(true);
        }, 1000);
    } else {
        console.log('✅ PWA já atualizado:', LUNAR_VERSION);
    }
}
// ============ FIM DO CÓDIGO ============

// ================= FORÇAR ATUALIZAÇÃO NO CELULAR =================
const FORCE_RELOAD_KEY = 'pescapp_force_reload';
const CURRENT_VERSION = '2';

// Verificar se precisa atualizar
if (localStorage.getItem(FORCE_RELOAD_KEY) !== CURRENT_VERSION) {
  console.log('🔄 Atualizando app para versão', CURRENT_VERSION);
  localStorage.setItem(FORCE_RELOAD_KEY, CURRENT_VERSION);
  
  // Forçar reload apenas uma vez
  if (!sessionStorage.getItem('already_reloaded')) {
    sessionStorage.setItem('already_reloaded', 'true');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
}
// ================= FIM DO CÓDIGO DE ATUALIZAÇÃO =================

// Variável global para dados
let fishingData = {
    estados: {}
};

// =============================================
// FUNÇÃO PARA CLASSIFICAR PRESSÃO
// =============================================

function classificarPressao(pressaoHPa) {
    if (pressaoHPa > 1020) return 'Alta';
    if (pressaoHPa < 1000) return 'Baixa';
    return 'Estável';
}

function obterCategoriaPressao(valorPressao) {
    if (!valorPressao || typeof valorPressao !== 'number') {
        return 'Estável';
    }
    return classificarPressao(valorPressao);
}

// =============================================
// FUNÇÃO SIMPLES PARA MARÉ (BASEADA NA HORA)
// =============================================

function obterStatusMarePorHora() {
    const agora = new Date();
    const horaAtual = agora.getHours();
    const minutos = agora.getMinutes();
    
    // Ciclo simplificado para ES (6h de ciclo)
    // 0-3h: Alta / 3-6h: Vazando / 6-9h: Baixa / 9-12h: Enchendo
    // 12-15h: Alta / 15-18h: Vazando / 18-21h: Baixa / 21-24h: Enchendo
    
    if ((horaAtual >= 0 && horaAtual < 3) || (horaAtual >= 12 && horaAtual < 15)) {
        return { status: 'Alta 📈', detalhes: 'Maré cheia' };
    }
    else if ((horaAtual >= 3 && horaAtual < 6) || (horaAtual >= 15 && horaAtual < 18)) {
        return { status: 'Vazando ↘️', detalhes: 'Maré descendo' };
    }
    else if ((horaAtual >= 6 && horaAtual < 9) || (horaAtual >= 18 && horaAtual < 21)) {
        return { status: 'Baixa 📉', detalhes: 'Maré baixa' };
    }
    else {
        return { status: 'Enchendo ↗️', detalhes: 'Maré subindo' };
    }
}

// ============ ADICIONE AQUI ============

function classificarVento(velocidadeMs) {
    if (velocidadeMs < 3) return 'Calmo';
    if (velocidadeMs < 6) return 'Fraco';
    if (velocidadeMs < 10) return 'Moderado';
    if (velocidadeMs < 15) return 'Forte';
    return 'Muito Forte';
}

function variarDirecaoVento(direcaoAtual) {
    const direcoes = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'];
    const indexAtual = direcoes.indexOf(direcaoAtual);
    
    if (indexAtual === -1) return direcoes[Math.floor(Math.random() * direcoes.length)];
    
    const variacao = Math.floor(Math.random() * 3) - 1;
    const novoIndex = (indexAtual + variacao + direcoes.length) % direcoes.length;
    
    return direcoes[novoIndex];
}

// Cache para dados já carregados
const dadosCache = {};

// =============================================
// FUNÇÕES DE CARREGAMENTO
// =============================================

// Função para carregar dados de um estado
async function carregarDadosEstado(estadoSigla) {
    console.log(`Tentando carregar dados de ${estadoSigla}...`);
    
    // Se já está no cache, usa do cache
    if (dadosCache[estadoSigla]) {
        console.log(`Usando dados de ${estadoSigla} do cache`);
        fishingData.estados[estadoSigla] = dadosCache[estadoSigla];
        return true;
    }
    
    showLoading(true, `Carregando dados de ${estadoSigla}...`);
    
    try {
        // Tenta carregar o arquivo do estado
        const resposta = await fetch(`js/data/${estadoSigla.toLowerCase()}.js`);

        // VERIFICAÇÃO ESPECIAL PARA ES - Usar novo banco de dados
        if (estadoSigla === 'ES' && typeof databaseES !== 'undefined') {
            console.log('🎯 Usando banco de dados VERIFICADO para ES');
            
            // Usar o novo banco de dados para ES
            dadosCache[estadoSigla] = {
                nome: databaseES.metadata.nome,
                sigla: databaseES.metadata.sigla,
                regiao: databaseES.metadata.regiao,
                kmCosta: databaseES.metadata.kmCosta,
                infoGeral: databaseES.metadata.infoGeral,
                cidades: databaseES.cidades
            };
            
            fishingData.estados[estadoSigla] = dadosCache[estadoSigla];
            
            console.log(`Dados de ${estadoSigla} carregados do novo banco!`);
            console.log(`Cidades disponíveis:`, Object.keys(fishingData.estados[estadoSigla].cidades || {}));
            
            showLoading(false);
            return true;
        }
        
        if (!resposta.ok) {
            throw new Error(`Arquivo ${estadoSigla}.js não encontrado`);
        }
        
        const codigoJS = await resposta.text();
        console.log(`Arquivo ${estadoSigla}.js carregado, ${codigoJS.length} bytes`);
        
        // Extrair os dados do arquivo JavaScript
        // Procura por "const dadosES = {" ou similar
        const regex = /const dados([A-Z]{2})\s*=\s*({[\s\S]*?});/;
        const match = codigoJS.match(regex);
        
        if (!match) {
            // Tentar outro formato
            const regex2 = /const dadosES\s*=\s*({[\s\S]*?});/;
            const match2 = codigoJS.match(regex2);
            
            if (!match2) {
                throw new Error('Formato do arquivo não reconhecido');
            }
            
            // Usar eval para converter string em objeto (cuidado!)
            const dadosObj = eval(`(${match2[1]})`);
            dadosCache[estadoSigla] = dadosObj;
            fishingData.estados[estadoSigla] = dadosObj;
        } else {
            // Usar eval para converter string em objeto
            const dadosObj = eval(`(${match[2]})`);
            dadosCache[estadoSigla] = dadosObj;
            fishingData.estados[estadoSigla] = dadosObj;
        }
        
        console.log(`Dados de ${estadoSigla} carregados com sucesso!`);
        console.log(`Cidades disponíveis:`, Object.keys(fishingData.estados[estadoSigla].cidades || {}));
        
        showLoading(false);
        return true;
        
    } catch (error) {
        console.error('Erro ao carregar dados do estado:', error);
        showLoading(false);
        
        // Criar objeto vazio para o estado
        fishingData.estados[estadoSigla] = {
            nome: estadoSigla,
            sigla: estadoSigla,
            cidades: {}
        };
        
        return false;
    }
}

// Função para carregar lista de estados
async function carregarListaEstados() {
    try {
        const resposta = await fetch('js/data/estados.json');
        if (!resposta.ok) {
            throw new Error('Arquivo estados.json não encontrado');
        }
        
        const estados = await resposta.json();
        console.log('Lista de estados carregada:', estados.length, 'estados');
        return estados;
        
    } catch (error) {
        console.warn('Erro ao carregar estados.json, usando lista padrão:', error);
        
        // Lista padrão
        return [
            { sigla: "ES", nome: "Espírito Santo", arquivo: "es.js", disponivel: true }
        ];
    }
}

// =============================================
// FUNÇÕES DO APP (mantidas)
// =============================================

function showLoading(show, mensagem = "Carregando...") {
    const loadingDiv = document.getElementById('loadingIndicator');
    if (show) {
        loadingDiv.style.display = 'block';
        if (mensagem) {
            loadingDiv.querySelector('p').textContent = mensagem;
        }
    } else {
        loadingDiv.style.display = 'none';
    }
}


// =============================================
// FUNÇÃO PARA LIMPAR RESULTADOS ANTERIORES
// =============================================

function limparResultadosAnteriores() {
    console.log('🔄 Limpando resultados anteriores...');
    
    // 1. Esconder seção de resultados
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection) {
        resultsSection.style.display = 'none';
    }
    
    // 2. Limpar dados meteorológicos
    const elementosMeteo = document.querySelectorAll('.real-time-data');
    elementosMeteo.forEach(elemento => {
        console.log('Removendo elemento meteorológico:', elemento);
        elemento.remove();
    });
    
    // 3. Limpar características
    const characteristicsContainer = document.getElementById('locationCharacteristics');
    if (characteristicsContainer) {
        characteristicsContainer.innerHTML = '';
    }
    
    // 4. Limpar recomendações
    const recommendationsContainer = document.getElementById('recommendationsList');
    if (recommendationsContainer) {
        recommendationsContainer.innerHTML = '';
    }
    
    // 5. Limpar previsão
    const forecastContainer = document.getElementById('forecastCards');
    if (forecastContainer) {
        forecastContainer.innerHTML = '';
    }
    
    // 6. Limpar detalhes da probabilidade
    const detailsElement = document.getElementById('probabilityDetails');
    if (detailsElement) {
        detailsElement.innerHTML = '';
        detailsElement.style.display = 'none';
    }
    
    // 7. Limpar título e descrição
    const titleElement = document.getElementById('locationTitle');
    const descElement = document.getElementById('locationDescription');
    const qualityElement = document.getElementById('dataQualityIndicator');
    
    if (titleElement) titleElement.textContent = '';
    if (descElement) descElement.textContent = '';
    if (qualityElement) qualityElement.innerHTML = '';
    
    // 8. Resetar badge de probabilidade
    const probElement = document.getElementById('overallProbability');
    if (probElement) {
        probElement.textContent = '0/10';
        probElement.className = 'probability-badge probability-low';
        probElement.title = '';
    }

    // ============ ADICIONE ESTA LINHA ============
    // 9. Limpar dados da praia anterior
    window.praiaAtual = null;
    window.ultimaMeteorologia = null;
    // =============================================
    
    console.log('✅ Limpeza concluída');
}

function renderCharacteristics(characteristics) {
    const container = document.getElementById('locationCharacteristics');
    container.innerHTML = '';
    
    // Se characteristics é um array (formato antigo)
    if (Array.isArray(characteristics)) {
        characteristics.forEach(char => {
            const charCard = document.createElement('div');
            charCard.className = 'characteristic-card';
            charCard.innerHTML = `
                <h4><i class="fas ${char.icon}"></i> ${char.title}</h4>
                <p>${char.value}</p>
            `;
            container.appendChild(charCard);
        });
    } 
    // Se characteristics é um objeto (novo formato)
    else if (typeof characteristics === 'object' && characteristics !== null) {
        // Converter objeto em array de pares chave-valor
        const entries = Object.entries(characteristics);
        
        // Mapear para o formato antigo (compatibilidade)
        const mapeamentoIcones = {
            'ventosPredominantes': 'fa-wind',
            'temperaturaAgua': 'fa-temperature-high',
            'profundidadeMedia': 'fa-ruler',
            'salinidade': 'fa-water',
            'transparenciaAgua': 'fa-eye',
            'fundo': 'fa-mountain',
            'correnteza': 'fa-water',
            'acesso': 'fa-road',
            'infraestrutura': 'fa-home',
            'perigo': 'fa-exclamation-triangle'
        };
        
        entries.forEach(([key, value]) => {
            // Formatar o valor
            let valorFormatado = value;
            if (key === 'temperaturaAgua' && typeof value === 'object') {
                valorFormatado = `${value.min}-${value.max}${value.unidade || '°C'}`;
            } else if (key === 'profundidadeMedia' && typeof value === 'object') {
                valorFormatado = `${value.min}-${value.max}${value.unidade || 'm'}`;
            }
            
            const charCard = document.createElement('div');
            charCard.className = 'characteristic-card';
            
            // Traduzir título
            const titulos = {
                'ventosPredominantes': 'Ventos',
                'temperaturaAgua': 'Temp. Água',
                'profundidadeMedia': 'Profundidade',
                'salinidade': 'Salinidade',
                'transparenciaAgua': 'Transparência',
                'fundo': 'Tipo de Fundo',
                'correnteza': 'Correnteza',
                'acesso': 'Acesso',
                'infraestrutura': 'Infraestrutura',
                'perigo': 'Perigos'
            };
            
            charCard.innerHTML = `
                <h4><i class="fas ${mapeamentoIcones[key] || 'fa-info-circle'}"></i> ${titulos[key] || key}</h4>
                <p>${valorFormatado}</p>
            `;
            container.appendChild(charCard);
        });
    }
    // Se não tem características
    else {
        container.innerHTML = '<p class="no-data">Características não disponíveis</p>';
    }
}

function renderRecommendations(recommendations) {
    const container = document.getElementById('recommendationsList');
    container.innerHTML = '';
    
    // Se recommendations é um array (formato antigo)
    if (Array.isArray(recommendations)) {
        recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            container.appendChild(li);
        });
    } 
    // Se recommendations é undefined mas temos informacoesPesca (novo formato)
    else if (!recommendations && window.praiaAtual && window.praiaAtual.informacoesPesca) {
        const infoPesca = window.praiaAtual.informacoesPesca;
        
        // Adicionar técnicas recomendadas
        if (infoPesca.tecnicasRecomendadas && infoPesca.tecnicasRecomendadas.length > 0) {
            infoPesca.tecnicasRecomendadas.forEach(tecnica => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${tecnica.tecnica}:</strong> ${tecnica.eficacia}% de eficácia`;
                container.appendChild(li);
            });
        }
        
        // Adicionar iscas eficazes
        if (infoPesca.iscasEficazes && infoPesca.iscasEficazes.length > 0) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>Iscas recomendadas:</strong> ${infoPesca.iscasEficazes.join(', ')}`;
            container.appendChild(li);
        }
        
        // Adicionar equipamento sugerido
        if (infoPesca.equipamentoSugerido) {
            const equip = infoPesca.equipamentoSugerido;
            const li = document.createElement('li');
            li.innerHTML = `<strong>Equipamento:</strong> Vara ${equip.vara}, linha ${equip.linha}`;
            container.appendChild(li);
        }
        
        // Adicionar melhores períodos
        if (infoPesca.melhoresPeriodos && infoPesca.melhoresPeriodos.diario) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>Melhores horários:</strong> ${infoPesca.melhoresPeriodos.diario.join(', ')}`;
            container.appendChild(li);
        }
    }
    // Se não tem recomendações
    else {
        const li = document.createElement('li');
        li.textContent = 'Recomendações não disponíveis';
        container.appendChild(li);
    }
}

function generateForecast() {
    const forecasts = [];
    const today = new Date();
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    // ============ DADOS REAIS DA API ============
    const dadosReais = window.ultimaMeteorologia || {};
    const pressaoReal = dadosReais.pressao || 1013; // Fallback se não tiver dados
    const ventoReal = dadosReais.vento || 10; // Fallback se não tiver dados
    const direcaoVentoReal = dadosReais.direcaoVento || 'NE'; // Fallback
    
    // ============ CLASSIFICAÇÕES ============
    const categoriaPressaoReal = obterCategoriaPressao(pressaoReal);
    const categoriaVentoReal = classificarVento(ventoReal);
    
    console.log('📊 Dados reais para previsão:', {
        pressao: `${pressaoReal} hPa (${categoriaPressaoReal})`,
        vento: `${ventoReal} m/s (${categoriaVentoReal}) ${direcaoVentoReal}`
    });
    
    for (let i = 0; i < 3; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const dateStr = `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
        
        // ============ PROBABILIDADE MELHORADA ============
        const probabilidadeBase = window.ultimaProbabilidade ? window.ultimaProbabilidade.score : 5;
        let probability;
        
        if (i === 0) {
            // HOJE: usar probabilidade real da API
            probability = probabilidadeBase >= 7 ? 'Alta' : 
                         probabilidadeBase >= 5 ? 'Média' : 'Baixa';
        } else {
            // FUTURO: variação baseada na probabilidade de hoje
            const variacao = Math.random() * 2 - 1; // -1 a +1
            const probFutura = Math.max(0, Math.min(10, probabilidadeBase + variacao));
            probability = probFutura >= 7 ? 'Alta' : 
                         probFutura >= 5 ? 'Média' : 'Baixa';
        }
        
        // ============ PRESSÃO PARA CADA DIA ============
        let pressaoValor, pressaoCategoria;
        
        if (i === 0) {
            // HOJE: usar valor REAL
            pressaoValor = Math.round(pressaoReal);
            pressaoCategoria = categoriaPressaoReal;
        } else if (i === 1) {
            // AMANHÃ: variação de +/- 3-8 hPa
            const variacao = (Math.random() * 5 + 3) * (Math.random() > 0.5 ? 1 : -1);
            pressaoValor = Math.round(pressaoReal + variacao);
            pressaoCategoria = obterCategoriaPressao(pressaoValor);
        } else {
            // DEPOIS DE AMANHÃ: variação de +/- 5-12 hPa
            const variacao = (Math.random() * 7 + 5) * (Math.random() > 0.5 ? 1 : -1);
            pressaoValor = Math.round(pressaoReal + variacao);
            pressaoCategoria = obterCategoriaPressao(pressaoValor);
        }
        
        // ============ VENTO PARA CADA DIA ============
        let ventoValor, ventoCategoria, direcaoVento;
        
        if (i === 0) {
            // HOJE: usar valor REAL
            ventoValor = ventoReal.toFixed(1);
            ventoCategoria = categoriaVentoReal;
            direcaoVento = direcaoVentoReal;
        } else if (i === 1) {
            // AMANHÃ: variação de +/- 30%
            const variacaoPercentual = (Math.random() * 0.6 - 0.3); // -30% a +30%
            ventoValor = (ventoReal * (1 + variacaoPercentual)).toFixed(1);
            ventoCategoria = classificarVento(parseFloat(ventoValor));
            direcaoVento = variarDirecaoVento(direcaoVentoReal);
        } else {
            // DEPOIS: variação maior +/- 50%
            const variacaoPercentual = (Math.random() * 1.0 - 0.5); // -50% a +50%
            ventoValor = (ventoReal * (1 + variacaoPercentual)).toFixed(1);
            ventoCategoria = classificarVento(parseFloat(ventoValor));
            direcaoVento = variarDirecaoVento(direcaoVentoReal);
        }
        
        // ============ MARÉ ============
        let tide;
        if (i === 0) {
            // HOJE: usar status baseado na hora atual
            const mareHoje = obterStatusMarePorHora();
            tide = mareHoje.status; // Ex: "Vazando ↘️"
        } else if (i === 1) {
            // AMANHÃ: status provável (avançar 6 horas no ciclo)
            const horaAmanha = (new Date().getHours() + 6) % 24;
            if (horaAmanha < 3 || (horaAmanha >= 12 && horaAmanha < 15)) {
                tide = 'Alta 📈';
            } else if (horaAmanha < 6 || (horaAmanha >= 15 && horaAmanha < 18)) {
                tide = 'Vazando ↘️';
            } else if (horaAmanha < 9 || (horaAmanha >= 18 && horaAmanha < 21)) {
                tide = 'Baixa 📉';
            } else {
                tide = 'Enchendo ↗️';
            }
        } else {
            // DEPOIS: variação aleatória
            const opcoes = ['Alta 📈', 'Vazando ↘️', 'Baixa 📉', 'Enchendo ↗️'];
            tide = opcoes[Math.floor(Math.random() * opcoes.length)];
        }
        
        forecasts.push({
            date: dateStr,
            probability: probability,
            moon: window.lunarCalculator ? window.lunarCalculator.getForecast(3)[i].phase : 'Crescente',
            moonIcon: window.lunarCalculator ? window.lunarCalculator.getForecast(3)[i].icon : '🌒',
            wind: `${ventoValor} m/s (${ventoCategoria}) ${direcaoVento}`,
            pressure: `${pressaoValor} hPa (${pressaoCategoria})`,
            tide: tide
        });
    }
    
    console.log('📅 Previsão gerada:', forecasts);
    return forecasts;
}

function renderForecast(forecasts) {
    const container = document.getElementById('forecastCards');
    container.innerHTML = '';
    
    forecasts.forEach(forecast => {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        
        const probClass = forecast.probability === 'Alta' ? 'probability-high' : 
                         forecast.probability === 'Média' ? 'probability-medium' : 'probability-low';
        
        card.innerHTML = `
            <div class="forecast-header">
                <div class="forecast-date">${forecast.date}</div>
                <div class="probability-badge ${probClass}">${forecast.probability}</div>
            </div>
            <div class="forecast-details">
                <div class="forecast-item">
                    <div class="forecast-icon"><i class="fas fa-moon"></i></div>
                    <div>
                        <div style="font-weight: 600;">Fase da Lua</div>
                        <div>${forecast.moonIcon} ${forecast.moon}</div>
                    </div>
                </div>
                <div class="forecast-item">
                    <div class="forecast-icon"><i class="fas fa-tachometer-alt"></i></div>
                    <div>
                        <div style="font-weight: 600;">Pressão</div>
                        <div>${forecast.pressure}</div>
                    </div>
                </div>
                <div class="forecast-item">
                    <div class="forecast-icon"><i class="fas fa-wind"></i></div>
                    <div>
                        <div style="font-weight: 600;">Vento</div>
                        <div>${forecast.wind}</div>
                    </div>
                </div>
                <div class="forecast-item">
                    <div class="forecast-icon"><i class="fas fa-water"></i></div>
                    <div>
                        <div style="font-weight: 600;">Maré</div>
                        <div>${forecast.tide}</div>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

async function showFishingInfo(estadoSigla, cidadeNome, praiaNome) {
    // ============ LIMPAR TUDO ANTES DE CARREGAR NOVO ============
    console.log('🔄 Iniciando showFishingInfo - limpando anterior...');
    
    // 1. Limpar dados meteorológicos ANTIGOS
    const elementosMeteoAntigos = document.querySelectorAll('.real-time-data');
    elementosMeteoAntigos.forEach(el => {
        console.log('Removendo elemento meteo antigo:', el);
        el.remove();
    });
    
    // 2. Limpar características
    const characteristicsContainer = document.getElementById('locationCharacteristics');
    if (characteristicsContainer) {
        characteristicsContainer.innerHTML = '';
    }
    
    // 3. Limpar recomendações
    const recommendationsContainer = document.getElementById('recommendationsList');
    if (recommendationsContainer) {
        recommendationsContainer.innerHTML = '';
    }
    
    // 4. Limpar previsão
    const forecastContainer = document.getElementById('forecastCards');
    if (forecastContainer) {
        forecastContainer.innerHTML = '';
    }
    
    // 5. Resetar interface
    document.getElementById('locationTitle').textContent = 'Carregando...';
    document.getElementById('locationDescription').textContent = '';
    document.getElementById('dataQualityIndicator').innerHTML = '';
    document.getElementById('overallProbability').textContent = '?/10';
    document.getElementById('overallProbability').className = 'probability-badge probability-low';
    showLoading(true, `Carregando informações...`);
    
    try {
        // Garantir que os dados do estado estão carregados
        if (!fishingData.estados[estadoSigla]) {
            console.log(`Estado ${estadoSigla} não carregado, tentando carregar...`);
            const sucesso = await carregarDadosEstado(estadoSigla);
            if (!sucesso) {
                throw new Error(`Não foi possível carregar dados de ${estadoSigla}`);
            }
        }
        
        const estado = fishingData.estados[estadoSigla];
        console.log(`Estado carregado:`, estado.nome);
        console.log(`Cidades disponíveis:`, Object.keys(estado.cidades || {}));
        
        if (!estado.cidades || !estado.cidades[cidadeNome]) {
            throw new Error(`Cidade "${cidadeNome}" não encontrada em ${estadoSigla}`);
        }
        
        const cidade = estado.cidades[cidadeNome];
        console.log(`Cidade carregada:`, cidadeNome);
        console.log(`Praias disponíveis:`, Object.keys(cidade.praias || {}));
        
        if (!cidade.praias || !cidade.praias[praiaNome]) {
            throw new Error(`Praia "${praiaNome}" não encontrada em ${cidadeNome}`);
        }
        
        const praia = cidade.praias[praiaNome];
        
        // Atualizar informações na tela
        const locationName = `${praiaNome}, ${cidadeNome} - ${estadoSigla}`;
        document.getElementById('locationTitle').textContent = locationName;
        document.getElementById('locationDescription').textContent = praia.descricao;
        
        // Mostrar qualidade dos dados
        const dataQualityDiv = document.getElementById('dataQualityIndicator');
        if (praia.dadosVerificados === true) {
            dataQualityDiv.innerHTML = '<span class="quality-badge quality-verified">✓ Dados verificados</span>';
        } else if (praia.dadosVerificados === false) {
            dataQualityDiv.innerHTML = '<span class="quality-badge quality-estimated">~ Dados estimados</span>';
        } else {
            dataQualityDiv.innerHTML = '<span class="quality-badge quality-generic">Dados básicos</span>';
        }
        
                // ============ PROBABILIDADE EM TEMPO REAL ============
        // Configurar parâmetros para cálculo
        const localAPI = `${cidadeNome}-${estadoSigla}`;
        const paramsProbabilidade = {
            local: localAPI,
            data: new Date(),
            praia: praia
        };
        
        let probabilidadeScore = 5; // Valor padrão
        let probabilidadeDetalhes = "Calculando...";
        let probabilidadeClass = "probability-medium";

        // ============ DADOS EM TEMPO REAL ============
        // Obter coordenadas da praia
        const coords = praia.verificacao?.coordenadasGPS?.split(',').map(c => parseFloat(c.trim())) || 
                    [-20.3155, -40.3128]; // Fallback Vitória

        // Buscar dados meteorológicos REAIS
        let dadosMeteoReais = null;
        try {
            if (typeof pescappAPI.meteorologia?.buscarMeteorologia === 'function') {
                dadosMeteoReais = await pescappAPI.meteorologia.buscarMeteorologia(coords[0], coords[1]);
            } else if (typeof pescappAPI.probabilidade._buscarMeteorologia === 'function') {
                dadosMeteoReais = await pescappAPI.probabilidade._buscarMeteorologia(localAPI, new Date());
            }


            // ===== ADICIONE ESTAS LINHAS NO FINAL (antes do catch) =====
    
            // Extrai coordenadas da praia
            const coordenadas = extrairCoordenadas(praia);
            
            // Mostra o mapa após 500ms (tempo para carregar resultados)
            setTimeout(() => {
                mostrarMapaDaPraia(praiaNome, coordenadas.lat, coordenadas.lng);
            }, 500);

            // ===== INTEGRAÇÃO COM O MAPA =====
            // Extrai coordenadas da praia
            const coordsPraia = extrairCoordenadas(praia);
            
            console.log('📍 Coordenadas extraídas:', coordsPraia);
            
            // Mostra o mapa após um pequeno delay
            setTimeout(() => {
                mostrarMapaDaPraia(praiaNome, coordsPraia.lat, coordsPraia.lng);
                
                // Garante que a praia atual tenha todas as propriedades necessárias
                if (window.praiaAtual) {
                    // Se já existe, atualiza coordenadas e garante que tem nome
                    window.praiaAtual.coordenadas = coordsPraia;
                    if (!window.praiaAtual.nome) {
                        window.praiaAtual.nome = praiaNome;
                    }
                    if (!window.praiaAtual.cidade) {
                        window.praiaAtual.cidade = cidadeNome;
                    }
                    if (!window.praiaAtual.estado) {
                        window.praiaAtual.estado = estadoSigla;
                    }
                } else {
                    // Se não existe, cria com todos os dados
                    window.praiaAtual = {
                        nome: praiaNome,
                        coordenadas: coordsPraia,
                        cidade: cidadeNome,
                        estado: estadoSigla
                    };
                }
                
            }, 300);
            // =================================

        } catch (error) {
            console.warn('Não foi possível obter dados meteorológicos:', error);
        }

        
        // Tentar calcular probabilidade em tempo real
        try {
            if (typeof pescappAPI !== 'undefined' && pescappAPI.probabilidade) {
                const resultado = await pescappAPI.probabilidade.calcular(paramsProbabilidade);
                
                probabilidadeScore = resultado.score;
                probabilidadeDetalhes = resultado.detalhes.join ? resultado.detalhes.join(' • ') : resultado.detalhes;
                
                // Definir classe CSS baseada no score
                if (probabilidadeScore >= 9) {
                    probabilidadeClass = "probability-excellent";
                } else if (probabilidadeScore >= 7) {
                    probabilidadeClass = "probability-high";
                } else if (probabilidadeScore >= 5) {
                    probabilidadeClass = "probability-medium";
                } else if (probabilidadeScore >= 3) {
                    probabilidadeClass = "probability-low";
                } else {
                    probabilidadeClass = "probability-poor";
                }
                
                console.log(`🎯 Probabilidade calculada: ${probabilidadeScore}/10`);
                console.log(`📊 Detalhes:`, resultado.detalhes);
                
                // Salvar para uso na previsão
                window.ultimaProbabilidade = resultado;
            } else {
                console.warn('APIs não disponíveis, usando probabilidade padrão');
                probabilidadeDetalhes = "APIs não disponíveis - usando dados básicos";
            }
        } catch (error) {
            console.warn('Erro ao calcular probabilidade:', error);
            probabilidadeDetalhes = `Erro: ${error.message}`;
        }
        
        // Atualizar interface
        const probElement = document.getElementById('overallProbability');
        probElement.textContent = `${probabilidadeScore}/10`;
        probElement.className = `probability-badge ${probabilidadeClass}`;
        probElement.title = probabilidadeDetalhes;
        
                // ============ EXIBIR DETALHES DA PROBABILIDADE ============
        const detailsElement = document.getElementById('probabilityDetails');
        if (detailsElement) {
            // Formatar detalhes bonitos
            let htmlDetalhes = '<div class="probability-factors">';
            
            if (window.ultimaProbabilidade && window.ultimaProbabilidade.fatores) {
                const fatores = window.ultimaProbabilidade.fatores;
                
                for (const [tipo, dados] of Object.entries(fatores)) {
                    const score = dados.score;
                    const emoji = getEmojiForScore(score);
                    const label = getLabelForFactor(tipo);
                    
                    htmlDetalhes += `
                        <div class="probability-factor">
                            <div class="factor-header">
                                <span class="factor-emoji">${emoji}</span>
                                <span class="factor-label">${label}</span>
                                <span class="factor-score">${score}/10</span>
                            </div>
                            <div class="factor-details">${dados.detalhes}</div>
                        </div>
                    `;
                }
                
                // Adicionar penalidades se houver
                if (fatores.restricoes && fatores.restricoes.penalidades && fatores.restricoes.penalidades.length > 0) {
                    htmlDetalhes += `
                        <div class="probability-warning">
                            <strong>⚠️ Atenção:</strong> ${fatores.restricoes.penalidades.join(', ')}
                        </div>
                    `;
                }
            } else {
                htmlDetalhes += `<div class="probability-factor">${probabilidadeDetalhes}</div>`;
            }
            
            htmlDetalhes += '</div>';
            detailsElement.innerHTML = htmlDetalhes;
            detailsElement.style.display = 'block';
        }

        // Funções auxiliares (fora do try-catch, mas dentro de showFishingInfo)
        function getEmojiForScore(score) {
            if (score >= 9) return '💪';
            if (score >= 7) return '👍';
            if (score >= 5) return '😐';
            if (score >= 3) return '⚠️';
            return '❌';
        }
        
        function getLabelForFactor(tipo) {
            const labels = {
                mare: 'Maré',
                atmosfera: 'Condições',
                local: 'Local',
                restricoes: 'Restrições'
            };
            return labels[tipo] || tipo;
        }
        
        // Renderizar características e recomendações
        renderCharacteristics(praia.caracteristicas);

        // Renderizar dados meteorológicos REAIS se disponíveis
        if (dadosMeteoReais) {
            renderDadosMeteorologicos(dadosMeteoReais);
         // ============ FORÇAR ATUALIZAÇÃO DA PRESSÃO ============
            setTimeout(() => {
                atualizarPressaoNaInterface();
            }, 1500);
            // =======================================================
        }

        // Salvar praia atual globalmente para a função renderRecommendations acessar
window.praiaAtual = praia;

// Se tem recomendacoes no formato antigo, usar
if (praia.recomendacoes) {
    renderRecommendations(praia.recomendacoes);
} 
// Se não tem, mas tem informacoesPesca (novo formato)
else if (praia.informacoesPesca) {
    renderRecommendations(null); // Vai usar window.praiaAtual
}
// Se não tem nada
else {
    renderRecommendations([]);
}
        
        // Gerar previsão
        const forecasts = generateForecast();
        renderForecast(forecasts);
        
        // Mostrar resultados
        showLoading(false);
        document.getElementById('resultsSection').style.display = 'block';
        console.log(`Informações de ${praiaNome} exibidas com sucesso!`);
        // CORREÇÃO FINAL: Remover elemento das restrições com undefined
        setTimeout(function() {
            const detailsElement = document.getElementById('probabilityDetails');
            if (detailsElement) {
                // Encontrar o elemento das restrições
                const factors = detailsElement.querySelectorAll('.probability-factor');
                
                factors.forEach((factor, index) => {
                    const labelElement = factor.querySelector('.factor-label');
                    if (labelElement && labelElement.textContent === 'Restrições') {
                        // Verificar se tem "undefined"
                        const detailsElement = factor.querySelector('.factor-details');
                        if (detailsElement && detailsElement.textContent === 'undefined') {
                            // REMOVER este elemento (fica só o aviso amarelo)
                            factor.remove();
                            console.log('✅ Elemento "Restrições" com undefined removido');
                        }
                    }
                });
            }
        }, 300);
        
    } catch (error) {
        console.error('Erro em showFishingInfo:', error);
        alert(`Erro: ${error.message}`);
        showLoading(false);
    }
}

// =============================================
// FUNÇÕES DOS FILTROS
// =============================================

async function carregarEstados() {
    const selectEstado = document.getElementById('estadoSelect');
    
    // Limpar opções existentes (exceto a primeira)
    while (selectEstado.options.length > 1) {
        selectEstado.remove(1);
    }
    
    // Carregar lista de estados
    const listaEstados = await carregarListaEstados();
    
    // Adicionar estados ao select
    listaEstados.forEach(estado => {
        const option = document.createElement('option');
        option.value = estado.sigla;
        option.textContent = `${estado.sigla} - ${estado.nome}`;
        
        // Se não estiver disponível, desabilitar
        if (estado.disponivel === false) {
            option.disabled = true;
            option.textContent += ' (em breve)';
        }
        
        selectEstado.appendChild(option);
    });
    
    console.log('Estados carregados no select:', listaEstados.length);
}

async function atualizarCidades() {
    const selectEstado = document.getElementById('estadoSelect');
    const selectCidade = document.getElementById('cidadeSelect');
    const selectPraia = document.getElementById('praiaSelect');
    
    const estadoSigla = selectEstado.value;
    
    // Limpar e desabilitar
    selectCidade.innerHTML = '<option value="">Selecione uma cidade</option>';
    selectPraia.innerHTML = '<option value="">Selecione uma praia</option>';
    selectCidade.disabled = !estadoSigla;
    selectPraia.disabled = true;
    
    if (!estadoSigla) return;
    
    // Carregar dados do estado se necessário
    if (!fishingData.estados[estadoSigla]) {
        console.log(`Carregando dados de ${estadoSigla} para mostrar cidades...`);
        await carregarDadosEstado(estadoSigla);
    }
    
    const estado = fishingData.estados[estadoSigla];
    
    if (!estado || !estado.cidades || Object.keys(estado.cidades).length === 0) {
        selectCidade.innerHTML = '<option value="">Nenhuma cidade disponível</option>';
        console.warn(`Nenhuma cidade encontrada para ${estadoSigla}`);
        return;
    }
    
    // Adicionar cidades
    Object.keys(estado.cidades).sort().forEach(cidadeNome => {
        const option = document.createElement('option');
        option.value = cidadeNome;
        option.textContent = cidadeNome;
        selectCidade.appendChild(option);
    });
    
    selectCidade.disabled = false;
    console.log(`Cidades de ${estadoSigla} carregadas:`, Object.keys(estado.cidades).length);
}

async function atualizarPraias() {
    const selectEstado = document.getElementById('estadoSelect');
    const selectCidade = document.getElementById('cidadeSelect');
    const selectPraia = document.getElementById('praiaSelect');
    
    const estadoSigla = selectEstado.value;
    const cidadeNome = selectCidade.value;
    
    // Limpar e desabilitar
    selectPraia.innerHTML = '<option value="">Selecione uma praia</option>';
    selectPraia.disabled = !cidadeNome;
    
    if (!estadoSigla || !cidadeNome) return;
    
    const estado = fishingData.estados[estadoSigla];
    
    if (!estado || !estado.cidades || !estado.cidades[cidadeNome]) {
        selectPraia.innerHTML = '<option value="">Cidade não encontrada</option>';
        return;
    }
    
    const cidade = estado.cidades[cidadeNome];
    
    if (!cidade || !cidade.praias || Object.keys(cidade.praias).length === 0) {
        selectPraia.innerHTML = '<option value="">Nenhuma praia disponível</option>';
        return;
    }
    
    // Adicionar praias
    Object.keys(cidade.praias).sort().forEach(praiaNome => {
        const option = document.createElement('option');
        option.value = praiaNome;
        option.textContent = praiaNome;
        selectPraia.appendChild(option);
    });
    
    selectPraia.disabled = false;
}

async function buscarPorFiltros() {
    const estadoSigla = document.getElementById('estadoSelect').value;
    const cidadeNome = document.getElementById('cidadeSelect').value;
    const praiaNome = document.getElementById('praiaSelect').value;
    
    if (!estadoSigla || !cidadeNome || !praiaNome) {
        alert('Por favor, selecione Estado, Cidade e Praia.');
        return;
    }
    
    await showFishingInfo(estadoSigla, cidadeNome, praiaNome);
}

async function buscarPorTexto() {
    const texto = document.getElementById('locationInput').value.trim().toLowerCase();
    
    if (!texto) {
        alert('Digite o nome de uma praia para buscar.');
        return;
    }
    
    showLoading(true, 'Buscando...');
    
    try {
        // Carregar ES primeiro (estado padrão)
        if (!fishingData.estados['ES']) {
            await carregarDadosEstado('ES');
        }
        
        const estadoES = fishingData.estados['ES'];
        
        // Procurar no ES
        for (const [cidadeNome, cidade] of Object.entries(estadoES.cidades)) {
            for (const [praiaNome, praia] of Object.entries(cidade.praias)) {
                if (praiaNome.toLowerCase().includes(texto) || 
                    cidadeNome.toLowerCase().includes(texto)) {
                    
                    // Preencher os selects
                    document.getElementById('estadoSelect').value = 'ES';
                    await atualizarCidades();
                    
                    setTimeout(async () => {
                        document.getElementById('cidadeSelect').value = cidadeNome;
                        await atualizarPraias();
                        
                        setTimeout(() => {
                            document.getElementById('praiaSelect').value = praiaNome;
                            showFishingInfo('ES', cidadeNome, praiaNome);
                        }, 100);
                    }, 100);
                    
                    return;
                }
            }
        }
        
        showLoading(false);
        alert('Local não encontrado no Espírito Santo. Tente "Praia de Camburi", "Jacaraípe", etc.');
        
    } catch (error) {
        console.error('Erro na busca:', error);
        showLoading(false);
        alert('Erro na busca. Tente novamente.');
    }
}


function renderDadosMeteorologicos(dadosMeteo) {
    // ============ SALVAR DADOS PARA USO NA PREVISÃO ============
    window.ultimaMeteorologia = dadosMeteo;
    console.log('📊 Dados meteorológicos salvos para previsão:', {
        pressao: dadosMeteo.pressao,
        categoria: obterCategoriaPressao(dadosMeteo.pressao)
    });
    // ===========================================================
    
    const container = document.getElementById('locationCharacteristics');
    
    // REMOVER elemento anterior se existir
    const elementoAnterior = document.querySelector('.real-time-data');
    if (elementoAnterior) {
        elementoAnterior.remove();
    }
    
    // FORMATAR DADOS
    const temperatura = `${dadosMeteo.temperatura}°C`;
    const vento = `${dadosMeteo.vento} m/s ${dadosMeteo.direcaoVento}`;
    const pressao = `${dadosMeteo.pressao} hPa`;
    const umidade = `${dadosMeteo.umidade}%`;
    const condicao = dadosMeteo.condicao;
    const atualizado = new Date(dadosMeteo.atualizadoEm).toLocaleTimeString('pt-BR');
    
        const meteoHTML = `
        <div class="real-time-data">
            <h3><i class="fas fa-cloud-sun"></i> Condições Atuais em Tempo Real</h3>
            <div class="weather-grid">
                <!-- 4 dados principais -->
                <div class="weather-item">
                    <div class="weather-icon">
                        <i class="fas fa-temperature-high"></i>
                    </div>
                    <div class="weather-info">
                        <div class="weather-label">Temperatura</div>
                        <div class="weather-value">${temperatura}</div>
                    </div>
                </div>
                
                <div class="weather-item">
                    <div class="weather-icon">
                        <i class="fas fa-wind"></i>
                    </div>
                    <div class="weather-info">
                        <div class="weather-label">Vento</div>
                        <div class="weather-value">${vento}</div>
                    </div>
                </div>
                
                <div class="weather-item">
                    <div class="weather-icon">
                        <i class="fas fa-tachometer-alt"></i>
                    </div>
                    <div class="weather-info">
                        <div class="weather-label">Pressão</div>
                        <div class="weather-value">${pressao}</div>
                    </div>
                </div>
                
                <div class="weather-item">
                    <div class="weather-icon">
                        <i class="fas fa-tint"></i>
                    </div>
                    <div class="weather-info">
                        <div class="weather-label">Umidade</div>
                        <div class="weather-value">${umidade}</div>
                    </div>
                </div>
                
                <!-- Informações extras NO MESMO FORMATO -->
                <div class="weather-item">
                    <div class="weather-icon">
                        <i class="fas fa-cloud"></i>
                    </div>
                    <div class="weather-info">
                        <div class="weather-label">Tempo</div>
                        <div class="weather-value">${condicao}</div>
                    </div>
                </div>
                
                <div class="weather-item">
                    <div class="weather-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="weather-info">
                        <div class="weather-label">Atualizado</div>
                        <div class="weather-value">${atualizado} | Fonte: ${dadosMeteo.fonte}</div>
                    </div>
                </div>
                <!-- OBS REMOVIDA -->
            </div>
            
            <!-- Seção antiga (será escondida pelo CSS) -->
            <div class="weather-conditions">
                <div class="condition-main">
                    <i class="fas fa-cloud"></i>
                    <span>${condicao}</span>
                </div>
                <div class="weather-source">
                    <small>
                        <i class="fas fa-sync-alt"></i> 
                        Atualizado: ${atualizado} | 
                        Fonte: ${dadosMeteo.fonte}
                    </small>
                </div>
            </div>
        </div>
    `;
    
    // Adicionar após as características
    container.insertAdjacentHTML('afterend', meteoHTML);
}

// =============================================
// INICIALIZAÇÃO
// =============================================

document.addEventListener('DOMContentLoaded', async () => {
    console.log('PescApp iniciando...');
    
    // Carregar estados
    await carregarEstados();
    
    // Eventos dos selects
document.getElementById('estadoSelect').addEventListener('change', async () => {
    console.log('Estado alterado para:', document.getElementById('estadoSelect').value);
    limparResultadosAnteriores();  // <-- ADICIONE ESTA LINHA
    await atualizarCidades();
    document.getElementById('resultsSection').style.display = 'none'; // Já existe, manter
});

document.getElementById('cidadeSelect').addEventListener('change', async () => {
    console.log('Cidade alterada para:', document.getElementById('cidadeSelect').value);
    limparResultadosAnteriores();  // <-- ADICIONE ESTA LINHA
    await atualizarPraias();
    document.getElementById('resultsSection').style.display = 'none'; // Já existe, manter
});

document.getElementById('praiaSelect').addEventListener('change', async () => {
    console.log('Praia alterada para:', document.getElementById('praiaSelect').value);
    // NÃO limpar aqui - vamos carregar nova praia imediatamente
    await buscarPorFiltros();
});
    
    // Botão de busca
    document.getElementById('searchButton').addEventListener('click', buscarPorTexto);
    
    // Enter no input
    document.getElementById('locationInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            buscarPorTexto();
        }
    });
    
    // Inicializar com ES
    setTimeout(async () => {
        console.log('Inicializando com ES...');
        const estadoSelect = document.getElementById('estadoSelect');
        
        if (estadoSelect.options.length > 1) {
            // Selecionar ES
            estadoSelect.value = 'ES';
            await atualizarCidades();
            
            // Selecionar primeira cidade disponível
            setTimeout(async () => {
                const cidadeSelect = document.getElementById('cidadeSelect');
                if (cidadeSelect.options.length > 1) {
                    // Tentar encontrar "Serra" primeiro
                    let cidadeEncontrada = false;
                    for (let i = 0; i < cidadeSelect.options.length; i++) {
                        if (cidadeSelect.options[i].value === "Serra") {
                            cidadeSelect.value = "Serra";
                            cidadeEncontrada = true;
                            break;
                        }
                    }
                    
                    // Se não encontrar Serra, pega a primeira cidade
                    if (!cidadeEncontrada && cidadeSelect.options.length > 1) {
                        cidadeSelect.value = cidadeSelect.options[1].value;
                    }
                    
                    await atualizarPraias();
                    
                    // Selecionar primeira praia
                    setTimeout(() => {
                        const praiaSelect = document.getElementById('praiaSelect');
                        if (praiaSelect.options.length > 1) {
                            praiaSelect.value = praiaSelect.options[1].value;
                            buscarPorFiltros();
                        }
                    }, 100);
                }
            }, 100);
        }
    }, 500);
    
    console.log('PescApp inicializado com sucesso!');
});

// Adicionar função global para debug
window.debugPescApp = function() {
    console.log('=== DEBUG PESCAPP ===');
    console.log('fishingData:', fishingData);
    console.log('dadosCache:', dadosCache);
    console.log('Estado atual:', document.getElementById('estadoSelect').value);
    console.log('Cidade atual:', document.getElementById('cidadeSelect').value);
    console.log('Praia atual:', document.getElementById('praiaSelect').value);
};

// ===== FUNÇÕES DA FASE LUNAR =====

function displayLunarPhase(phaseData) {
    const container = document.getElementById('faseLunarSection');
    if (!container) return;
    
    if (typeof LunarPhaseCalculator !== 'undefined') {
        LunarPhaseCalculator.render(container, phaseData);
    } else {
        // Fallback simples
        container.innerHTML = `
            <div class="lunar-phase-card">
                <div class="lunar-header">
                    <div class="lunar-phase-icon">
                        <span class="moon-emoji">${phaseData.emoji}</span>
                        <div class="moon-phase">
                            <div class="moon-phase-name">${phaseData.fase}</div>
                            <div class="moon-percentage">${phaseData.porcentagem}% iluminada</div>
                        </div>
                    </div>
                </div>
                <div class="fishing-tip">
                    <i class="fas fa-lightbulb"></i>
                    <p>${phaseData.dicaPesca}</p>
                </div>
            </div>
        `;
    }
}

function displayLunarForecast() {
    const container = document.querySelector('.forecast-cards');
    if (!container) return;
    
    if (typeof LunarPhaseCalculator !== 'undefined') {
        const forecast = LunarPhaseCalculator.calculateForecast(new Date(), 7);
        
        // Adicionar título da previsão lunar
        const forecastTitle = document.querySelector('.forecast-title');
        if (forecastTitle) {
            forecastTitle.innerHTML = `<i class="fas fa-calendar-alt"></i> Previsão da Lua para esta semana`;
        }
        
        // Criar container para previsão lunar
        let lunarForecastContainer = document.getElementById('lunarForecastContainer');
        if (!lunarForecastContainer) {
            lunarForecastContainer = document.createElement('div');
            lunarForecastContainer.id = 'lunarForecastContainer';
            lunarForecastContainer.className = 'lunar-forecast';
            container.parentNode.insertBefore(lunarForecastContainer, container);
        }
        
        LunarPhaseCalculator.renderForecast(lunarForecastContainer, forecast);
    }
}

// ===== ATUALIZAR FUNÇÃO DE BUSCA =====

// Na função que processa os resultados, adicione:
async function processSearchResults(data) {
    // ... código existente ...
    
    // Exibir fase lunar
    const phaseData = pescappAPI.utils.calcularFaseLunar();
    displayLunarPhase(phaseData);
    
    // Exibir previsão
    displayLunarForecast();
    
    // ... resto do código ...
}

// =============================================
// SISTEMA DE MAPA INTERATIVO - SIMPLIFICADO
// =============================================

// Variáveis globais para o mapa
let mapa = null;
let marcadorPraia = null;
let controleRota = null;
let localizacaoUsuario = null;

// Função melhorada para mostrar o mapa de uma praia
function mostrarMapaDaPraia(nomePraia, latitude, longitude) {
    console.log('🗺️ Mostrando mapa para:', nomePraia, latitude, longitude);
    
    // Pequeno delay para garantir que o DOM esteja pronto
    setTimeout(() => {
        // Se já tem mapa, remove
        if (mapa) {
            mapa.remove();
            mapa = null;
        }
        
        // Aguarda o elemento do mapa estar visível
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            console.error('❌ Elemento #map não encontrado');
            return;
        }
        
        // Garante que a seção do mapa está visível
        document.getElementById('mapSection').style.display = 'block';
        
        // Pequeno delay para renderização do CSS
        setTimeout(() => {
            try {
                // Inicializa o mapa
                mapa = L.map('map').setView([latitude, longitude], 14);
                
                // Adiciona o mapa base
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors',
                    maxZoom: 19
                }).addTo(mapa);
                
                // Adiciona marcador da praia
                marcadorPraia = L.marker([latitude, longitude])
                    .addTo(mapa)
                    .bindPopup(`
                        <div style="text-align: center; min-width: 200px;">
                            <h3 style="margin: 0 0 10px 0; color: #2c3e50;">${nomePraia}</h3>
                            <p style="margin: 5px 0; color: #666;">📍 Local da pesca</p>
                            <button onclick="mostrarRota()" 
                                    style="background: #3498db; color: white; border: none; 
                                           padding: 8px 15px; border-radius: 5px; cursor: pointer; 
                                           margin-top: 10px; font-size: 0.9em;">
                                <i class="fas fa-route"></i> Como Chegar
                            </button>
                        </div>
                    `)
                    .openPopup();
                
                // Ajusta o mapa após ser renderizado
                setTimeout(() => {
                    mapa.invalidateSize(); // ESSENCIAL: força redimensionamento
                    console.log('✅ Mapa inicializado e ajustado');
                }, 100);
                
                // Rola a tela até o mapa (com suavidade)
                document.getElementById('mapSection').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'nearest'
                });
                
            } catch (error) {
                console.error('❌ Erro ao inicializar mapa:', error);
                alert('Erro ao carregar o mapa. Tente recarregar a página.');
            }
        }, 50);
        
    }, 100); // Delay inicial
}

// Função inteligente para obter localização
async function obterMinhaLocalizacao() {
    console.log('📍 Iniciando obtenção de localização...');
    
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            console.warn('⚠️ Geolocalização não suportada');
            resolve(this.getLocalizacaoPadraoVitoria());
            return;
        }
        
        // Opções para tentar obter melhor precisão
        const opcoes = {
            enableHighAccuracy: true,   // Tenta usar GPS
            timeout: 10000,             // 10 segundos
            maximumAge: 0               // Sem cache
        };
        
        navigator.geolocation.getCurrentPosition(
            // Sucesso
            (posicao) => {
                console.log('✅ Localização obtida via GPS/Wi-Fi');
                console.log('• Coordenadas:', posicao.coords.latitude, posicao.coords.longitude);
                console.log('• Precisão:', posicao.coords.accuracy, 'metros');
                
                // Se a precisão for muito baixa (> 10km), usar localização padrão
                if (posicao.coords.accuracy > 10000) {
                    console.warn('⚠️ Precisão muito baixa (>10km), usando Vitória');
                    alert('Localização imprecisa detectada. Usando Vitória/ES como referência.');
                    resolve(this.getLocalizacaoPadraoVitoria());
                    return;
                }
                
                localizacaoUsuario = {
                    lat: posicao.coords.latitude,
                    lng: posicao.coords.longitude,
                    precisao: posicao.coords.accuracy,
                    fonte: 'gps_wifi',
                    timestamp: new Date().toISOString()
                };
                
                resolve(localizacaoUsuario);
            },
            
            // Erro ou usuário negou
            (erro) => {
                console.warn(`⚠️ Não foi possível obter localização precisa (${erro.code})`);
                
                // Perguntar se quer usar Vitória
                const usarVitoria = confirm(
                    'Não foi possível obter sua localização precisa.\n\n' +
                    'Deseja usar Vitória/ES como localização padrão para calcular rotas?'
                );
                
                if (usarVitoria) {
                    resolve(this.getLocalizacaoPadraoVitoria());
                } else {
                    // Se não quiser, retorna null para indicar que não tem localização
                    localizacaoUsuario = null;
                    resolve(null);
                }
            },
            
            opcoes
        );
    });
}

// Função auxiliar para obter localização padrão (Vitória)
function getLocalizacaoPadraoVitoria() {
    console.log('📍 Usando localização padrão: Vitória/ES');
    localizacaoUsuario = {
        lat: -20.3155,
        lng: -40.3128,
        precisao: 1000,
        fonte: 'padrao_vitoria',
        timestamp: new Date().toISOString(),
        cidade: 'Vitória',
        estado: 'ES'
    };
    return localizacaoUsuario;
}

// Função para perguntar ao usuário sua cidade
function perguntarLocalizacaoManual() {
    return new Promise((resolve) => {
        const cidade = prompt(
            'Para calcular rotas precisas, informe sua cidade:\n\n' +
            'Exemplos: São Paulo-SP, Rio de Janeiro-RJ, Belo Horizonte-MG, Vitória-ES'
        );
        
        if (cidade) {
            // Mapeamento de cidades para coordenadas
            const cidadesConhecidas = {
                'são paulo': { lat: -23.5505, lng: -46.6333, nome: 'São Paulo', estado: 'SP' },
                'rio de janeiro': { lat: -22.9068, lng: -43.1729, nome: 'Rio de Janeiro', estado: 'RJ' },
                'belo horizonte': { lat: -19.9167, lng: -43.9345, nome: 'Belo Horizonte', estado: 'MG' },
                'vitória': { lat: -20.3155, lng: -40.3128, nome: 'Vitória', estado: 'ES' },
                'vila velha': { lat: -20.3297, lng: -40.2922, nome: 'Vila Velha', estado: 'ES' },
                'serra': { lat: -20.1286, lng: -40.3078, nome: 'Serra', estado: 'ES' },
                'guarapari': { lat: -20.6599, lng: -40.5086, nome: 'Guarapari', estado: 'ES' }
            };
            
            const cidadeLower = cidade.toLowerCase();
            
            for (const [key, dados] of Object.entries(cidadesConhecidas)) {
                if (cidadeLower.includes(key)) {
                    console.log(`📍 Usando ${dados.nome}-${dados.estado} como localização`);
                    localizacaoUsuario = {
                        ...dados,
                        precisao: 5000,
                        fonte: 'manual',
                        timestamp: new Date().toISOString()
                    };
                    resolve(localizacaoUsuario);
                    return;
                }
            }
            
            // Se não encontrou, usar Vitória
            console.log('📍 Cidade não reconhecida, usando Vitória');
            resolve(getLocalizacaoPadraoVitoria());
        } else {
            // Cancelou, usar Vitória
            resolve(getLocalizacaoPadraoVitoria());
        }
    });
}

// Função inteligente para mostrar rota
async function mostrarRota() {
    if (!marcadorPraia) {
        alert('Primeiro selecione uma praia!');
        return;
    }
    
    console.log('🛣️ Iniciando cálculo de rota...');
    
    const coordsPraia = marcadorPraia.getLatLng();
    const nomePraia = marcadorPraia.getPopup()?.getContent() || 'Praia selecionada';
    
    // Mostrar loading
    const btnRota = document.getElementById('showRouteBtn');
    const textoOriginal = btnRota.innerHTML;
    btnRota.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculando...';
    btnRota.disabled = true;
    
    try {
        // 1. Tentar obter localização automática
        if (!localizacaoUsuario) {
            console.log('📍 Obtendo localização do usuário...');
            await obterMinhaLocalizacao();
        }
        
        // 2. Se não tem localização ou é muito imprecisa, perguntar
        if (!localizacaoUsuario || localizacaoUsuario.precisao > 50000) {
            console.log('📍 Localização não disponível ou imprecisa, perguntando...');
            const confirmar = confirm(
                `Sua localização atual: ${localizacaoUsuario?.cidade || 'Não detectada'}\n\n` +
                `Para calcular a rota até ${nomePraia}, deseja:\n` +
                `• Usar Vitória/ES (padrão)\n` +
                `• Informar outra cidade`
            );
            
            if (confirmar) {
                await perguntarLocalizacaoManual();
            }
        }
        
        // 3. Se ainda não tem localização, cancelar
        if (!localizacaoUsuario) {
            alert('Não foi possível determinar sua localização. Rota não calculada.');
            return;
        }
        
        console.log('📍 Origem:', localizacaoUsuario);
        console.log('📍 Destino:', coordsPraia);
        
        // 4. Calcular distância
        const distancia = calcularDistancia(
            localizacaoUsuario.lat, 
            localizacaoUsuario.lng,
            coordsPraia.lat, 
            coordsPraia.lng
        );
        
        // 5. Se a distância for absurda (> 1000km), verificar
        if (distancia > 1000) {
            const confirmarDistancia = confirm(
                `⚠️ ATENÇÃO:\n\n` +
                `Sua localização: ${localizacaoUsuario.cidade || 'Desconhecida'}\n` +
                `Distância até a praia: ${distancia.toFixed(0)} km\n\n` +
                `Esta distância parece muito grande. Deseja corrigir sua localização?`
            );
            
            if (confirmarDistancia) {
                await perguntarLocalizacaoManual();
                // Recalcular distância
                const novaDistancia = calcularDistancia(
                    localizacaoUsuario.lat, 
                    localizacaoUsuario.lng,
                    coordsPraia.lat, 
                    coordsPraia.lng
                );
                
                if (novaDistancia > 1000) {
                    alert(`Distância ainda grande: ${novaDistancia.toFixed(0)} km.\nRota pode não ser prática.`);
                }
            }
        }
        
        // 6. Remover rota anterior
        if (controleRota) {
            mapa.removeLayer(controleRota);
            controleRota = null;
        }
        
        // 7. Criar linha da rota
        controleRota = L.polyline([
            [localizacaoUsuario.lat, localizacaoUsuario.lng],
            [coordsPraia.lat, coordsPraia.lng]
        ], {
            color: '#3498db',
            weight: 5,
            opacity: 0.7,
            dashArray: '10, 10'
        }).addTo(mapa);
        
        // 8. Calcular tempo estimado
        const tipo = document.getElementById('routeType').value;
        const velocidade = tipo === 'walk' ? 5 : tipo === 'bike' ? 15 : 80; // km/h (carro mais rápido)
        const tempoHoras = distancia / velocidade;
        const tempoMinutos = Math.round(tempoHoras * 60);
        
        // Formatar tempo
        let tempoFormatado = '';
        if (tempoHoras >= 1) {
            const horas = Math.floor(tempoHoras);
            const minutos = Math.round((tempoHoras - horas) * 60);
            tempoFormatado = `${horas}h${minutos > 0 ? ` ${minutos}min` : ''}`;
        } else {
            tempoFormatado = `${tempoMinutos} min`;
        }
        
        // 9. Atualizar informações
        document.getElementById('routeDistance').innerHTML = 
            `<strong>Distância:</strong> ${distancia.toFixed(1)} km`;
        
        document.getElementById('routeTime').innerHTML = 
            `<strong>Tempo estimado:</strong> ${tempoFormatado} (${tipo === 'car' ? 'carro' : tipo === 'walk' ? 'a pé' : 'bicicleta'})`;
        
        document.getElementById('routeInstructions').innerHTML = 
            `<strong>Partindo de:</strong> ${localizacaoUsuario.cidade || 'Sua localização'}`;
        
        document.getElementById('routeInfo').style.display = 'block';
        
        // 10. Ajustar mapa para mostrar rota
        const bounds = L.latLngBounds([
            [localizacaoUsuario.lat, localizacaoUsuario.lng],
            [coordsPraia.lat, coordsPraia.lng]
        ]);
        mapa.fitBounds(bounds, { padding: [100, 100] });
        
        // 11. Adicionar marcadores
        // Marcador da origem
        L.marker([localizacaoUsuario.lat, localizacaoUsuario.lng], {
            icon: L.divIcon({
                className: 'user-location-marker',
                html: `<div style="background: #2ecc71; color: white; border-radius: 50%; 
                       width: 40px; height: 40px; display: flex; align-items: center; 
                       justify-content: center; border: 3px solid white;">
                       <i class="fas fa-home"></i>
                      </div>`,
                iconSize: [40, 40]
            })
        }).addTo(mapa).bindPopup(`
            <b>📍 Sua localização</b><br>
            ${localizacaoUsuario.cidade ? `${localizacaoUsuario.cidade}-${localizacaoUsuario.estado}` : 'Local atual'}<br>
            ${localizacaoUsuario.fonte === 'padrao_vitoria' ? '(Padrão - Vitória/ES)' : ''}
        `);
        
        console.log('✅ Rota calculada com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro ao calcular rota:', error);
        alert('Erro ao calcular rota. Tente novamente.');
    } finally {
        // Restaurar botão
        btnRota.innerHTML = textoOriginal;
        btnRota.disabled = false;
    }
}

// Função para calcular distância entre dois pontos (em km)
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// =============================================
// CONFIGURAR EVENTOS DO MAPA
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Botão "Como Chegar"
    document.getElementById('showRouteBtn')?.addEventListener('click', mostrarRota);
    
    // Botão "Minha Localização"
    document.getElementById('myLocationBtn')?.addEventListener('click', async function() {
        await obterMinhaLocalizacao();
        if (localizacaoUsuario && mapa) {
            mapa.setView([localizacaoUsuario.lat, localizacaoUsuario.lng], 15);
            L.marker([localizacaoUsuario.lat, localizacaoUsuario.lng])
                .addTo(mapa)
                .bindPopup('<b>📍 Você está aqui!</b>')
                .openPopup();
        }
    });
    
    // Botão "Fechar Mapa"
    document.getElementById('closeMapBtn')?.addEventListener('click', function() {
        document.getElementById('mapSection').style.display = 'none';
        if (mapa) {
            mapa.remove();
            mapa = null;
        }
    });
});

// =============================================
// INTEGRAR COM A FUNÇÃO EXISTENTE showFishingInfo
// =============================================

// Função auxiliar para extrair coordenadas
function extrairCoordenadas(praiaData) {
    // Tenta várias formas de obter coordenadas
    if (praiaData.coordenadas) {
        return praiaData.coordenadas;
    }
    
    if (praiaData.verificacao?.coordenadasGPS) {
        const partes = praiaData.verificacao.coordenadasGPS.split(',');
        if (partes.length === 2) {
            return {
                lat: parseFloat(partes[0].trim()),
                lng: parseFloat(partes[1].trim())
            };
        }
    }
    
    // Fallback: coordenadas de Vitória
    return { lat: -20.3155, lng: -40.3128 };
}



class AlertasPesca {
    constructor() {
        this.alertasAtivos = [];
        this.melhoresPraiasHoje = [];
    }
    
    // Analisar todas as praias para encontrar a melhor
    async analisarMelhoresPraias() {
        console.log('🔍 Analisando melhores praias para hoje...');
        
        try {
            // Obter todas as praias do ES
            const todasPraias = this.obterTodasPraiasES();
            
            // Analisar cada praia
            const analises = [];
            
            for (const praia of todasPraias.slice(0, 15)) { // Limitar a 15 por performance
                const score = await this.calcularScorePraia(praia);
                analises.push({
                    ...praia,
                    score: score.total,
                    detalhes: score.fatores
                });
            }
            
            // Ordenar por melhor score
            analises.sort((a, b) => b.score - a.score);
            this.melhoresPraiasHoje = analises.slice(0, 5); // Top 5
            
            console.log('✅ Melhores praias analisadas:', this.melhoresPraiasHoje.slice(0, 3));
            
            // Mostrar alerta se tiver resultados
            if (this.melhoresPraiasHoje.length > 0) {
                this.mostrarAlertaMelhorPraia();
            }
            
        } catch (error) {
            console.error('❌ Erro ao analisar praias:', error);
        }
    }
    
    // Obter todas as praias do ES
    obterTodasPraiasES() {
        const praias = [];
        
        // Acessar seu banco de dados
        if (typeof databaseES !== 'undefined' && databaseES.cidades) {
            Object.entries(databaseES.cidades).forEach(([cidadeNome, cidadeData]) => {
                if (cidadeData.praias) {
                    Object.entries(cidadeData.praias).forEach(([praiaNome, praiaData]) => {
                        praias.push({
                            nome: praiaNome,
                            cidade: cidadeNome,
                            dados: praiaData,
                            coordenadas: this.extrairCoordenadasPraia(praiaData)
                        });
                    });
                }
            });
        }
        
        console.log(`📊 Encontradas ${praias.length} praias no ES`);
        return praias;
    }
    
    // Extrair coordenadas
    extrairCoordenadasPraia(praiaData) {
        if (praiaData.coordenadas) return praiaData.coordenadas;
        if (praiaData.verificacao?.coordenadasGPS) {
            const coords = praiaData.verificacao.coordenadasGPS.split(',').map(c => parseFloat(c.trim()));
            if (coords.length === 2) return { lat: coords[0], lng: coords[1] };
        }
        return { lat: -20.3155, lng: -40.3128 }; // Fallback Vitória
    }
    
    // Calcular score para uma praia
    async calcularScorePraia(praia) {
        const fatores = {
            meteorologia: await this.avaliarMeteorologia(praia),
            hora: this.avaliarHoraAtual(),
            dia: this.avaliarDiaSemana(),
            vento: this.avaliarVentoAleatorio(),
            confianca: praia.dados?.verificacao?.nivelConfianca || 5
        };
        
        // Cálculo do score (0-10)
        let score = 5; // Base
        score += fatores.meteorologia * 2;
        score += fatores.hora;
        score += fatores.dia;
        score += fatores.vento;
        score += (fatores.confianca / 10);
        
        // Normalizar
        score = Math.max(0, Math.min(10, score));
        
        return {
            total: Math.round(score * 10) / 10,
            fatores: this.gerarDescricaoFatores(fatores)
        };
    }
    
    // Avaliar meteorologia (simplificado)
    async avaliarMeteorologia(praia) {
        const hora = new Date().getHours();
        
        // Simulação baseada na hora do dia
        if (hora >= 5 && hora <= 9) return 1.5;  // Manhã - ótimo
        if (hora >= 16 && hora <= 19) return 1.0; // Tarde - bom
        if (hora >= 20 || hora <= 4) return 0.8;  // Noite - regular
        return 0.3; // Meio do dia - ruim
    }
    
    // Avaliar hora atual
    avaliarHoraAtual() {
        const hora = new Date().getHours();
        if (hora >= 5 && hora <= 9) return 0.8;   // Amanhecer
        if (hora >= 16 && hora <= 19) return 0.5; // Entardecer
        return 0.2; // Outros horários
    }
    
    // Avaliar dia da semana
    avaliarDiaSemana() {
        const dia = new Date().getDay();
        // Finais de semana são melhores (mais pescadores compartilham informações)
        return dia === 0 || dia === 6 ? 0.7 : 0.3;
    }
    
    // Vento aleatório (simulação)
    avaliarVentoAleatorio() {
        return Math.random() * 0.5;
    }
    
    // Gerar descrição dos fatores
    gerarDescricaoFatores(fatores) {
        const descricoes = [];
        
        if (fatores.meteorologia > 1) descricoes.push("Clima excelente");
        else if (fatores.meteorologia > 0.5) descricoes.push("Clima bom");
        
        if (fatores.hora > 0.5) descricoes.push("Horário ideal");
        
        if (fatores.dia > 0.5) descricoes.push("Final de semana");
        
        if (fatores.vento > 0.3) descricoes.push("Vento favorável");
        
        return descricoes.length > 0 ? descricoes : ["Condições medianas"];
    }
    
    // Mostrar alerta da melhor praia
    mostrarAlertaMelhorPraia() {
        if (this.melhoresPraiasHoje.length === 0) return;
        
        const melhor = this.melhoresPraiasHoje[0];
        const hoje = new Date().toDateString();
        const ultimoAlerta = localStorage.getItem('ultimoAlertaPraia');
        
        // Só mostrar uma vez por dia
        if (ultimoAlerta === hoje) return;
        
        const alertaHTML = `
            <div id="alertaMelhorPraia" style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, #3498db, #9b59b6);
                color: white;
                padding: 20px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 9999;
                max-width: 350px;
                animation: slideInUp 0.5s ease;
                font-family: 'Segoe UI', system-ui;
            ">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                    <h3 style="margin: 0; font-size: 1.2em;">
                        <i class="fas fa-crown"></i> RECOMENDAÇÃO DO DIA
                    </h3>
                    <button onclick="document.getElementById('alertaMelhorPraia').remove()" 
                            style="background: none; border: none; color: white; cursor: pointer; font-size: 1.2em;">
                        ✕
                    </button>
                </div>
                
                <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px; margin-bottom: 10px;">
                    <p style="margin: 0 0 8px 0; font-size: 1.1em; font-weight: bold;">
                        🏆 ${melhor.nome}
                    </p>
                    <p style="margin: 0 0 10px 0; opacity: 0.9;">
                        <i class="fas fa-map-marker-alt"></i> ${melhor.cidade}
                    </p>
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                        <span style="background: ${this.getScoreColor(melhor.score)}; 
                                   padding: 4px 10px; border-radius: 20px; font-weight: bold;">
                            ${melhor.score}/10
                        </span>
                        <span style="font-size: 0.9em;">
                            ${melhor.detalhes?.join(' • ')}
                        </span>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <button onclick="alertasPesca.irParaPraia('${melhor.nome}')"
                            style="padding: 8px; background: rgba(255,255,255,0.2); 
                                   border: 2px solid white; color: white; border-radius: 8px; 
                                   cursor: pointer; font-size: 0.9em;">
                        <i class="fas fa-search"></i> Ver Detalhes
                    </button>
                    <button onclick="alertasPesca.mostrarTopPraias()"
                            style="padding: 8px; background: rgba(255,255,255,0.2); 
                                   border: 2px solid white; color: white; border-radius: 8px; 
                                   cursor: pointer; font-size: 0.9em;">
                        <i class="fas fa-list"></i> Top 5
                    </button>
                </div>
            </div>
        `;
        
        // Adiciona ao body
        document.body.insertAdjacentHTML('beforeend', alertaHTML);
        
        // Salva que mostrou hoje
        localStorage.setItem('ultimoAlertaPraia', hoje);
        
        // Remove após 45 segundos
        setTimeout(() => {
            const alerta = document.getElementById('alertaMelhorPraia');
            if (alerta) {
                alerta.style.animation = 'slideOutDown 0.5s ease';
                setTimeout(() => alerta.remove(), 500);
            }
        }, 45000);
        
        console.log('🔔 Alerta da melhor praia:', melhor.nome);
    }
    
    // Cor baseada no score
    getScoreColor(score) {
        if (score >= 8) return '#27ae60';
        if (score >= 6) return '#f39c12';
        return '#e74c3c';
    }
    
    // Ir para detalhes da praia
    irParaPraia(nomePraia) {
        // Fecha o alerta
        const alerta = document.getElementById('alertaMelhorPraia');
        if (alerta) alerta.remove();
        
        // Procura a praia no banco de dados
        const searchInput = document.getElementById('locationInput');
        if (searchInput) {
            searchInput.value = nomePraia;
            // Dispara o evento de busca (ajuste conforme sua função)
            if (typeof buscarPorTexto === 'function') {
                buscarPorTexto();
            } else if (typeof buscarPraia === 'function') {
                buscarPraia();
            } else {
                // Tenta clicar no botão de busca
                const searchBtn = document.getElementById('searchButton');
                if (searchBtn) searchBtn.click();
            }
        }
    }
    
    // Mostrar top 5 praias
    mostrarTopPraias() {
        if (this.melhoresPraiasHoje.length === 0) {
            alert('Analise as praias primeiro!');
            return;
        }
        
        const modalHTML = `
            <div id="modalTopPraias" style="
                position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                background: rgba(0,0,0,0.85); z-index: 10000; display: flex; 
                justify-content: center; align-items: center; animation: fadeIn 0.3s ease;
            ">
                <div style="background: white; padding: 25px; border-radius: 15px; 
                            max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h2 style="margin: 0; color: #2c3e50;">
                            <i class="fas fa-trophy"></i> TOP 5 PRAIAS HOJE
                        </h2>
                        <button onclick="document.getElementById('modalTopPraias').remove()"
                                style="background: none; border: none; font-size: 1.5em; cursor: pointer; color: #7f8c8d;">
                            ✕
                        </button>
                    </div>
                    
                    <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
                        <p style="margin: 0; display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-calendar-day"></i>
                            <strong>Análise para:</strong> ${new Date().toLocaleDateString('pt-BR', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </p>
                    </div>
                    
                    ${this.melhoresPraiasHoje.map((praia, index) => `
                        <div style="border: 1px solid ${index === 0 ? '#fdcb6e' : '#e0e0e0'}; 
                                    border-radius: 10px; padding: 15px; margin-bottom: 15px;
                                    ${index === 0 ? 'background: linear-gradient(135deg, #fff9e6 0%, #ffeaa7 100%);' : ''}">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <h3 style="margin: 0; color: #2c3e50; font-size: 1.1em;">
                                    ${index === 0 ? '👑 ' : `${index + 1}. `}${praia.nome}
                                    <span style="font-size: 0.9em; color: #7f8c8d;"> - ${praia.cidade}</span>
                                </h3>
                                <span style="background: ${this.getScoreColor(praia.score)}; 
                                         color: white; padding: 5px 12px; border-radius: 20px; 
                                         font-weight: bold; font-size: 0.9em;">
                                    ${praia.score}/10
                                </span>
                            </div>
                            
                            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px;">
                                ${praia.detalhes?.map(d => `
                                    <span style="background: #e3f2fd; color: #1976d2; 
                                                padding: 3px 8px; border-radius: 15px; 
                                                font-size: 0.8em;">
                                        ${d}
                                    </span>
                                `).join('')}
                            </div>
                            
                            <button onclick="alertasPesca.irParaPraia('${praia.nome}')"
                                    style="width: 100%; padding: 8px; background: #3498db; 
                                           color: white; border: none; border-radius: 5px; 
                                           cursor: pointer; font-size: 0.9em;">
                                <i class="fas fa-search-location"></i> Ver esta praia
                            </button>
                        </div>
                    `).join('')}
                    
                    <div style="margin-top: 20px; text-align: center;">
                        <button onclick="alertasPesca.reanalisarPraias()"
                                style="padding: 10px 20px; background: #2ecc71; color: white; 
                                       border: none; border-radius: 8px; cursor: pointer;">
                            <i class="fas fa-redo"></i> Reanalisar Praias
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Remove alerta atual se existir
        const alertaAtual = document.getElementById('alertaMelhorPraia');
        if (alertaAtual) alertaAtual.remove();
        
        // Mostra modal
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    // Reanalisar praias
    reanalisarPraias() {
        // Fecha modal se aberto
        const modal = document.getElementById('modalTopPraias');
        if (modal) modal.remove();
        
        // Limpa cache do dia
        localStorage.removeItem('ultimoAlertaPraia');
        
        // Reanalisa
        this.analisarMelhoresPraias();
    }

        // Mostrar mais dicas (método mantido para compatibilidade)
    mostrarMaisDicas() {
        console.log('💡 Mostrando dicas de pesca...');
        
        const dicasHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                        background: rgba(0,0,0,0.85); z-index: 10000; display: flex; 
                        justify-content: center; align-items: center; animation: fadeIn 0.3s ease;">
                <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 90%;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h2 style="color: #2c3e50; margin-top: 0;">
                            <i class="fas fa-lightbulb"></i> Dicas de Pesca
                        </h2>
                        <button onclick="document.querySelector('#modalDicasPesca').remove()"
                                style="background: none; border: none; font-size: 1.5em; cursor: pointer; color: #7f8c8d;">
                            ✕
                        </button>
                    </div>
                    
                    <div style="max-height: 60vh; overflow-y: auto; padding-right: 10px;">
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                            <h3 style="margin-top: 0; color: #2c3e50;">
                                <i class="fas fa-calendar-day"></i> Dicas para Hoje
                            </h3>
                            <p>${this.obterDicaDoDiaAvancada()}</p>
                        </div>
                        
                        <h3 style="color: #2c3e50; margin-top: 0;">
                            <i class="fas fa-star"></i> Dicas Gerais de Pesca
                        </h3>
                        
                        <ul style="line-height: 1.6; padding-left: 20px;">
                            <li style="margin-bottom: 10px;"><strong>Amanhecer e entardecer</strong> são os melhores horários para a maioria das espécies</li>
                            <li style="margin-bottom: 10px;"><strong>Verifique a maré</strong> - peixes se alimentam mais durante mudanças de maré (vazante e enchente)</li>
                            <li style="margin-bottom: 10px;"><strong>Vento sudoeste</strong> geralmente traz peixes para perto da costa no ES</li>
                            <li style="margin-bottom: 10px;"><strong>Lua cheia</strong> pode aumentar a atividade dos peixes noturnos</li>
                            <li style="margin-bottom: 10px;"><strong>Água turva</strong> após chuva pode ser produtiva para robalo e corvina</li>
                            <li style="margin-bottom: 10px;"><strong>Use iscas naturais</strong> quando possível (sardinha, camarão, minhoca)</li>
                            <li style="margin-bottom: 10px;"><strong>Respeite os defesos</strong> - período de reprodução dos peixes</li>
                            <li style="margin-bottom: 10px;"><strong>Varie as profundidades</strong> até encontrar os cardumes</li>
                            <li style="margin-bottom: 10px;"><strong>Observe os pássaros</strong> - podem indicar onde os peixes estão se alimentando</li>
                        </ul>
                        
                        <div style="background: #e3f2fd; padding: 15px; border-radius: 10px; margin-top: 20px;">
                            <h4 style="margin-top: 0; color: #1976d2;">
                                <i class="fas fa-fish"></i> Espécies Comuns no ES
                            </h4>
                            <p><strong>Robalo:</strong> Costas rochosas, maré cheia, amanhecer/entardecer</p>
                            <p><strong>Corvina:</strong> Praias arenosas, água turva, noite</p>
                            <p><strong>Pescada:</strong> Fundo arenoso, iscas no fundo</p>
                            <p><strong>Enchova:</strong> Superfície, iscas pequenas e rápidas</p>
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px; text-align: center;">
                        <button onclick="alertasPesca.mostrarTopPraias()"
                                style="padding: 10px 20px; background: linear-gradient(135deg, #9b59b6, #3498db); 
                                       color: white; border: none; border-radius: 8px; cursor: pointer; margin-right: 10px;">
                            <i class="fas fa-crown"></i> Ver Melhores Praias
                        </button>
                        
                        <button onclick="document.querySelector('#modalDicasPesca').remove()"
                                style="padding: 10px 20px; background: #95a5a6; color: white; 
                                       border: none; border-radius: 8px; cursor: pointer;">
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Remove modal atual se existir
        const modalAtual = document.querySelector('#modalDicasPesca');
        if (modalAtual) modalAtual.remove();
        
        // Adiciona ID ao modal
        const modalDiv = document.createElement('div');
        modalDiv.id = 'modalDicasPesca';
        modalDiv.innerHTML = dicasHTML;
        document.body.appendChild(modalDiv);
    }
    
    // Gerar dica do dia avançada
    obterDicaDoDiaAvancada() {
        const hora = new Date().getHours();
        const dia = new Date().getDay();
        const dicas = [
            `Hoje é ${dia === 0 || dia === 6 ? 'final de semana' : 'dia de semana'} - ${dia === 0 || dia === 6 ? 'melhor para pescar!' : 'tente ao entardecer.'}`,
            `Agora são ${hora}h - ${hora >= 5 && hora <= 9 ? 'ótimo horário para pescar!' : hora >= 16 && hora <= 19 ? 'bom horário para pescar!' : 'melhor esperar o amanhecer ou entardecer.'}`,
            `Maré está ${this.obterEstadoMare()} - ${this.obterDicaMare()}`,
            `Vento ${this.obterCondicaoVento()} - ${this.obterDicaVento()}`,
            `Tente pescar ${this.obterProfundidadeRecomendada()} para melhores resultados.`,
            `Use ${this.obterIscaRecomendada()} como isca hoje.`
        ];
        
        return dicas[Math.floor(Math.random() * dicas.length)];
    }
    
    // Métodos auxiliares para as dicas
    obterEstadoMare() {
        const estados = ['subindo', 'cheia', 'descendo', 'baixa'];
        return estados[Math.floor(Math.random() * estados.length)];
    }
    
    obterDicaMare() {
        const dicas = [
            'ótimo para pesca costeira',
            'bons resultados em costões',
            'experimente diferentes profundidades',
            'os peixes estão mais ativos'
        ];
        return dicas[Math.floor(Math.random() * dicas.length)];
    }
    
    obterCondicaoVento() {
        const condicoes = ['fraco', 'moderado', 'forte', 'calmo'];
        return condicoes[Math.floor(Math.random() * condicoes.length)];
    }
    
    obterDicaVento() {
        const dicas = [
            'condições favoráveis',
            'ajuste sua técnica',
            'escolha locais protegidos',
            'perfeito para pescar'
        ];
        return dicas[Math.floor(Math.random() * dicas.length)];
    }
    
    obterProfundidadeRecomendada() {
        const profundidades = ['no fundo', 'na meia-água', 'na superfície', 'em diferentes profundidades'];
        return profundidades[Math.floor(Math.random() * profundidades.length)];
    }
    
    obterIscaRecomendada() {
        const iscas = ['sardinha', 'camarão', 'minhoca', 'lula', 'iscas artificiais brilhantes'];
        return iscas[Math.floor(Math.random() * iscas.length)];
    }
}

// Criar instância global
const alertasPesca = new AlertasPesca();

// =============================================
// INICIAR SISTEMA DE ALERTAS
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Analisar melhores praias após 3 segundos
    setTimeout(() => {
        alertasPesca.analisarMelhoresPraias();
    }, 3000);
    
    // Reanalisar a cada 2 horas
    setInterval(() => {
        alertasPesca.analisarMelhoresPraias();
    }, 2 * 60 * 60 * 1000);
    
    // Adicionar botão manual
    setTimeout(() => {
        adicionarBotaoRecomendacoes();
    }, 1000);
});

// Botão para ver recomendações
function adicionarBotaoRecomendacoes() {
    if (document.getElementById('botaoRecomendacoes')) return;
    
    const botao = document.createElement('button');
    botao.id = 'botaoRecomendacoes';
    botao.innerHTML = '<i class="fas fa-crown"></i> <span>Melhores Praias</span>';
    botao.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: linear-gradient(135deg, #9b59b6, #3498db);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(155, 89, 182, 0.4);
        font-family: 'Segoe UI', system-ui;
        font-weight: 600;
        z-index: 9998;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
    `;
    
    botao.addEventListener('click', () => {
        alertasPesca.mostrarTopPraias();
    });
    
    botao.addEventListener('mouseenter', () => {
        botao.style.transform = 'translateY(-3px)';
        botao.style.boxShadow = '0 8px 25px rgba(155, 89, 182, 0.6)';
    });
    
    botao.addEventListener('mouseleave', () => {
        botao.style.transform = 'translateY(0)';
        botao.style.boxShadow = '0 4px 15px rgba(155, 89, 182, 0.4)';
    });
    
    document.body.appendChild(botao);
}

// =============================================
// INICIAR SISTEMA DE ALERTAS
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Mostrar alerta após 5 segundos
    setTimeout(() => {
        alertasPesca.analisarMelhoresPraias();  // <--- CORRIGIDO!
    }, 5000);
    
    // Adicionar botão de dicas no header
    setTimeout(() => {
        adicionarBotaoDicas();
    }, 1000);
});

// Botão flutuante para dicas
function adicionarBotaoDicas() {
    const botao = document.createElement('button');
    botao.id = 'botaoDicasPesca';
    botao.innerHTML = '<i class="fas fa-lightbulb"></i> Dicas';
    botao.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: linear-gradient(135deg, #3498db, #2ecc71);
        color: white;
        border: none;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
        font-size: 1.2em;
        z-index: 9998;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    botao.addEventListener('click', () => {
        alertasPesca.mostrarMaisDicas();
    });
    
    document.body.appendChild(botao);
}

// =============================================
// ANIMAÇÕES CSS
// =============================================

// Adicione estas animações no seu CSS ou inline
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
    
    #botaoDicasPesca:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(52, 152, 219, 0.6);
    }
    
    .alerta-praia {
        animation: fadeIn 0.5s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// =============================================
// ATUALIZAR PRESSÃO NA INTERFACE (FORÇADO)
// =============================================

function atualizarPressaoNaInterface() {
    console.log('🔄 Atualizando pressão na interface...');
    
    // Aguardar um pouco para garantir que tudo carregou
    setTimeout(() => {
        // 1. Obter valor REAL da API
        const dadosReais = window.ultimaMeteorologia;
        
        if (!dadosReais || !dadosReais.pressao) {
            console.log('⚠️ Sem dados reais disponíveis');
            return;
        }
        
        const pressaoReal = dadosReais.pressao;
        const categoriaReal = obterCategoriaPressao(pressaoReal);
        
        console.log(`📊 Dados para atualização: ${pressaoReal} hPa → ${categoriaReal}`);
        
        // 2. Encontrar TODOS os cartões de previsão
        const forecastCards = document.querySelectorAll('.forecast-card');
        
        // 3. Atualizar cada cartão
        forecastCards.forEach((card, index) => {
            // Encontrar o elemento da pressão dentro deste cartão
            const elementoPressao = card.querySelector('.forecast-item:nth-child(2) div:nth-child(2) div:nth-child(2)');
            
            if (elementoPressao) {
                if (index === 0) {
                    // DIA 0 (HOJE): usar valor REAL
                    elementoPressao.textContent = `${pressaoReal} hPa (${categoriaReal})`;
                    console.log(`✅ Cartão ${index}: atualizado para valor REAL`);
                } else {
                    // DIA 1 e 2: usar valores da previsão já gerada
                    // Não mudamos, já está correto na generateForecast
                    console.log(`📅 Cartão ${index}: mantendo previsão`);
                }
            }
        });
        
        console.log('✅ Interface atualizada com sucesso!');
    }, 1000); // Delay de 1 segundo para garantir carregamento
}