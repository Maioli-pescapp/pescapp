// api-integrations.js - Integrações em tempo real para PescApp
// Versão: 1.0.0
// Última atualização: 2024-01-15

const pescappAPI = {
    // ============ CONFIGURAÇÕES ============
    config: {
        debug: true,
        cacheDuration: {
            mares: 24 * 60 * 60 * 1000, // 24 horas em milissegundos
            meteorologia: 60 * 60 * 1000, // 1 hora
            defeso: 7 * 24 * 60 * 60 * 1000 // 7 dias
        },
        maxRetries: 3,
        timeout: 10000 // 10 segundos
    },

    // ============ ESTADO INTERNO ============
    state: {
        cache: {
            mares: {},
            meteorologia: {},
            defeso: {}
        },
        lastFetch: {},
        isOnline: navigator.onLine
    },

    // ============ API DE MARÉS ============
    mares: {
        /**
         * Busca dados de maré para uma localidade e data
         * @param {string} local - Nome do local (ex: "Vitória-ES")
         * @param {Date} data - Data para busca (padrão: hoje)
         * @returns {Promise} Dados de maré
         */
                async buscarMares(local = "Vitória-ES", data = new Date()) {
                    const cacheKey = `${local}_${data.toISOString().split('T')[0]}`;
                    
                    // 1. Verificar cache primeiro
                    if (pescappAPI._verificarCache('mares', cacheKey)) {
                        console.log(`📦 Usando marés do cache: ${cacheKey}`);
                        return pescappAPI._obterDoCache('mares', cacheKey);
                    }

                    // 2. Obter coordenadas do local
                    const coords = this._obterCoordenadasPorLocal(local);
                    
                    console.log(`🌊 Calculando marés para ${local}...`);
                    
                    // 3. SEMPRE usar cálculo local (fallback garantido)
                    const resultado = this._calcularMaresLocais(coords.lat, coords.lon, data, local);
                    
                    // 4. Salvar no cache e retornar
                    pescappAPI._salvarNoCache('mares', cacheKey, resultado);
                    return resultado;
                },

        // Adicionar APÓS a função buscarMares, mas DENTRO do objeto mares:

        _obterCoordenadasPorLocal(local) {
            const mapeamento = {
                "Vitória-ES": { lat: -20.3155, lon: -40.3128 },
                "Vila Velha-ES": { lat: -20.3397, lon: -40.2944 },
                "Serra-ES": { lat: -20.1286, lon: -40.3078 },
                "Guarapari-ES": { lat: -20.6589, lon: -40.5095 },
                "Anchieta-ES": { lat: -20.8058, lon: -40.6425 }
            };
            
            return mapeamento[local] || mapeamento["Vitória-ES"];
        },

        _calcularMaresLocais(lat, lon, data, localNome) {
            const agora = data;
            const mares = [];
            
            // Ciclo de maré para ES (~12h 25min)
            const cicloMinutos = 12 * 60 + 25;
            
            // Gerar 4 marés no dia
            for (let i = 0; i < 4; i++) {
                const hora = 3 + (i * 6); // 03:00, 09:00, 15:00, 21:00
                const dataMare = new Date(agora);
                dataMare.setHours(hora, i % 2 === 0 ? 15 : 45, 0);
                
                const isAlta = i % 2 === 0;
                const altura = isAlta ? 1.2 : 0.4; // Alturas típicas do ES
                
                mares.push({
                    hora: dataMare,
                    tipo: isAlta ? 'alta' : 'baixa',
                    altura: altura.toFixed(2),
                    unidade: 'metros',
                    fonte: 'cálculo local',
                    confianca: 0.7
                });
            }
            
            return {
                local: localNome,
                data: data.toISOString().split('T')[0],
                mares: mares.sort((a, b) => a.hora - b.hora),
                fonte: 'Cálculo local PescApp',
                atualizadoEm: new Date().toISOString(),
                observacao: 'Dados calculados. Para dados oficiais: marinha.mil.br'
            };
        },

        /**
         * Tenta buscar dados do INPH (Instituto Nacional de Pesquisas Hidroviárias)
         * @private
         */
        async _buscarMaresINPH(local, data) {
            if (pescappAPI.config.debug) console.log('🌊 Tentando API INPH...');
            
            // API do INPH para Vitória-ES (exemplo)
            const codigoINPH = {
                "Vitória-ES": "49009",
                "Vila Velha-ES": "49010", 
                "Serra-ES": "49011"
            };

            const codigo = codigoINPH[local] || "49009";
            const dataStr = data.toISOString().split('T')[0];
            
            // URL do INPH (exemplo - pode precisar ajuste)
            const url = `https://www.portosdobrasil.gov.br/inph/api/mares/${codigo}?data=${dataStr}`;
            
            try {
                const response = await pescappAPI.utils.fetchComTimeout(url);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                
                const dados = await response.json();
                return this._processarDadosINPH(dados);
            } catch (error) {
                if (pescappAPI.config.debug) console.warn('API INPH falhou:', error.message);
                return null;
            }
        },

       /**
         * Buscar dados REAIS da Marinha do Brasil
         * @private
         */
        async _buscarMaresMarinha(local, data) {
            if (pescappAPI.config.debug) console.log('⚓ Buscando dados REAIS da Marinha do Brasil...');
            
            // Mapeamento de cidades para códigos da Marinha
            const codigosMarinha = {
                "Vitória-ES": "ES-001",
                "Vila Velha-ES": "ES-002", 
                "Serra-ES": "ES-001",
                "Guarapari-ES": "ES-003"
            };

            const codigo = codigosMarinha[local] || "ES-001";
            const ano = data.getFullYear();
            const mes = (data.getMonth() + 1).toString().padStart(2, '0');
            const dia = data.getDate();
            
            // TENTATIVA 1: Buscar JSON da Marinha
            const urlJSON = `https://www.marinha.mil.br/chm/sites/chm.portal/files/tabuas/${ano}/${mes}/${codigo}.json`;
            
            try {
                const response = await pescappAPI.utils.fetchComTimeout(urlJSON, {}, 8000);
                
                if (response.ok) {
                    const dadosBrutos = await response.json();
                    const dadosProcessados = this._processarDadosMarinhaReal(dadosBrutos, data);
                    
                    if (dadosProcessados) {
                        console.log('✅ Dados REAIS da Marinha obtidos!');
                        return dadosProcessados;
                    }
                }
            } catch (error) {
                console.log('JSON não disponível, tentando HTML...');
            }
            
            // TENTATIVA 2: Buscar página HTML
            return await this._buscarMaresMarinhaHTML(codigo, data);
        },


        /**
         * Calcula marés simuladas baseadas em ciclos lunares (fallback)
         * @private
         */
        async _calcularMaresSimuladas(local, data) {
            if (pescappAPI.config.debug) console.log('🌙 Calculando marés simuladas...');
            
            // Dados de fallback baseados em local conhecido
            const dadosBase = {
                "Vitória-ES": { lat: -20.3155, lng: -40.3128, alturaMedia: 1.2 },
                "Vila Velha-ES": { lat: -20.3397, lng: -40.2944, alturaMedia: 1.3 },
                "Serra-ES": { lat: -20.1286, lng: -40.3078, alturaMedia: 1.1 }
            };

            const base = dadosBase[local] || dadosBase["Vitória-ES"];
            
            // Calcular baseado na fase lunar
            const faseLunar = pescappAPI.utils.calcularFaseLunar(data);
            const cicloMare = pescappAPI.mares._calcularCicloMare ?
                pescappAPI.mares._calcularCicloMare(data, base.lat, base.lng) :
                [1, 1, 1, 1]; // Fallback
            
            // Gerar 4 marés por dia (2 altas, 2 baixas)
            const mares = [];
            for (let i = 0; i < 4; i++) {
                const hora = 3 + (i * 6); // 03:00, 09:00, 15:00, 21:00
                const horaDate = new Date(data);
                horaDate.setHours(hora, 0, 0, 0);
                
                const isAlta = i % 2 === 0;
                let altura = base.alturaMedia;
                
                // Ajustar altura pela fase lunar
                if (faseLunar === 'cheia' || faseLunar === 'nova') {
                    altura *= 1.3; // Marés de sizígia (maiores)
                } else if (faseLunar === 'quarto') {
                    altura *= 0.7; // Marés de quadratura (menores)
                }
                
                // Ajustar pelo ciclo diário
                altura *= cicloMare[i] || 1;
                
                mares.push({
                    hora: horaDate,
                    tipo: isAlta ? 'alta' : 'baixa',
                    altura: isAlta ? altura.toFixed(2) : (altura * 0.3).toFixed(2),
                    unidade: 'metros',
                    fonte: 'simulada',
                    confianca: 0.5
                });
            }

            return {
                local,
                data: data.toISOString().split('T')[0],
                mares,
                fonte: 'simulada',
                atualizadoEm: new Date().toISOString(),
                observacao: 'Dados calculados - verificar fonte oficial'
            };
        },

                /**
         * Processar dados JSON da Marinha
         * @private
         */
        _processarDadosMarinhaReal(dadosBrutos, data) {
            try {
                console.log('🔄 Processando dados da Marinha...', dadosBrutos);
                
                // Se os dados forem um array direto
                if (Array.isArray(dadosBrutos)) {
                    const dia = data.getDate();
                    const dadosDia = dadosBrutos.find(d => {
                        const dataDado = new Date(d.data || d.date);
                        return dataDado.getDate() === dia;
                    });
                    
                    if (!dadosDia) return null;
                    
                    const mares = dadosDia.mares || dadosDia.tides || [];
                    
                    return {
                        local: dadosDia.local || 'Porto de Vitória',
                        data: data.toISOString().split('T')[0],
                        mares: mares.map(m => ({
                            hora: new Date(m.hora || m.time),
                            tipo: m.tipo || m.type,
                            altura: parseFloat(m.altura || m.height),
                            fonte: 'Marinha do Brasil',
                            confianca: 0.95
                        })),
                        fonte: 'Marinha do Brasil (dados oficiais)',
                        atualizadoEm: new Date().toISOString()
                    };
                }
                
                // Se for objeto com estrutura diferente
                return {
                    local: dadosBrutos.local || 'Desconhecido',
                    data: data.toISOString().split('T')[0],
                    mares: [],
                    fonte: 'Marinha do Brasil (formato não reconhecido)',
                    atualizadoEm: new Date().toISOString(),
                    observacao: 'Estrutura de dados precisa ser ajustada'
                };
                
            } catch (error) {
                console.error('❌ Erro ao processar dados da Marinha:', error);
                return null;
            }
        },
        
        /**
         * Fallback: Buscar HTML se JSON não estiver disponível
         * @private
         */
        async _buscarMaresMarinhaHTML(codigo, data) {
            console.log('🌐 Buscando dados via HTML para código', codigo);
            
            // Por enquanto retorna null para usar dados simulados
            // Vamos implementar parser HTML na próxima etapa
            console.log('📝 Parser HTML será implementado na próxima etapa');
            return null;
        },

        /**
         * Processar dados JSON da Marinha
         * @private
         */
        _processarDadosMarinhaReal(dadosBrutos, data) {
            try {
                // Estrutura esperada (pode variar)
                const dia = data.getDate();
                const dadosDia = dadosBrutos.dias ? dadosBrutos.dias.find(d => d.dia === dia) : null;
                
                if (!dadosDia) {
                    console.warn('Dados do dia não encontrados no JSON');
                    return null;
                }
                
                const mares = [];
                
                // Processar marés (estrutura simplificada)
                // Esta função precisará ser ajustada conforme a estrutura real
                if (dadosDia.manha && dadosDia.manha.baixa) {
                    mares.push({
                        hora: new Date(data.getFullYear(), data.getMonth(), dia, 
                                      parseInt(dadosDia.manha.baixa.hora), 
                                      parseInt(dadosDia.manha.baixa.minuto)),
                        tipo: 'baixa',
                        altura: parseFloat(dadosDia.manha.baixa.altura?.replace('m', '') || '0.5'),
                        fonte: 'Marinha do Brasil',
                        confianca: 0.95
                    });
                }
                
                if (dadosDia.manha && dadosDia.manha.alta) {
                    mares.push({
                        hora: new Date(data.getFullYear(), data.getMonth(), dia,
                                      parseInt(dadosDia.manha.alta.hora),
                                      parseInt(dadosDia.manha.alta.minuto)),
                        tipo: 'alta',
                        altura: parseFloat(dadosDia.manha.alta.altura?.replace('m', '') || '1.2'),
                        fonte: 'Marinha do Brasil',
                        confianca: 0.95
                    });
                }
                
                // Ordenar por hora
                mares.sort((a, b) => a.hora - b.hora);
                
                return {
                    local: dadosBrutos.local || 'Desconhecido',
                    data: data.toISOString().split('T')[0],
                    mares,
                    fonte: 'Marinha do Brasil (dados oficiais)',
                    atualizadoEm: new Date().toISOString(),
                    observacao: 'Dados oficiais da Marinha do Brasil'
                };
                
            } catch (error) {
                console.error('Erro ao processar dados da Marinha:', error);
                return null;
            }
        },
        
        /**
         * Fallback: Buscar HTML se JSON não estiver disponível
         * @private
         */
        async _buscarMaresMarinhaHTML(codigo, data) {
            console.log('🌐 Buscando dados via HTML (fallback)...');
            
            // Por enquanto, retorna null para usar dados simulados
            // Implementaremos parser HTML depois
            return null;
        },

        /**
         * Processa dados do INPH
         * @private
         */
        _processarDadosINPH(dados) {
            // Formatar dados do INPH para padrão do app
            return {
                local: dados.local,
                data: dados.data,
                mares: dados.mares.map(m => ({
                    hora: new Date(m.hora),
                    tipo: m.tipo.toLowerCase(),
                    altura: m.altura,
                    unidade: 'metros',
                    fonte: 'INPH',
                    confianca: 0.9
                })),
                fonte: 'INPH',
                atualizadoEm: dados.atualizadoEm || new Date().toISOString()
            };
        },

        /**
         * Processa dados da Marinha
         * @private
         */
        _processarDadosMarinha(dados, data) {
            // Formatar dados da Marinha
            const dia = data.getDate();
            const dadosDia = dados.dias.find(d => d.dia === dia);
            
            if (!dadosDia) return null;

            return {
                local: dados.local,
                data: data.toISOString().split('T')[0],
                mares: dadosDia.mares.map(m => ({
                    hora: new Date(`${data.getFullYear()}-${(data.getMonth()+1).toString().padStart(2,'0')}-${dia.toString().padStart(2,'0')}T${m.hora}`),
                    tipo: m.tipo,
                    altura: parseFloat(m.altura),
                    unidade: 'metros',
                    fonte: 'Marinha',
                    confianca: 0.95
                })),
                fonte: 'Marinha do Brasil',
                atualizadoEm: dados.atualizadoEm || new Date().toISOString()
            };
        },

        /**
         * Calcula coeficiente de maré baseado em posição e tempo
         * @private
         */
        _calcularCicloMare(data, lat, lng) {
            // Fórmula simplificada para cálculo de marés
            const horasUTC = data.getUTCHours() + data.getUTCMinutes() / 60;
            const coeficientes = [];
            
            for (let i = 0; i < 4; i++) {
                const horaLocal = (horasUTC + i * 6 - 3) % 24;
                const angulo = (horaLocal * 15 + lng) * Math.PI / 180;
                const coeficiente = 0.5 + 0.5 * Math.sin(angulo);
                coeficientes.push(coeficiente);
            }
            
            return coeficientes;
        }
    },

    // ============ CÁLCULO DE PROBABILIDADE ============
    probabilidade: {
        /**
         * Calcula probabilidade de pesca (0-10)
         * @param {Object} params - Parâmetros para cálculo
         * @returns {number} Score de 0 a 10
         */
        async calcular(params) {
            const fatores = await this._coletarFatores(params);
            return this._calcularScore(fatores);
        },

        /**
         * Coleta todos os fatores para cálculo
         * @private
         */
        async _coletarFatores(params) {
            const { local, data = new Date(), praia } = params;
            
            // Coletar dados em paralelo
            const [dadosMares, dadosMeteorologia] = await Promise.allSettled([
                pescappAPI.mares.buscarMares(local, data),
                this._buscarMeteorologia(local, data)
            ]);

            const fatores = {
                // Dados de maré (40% do score)
                mare: dadosMares.status === 'fulfilled' ? 
                    this._analisarMares(dadosMares.value, data) : 
                    { score: 5, detalhes: 'Dados de maré não disponíveis' },
                
                // Condições atmosféricas (30%)
                atmosfera: dadosMeteorologia.status === 'fulfilled' ?
                    this._analisarMeteorologia(dadosMeteorologia.value) :
                    { score: 5, detalhes: 'Dados meteorológicos não disponíveis' },
                
                // Fatores locais da praia (20%)
                local: this._analisarFatoresLocais(praia),
                
                // Restrições (10%)
                restricoes: this._verificarRestricoes(praia, data)
            };

            return fatores;
        },

        /**
         * Analisa dados de maré
         * @private
         */
        _analisarMares(dadosMares, dataHora) {
            const agora = dataHora;
            const proximas6h = new Date(agora.getTime() + 6 * 60 * 60 * 1000);
            
            // Encontrar marés nas próximas 6 horas
            const maresProximas = dadosMares.mares.filter(m => 
                m.hora >= agora && m.hora <= proximas6h
            );

            if (maresProximas.length === 0) {
                return { score: 4, detalhes: 'Sem dados de maré nas próximas horas' };
            }

            // Verificar se há transição de vazante para enchente (melhor para pesca)
            let score = 5;
            let detalhes = [];
            
            for (let i = 0; i < maresProximas.length - 1; i++) {
                const atual = maresProximas[i];
                const proxima = maresProximas[i + 1];
                
                if (atual.tipo === 'baixa' && proxima.tipo === 'alta') {
                    // Vazante para enchente - excelente
                    const horasParaTransicao = (proxima.hora - agora) / (1000 * 60 * 60);
                    
                    if (horasParaTransicao <= 2) {
                        score = 9;
                        detalhes.push(`Excelente: Maré começando a encher em ${horasParaTransicao.toFixed(1)}h`);
                    } else if (horasParaTransicao <= 4) {
                        score = 7;
                        detalhes.push(`Bom: Maré começará a encher em ${horasParaTransicao.toFixed(1)}h`);
                    }
                    break;
                }
            }

            // Ajustar pela altura da maré
            const mareAtual = maresProximas.find(m => m.hora >= agora) || maresProximas[0];
            if (mareAtual) {
                const altura = parseFloat(mareAtual.altura);
                if (altura >= 0.8 && altura <= 1.5) {
                    score += 1; // Altura ideal
                    detalhes.push(`Altura ideal: ${altura}m`);
                }
            }

            return {
                score: Math.min(score, 10),
                detalhes: detalhes.length > 0 ? detalhes.join('; ') : 'Condições de maré normais'
            };
        },

        /**
         * Analisa dados meteorológicos (simplificado)
         * @private
         */
        _analisarMeteorologia(dadosMeteo) {
            // Implementação simplificada
            let score = 6;
            let detalhes = [];
            
            if (dadosMeteo.pressao > 1015) {
                score += 2;
                detalhes.push('Pressão alta (bom para pesca)');
            }
            
            if (dadosMeteo.vento < 20) {
                score += 1;
                detalhes.push('Vento fraco');
            }
            
            if (!dadosMeteo.chuva) {
                score += 1;
                detalhes.push('Sem chuva');
            }

            return {
                score: Math.min(score, 10),
                detalhes: detalhes.length > 0 ? detalhes.join('; ') : 'Condições meteorológicas médias'
            };
        },

        /**
         * Analisa fatores locais da praia
         * @private
         */
        _analisarFatoresLocais(praia) {
            if (!praia) return { score: 5, detalhes: 'Dados da praia não disponíveis' };
            
            let score = 5;
            let detalhes = [];
            
            // Verificar tipo de praia
            if (praia.tipo === 'praia_areia') {
                score += 1;
                detalhes.push('Praia de areia (boa para robalo)');
            }
            
            // Verificar se é noite (melhor para algumas espécies)
            const agora = new Date();
            const hora = agora.getHours();
            if (hora >= 18 || hora <= 6) {
                score += 1;
                detalhes.push('Período noturno (melhor para robalo)');
            }
            
            return {
                score: Math.min(score, 10),
                detalhes: detalhes.join('; ')
            };
        },

        /**
         * Verifica restrições
         * @private
         */
        _verificarRestricoes(praia, data) {
            if (!praia || !praia.restricoes) {
                return { score: 10, penalidades: [] };
            }
            
            const penalidades = [];
            
            // Verificar defeso
            if (praia.restricoes.defeso) {
                const hoje = data.toISOString().split('T')[0];
                praia.restricoes.defeso.forEach(defeso => {
                    // Simplificado - verificar lógica real depois
                    penalidades.push(`Defeso para ${defeso.especie}`);
                });
            }
            
            // Verificar horários restritos
            if (praia.restricoes.horariosRestritos) {
                const horaAtual = data.getHours();
                if (horaAtual >= 10 && horaAtual <= 17) {
                    penalidades.push('Horário com muitos banhistas');
                }
            }
            
            const score = Math.max(1, 10 - penalidades.length * 3);
            
            return {
                score,
                penalidades
            };
        },

        /**
         * Busca dados meteorológicos REAIS
         * @private
         */
        async _buscarMeteorologia(local, dataParam) {
            // 1. Obter coordenadas do local
            const coords = pescappAPI.mares._obterCoordenadasPorLocal ?
                pescappAPI.mares._obterCoordenadasPorLocal(local) :
                { lat: -20.3155, lon: -40.3128 }; // Fallback Vitória
            
            // 2. Cache key
            const cacheKey = `meteo_${coords.lat}_${coords.lon}`;
            
            // 3. Verificar cache
            if (pescappAPI._verificarCache('meteorologia', cacheKey)) {
                return pescappAPI._obterDoCache('meteorologia', cacheKey);
            }
            
            // 4. SUA CHAVE OpenWeatherMap
            const API_KEY = '8daa651b9df7d8a11b2c0c4bc08bebde';
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&lang=pt&appid=${API_KEY}`;
            
            try {
                console.log('🌤️ Buscando dados REAIS do OpenWeather...');
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                
                const weatherData = await response.json();
                
                const resultado = {
                    temperatura: weatherData.main.temp,
                    pressao: weatherData.main.pressure,
                    vento: weatherData.wind.speed,
                    direcaoVento: this._grausParaDirecao(weatherData.wind.deg),
                    umidade: weatherData.main.humidity,
                    condicao: weatherData.weather[0].description,
                    cidade: weatherData.name,
                    fonte: 'OpenWeatherMap',
                    atualizadoEm: new Date().toISOString()
                };
                
                // 5. Salvar no cache
                pescappAPI._salvarNoCache('meteorologia', cacheKey, resultado);
                console.log('✅ Dados meteorológicos REAIS obtidos!');
                
                return resultado;
                
            } catch (error) {
                console.warn('❌ Erro OpenWeather, usando fallback:', error.message);
                
                // Fallback
                return {
                    temperatura: 28,
                    pressao: 1018,
                    vento: 15,
                    direcaoVento: 'NE',
                    chuva: false,
                    fonte: 'simulada (fallback)',
                    atualizadoEm: new Date().toISOString()
                };
            }
        },

        // Adicione esta função auxiliar também:
        _grausParaDirecao(graus) {
            const direcoes = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'];
            const index = Math.round(graus / 45) % 8;
            return direcoes[index];
        },

        /**
         * Calcula score final baseado nos fatores
         * @private
         */
        _calcularScore(fatores) {
            // Pesos para cada fator
            const pesos = {
                mare: 0.40,      // 40%
                atmosfera: 0.30, // 30%
                local: 0.20,     // 20%
                restricoes: 0.10 // 10%
            };
            
            // Calcular score ponderado
            let scoreFinal = 0;
            const detalhes = [];
            
            for (const [tipo, dados] of Object.entries(fatores)) {
                const peso = pesos[tipo];
                const score = dados.score;
                
                scoreFinal += score * peso;
                detalhes.push(`${tipo}: ${score}/10`);
                
                if (dados.penalidades && dados.penalidades.length > 0) {
                    detalhes.push(`Penalidades: ${dados.penalidades.join(', ')}`);
                }
            }
            
            // Arredondar para inteiro de 0-10
            scoreFinal = Math.round(Math.max(0, Math.min(10, scoreFinal)));
            
            return {
                score: scoreFinal,
                detalhes: detalhes,
                fatores: fatores
            };
        }
    },

    // ============ UTILITÁRIOS ============
    utils: {
        /**
         * Fetch com timeout
         */
        async fetchComTimeout(url, options = {}, timeout = pescappAPI.config.timeout) {
            // ADICIONAR PROXY CORS PARA SITES OFICIAIS
            const corsProxies = [
                'https://api.allorigins.win/raw?url=',
                'https://corsproxy.io/?',
                'https://proxy.cors.sh/'
            ];
            
            // Se for URL da Marinha ou INPH, usar proxy
            if (url.includes('marinha.mil.br') || url.includes('portosdobrasil.gov.br')) {
                const proxyUrl = corsProxies[0] + encodeURIComponent(url);
                console.log('🔗 Usando proxy CORS para:', url);
                url = proxyUrl;
            }
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);
            
            try {
                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal
                });
                clearTimeout(id);
                return response;
            } catch (error) {
                clearTimeout(id);
                throw error;
            }
        },

        /**
         * Calcula fase lunar CORRETA (baseada em algoritmo real)
         */
        calcularFaseLunar(data = new Date()) {
            // Algoritmo de fase lunar CORRETO
            // Fonte: Astronomical Algorithms by Jean Meeus
            
            const year = data.getFullYear();
            const month = data.getMonth() + 1;
            const day = data.getDate();
            
            // 1. Calcular Dias Julianos
            let a = Math.floor((14 - month) / 12);
            let y = year + 4800 - a;
            let m = month + 12 * a - 3;
            
            // Data Julian
            let jd = day + Math.floor((153 * m + 2) / 5) + 365 * y +
                    Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
            
            // 2. Calcular fase desde última lua nova (janeiro 2000)
            const newMoon2000 = 2451550.1; // JD da primeira lua nova de 2000
            const lunarCycle = 29.530588853; // Duração do ciclo lunar em dias
            
            // Dias desde última lua nova
            const daysSinceNew = (jd - newMoon2000) % lunarCycle;
            
            // 3. Determinar fase baseada em dias do ciclo
            let phase = daysSinceNew / lunarCycle;
            
            // 4. Converter para nome da fase
            if (phase < 0.03 || phase >= 0.97) return 'nova';
            if (phase < 0.22) return 'crescente';
            if (phase < 0.28) return 'quartocrescente';
            if (phase < 0.47) return 'crescente';
            if (phase < 0.53) return 'cheia';
            if (phase < 0.72) return 'minguante';
            if (phase < 0.78) return 'quartominguante';
            return 'minguante';
        },

        /**
         * Formata hora para string legível
         */
        formatarHora(data) {
            return data.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        }
    },

    // ============ GERENCIAMENTO DE CACHE ============
    _verificarCache(tipo, chave) {
        const cache = this.state.cache[tipo];
        if (!cache || !cache[chave]) return false;
        
        const cacheData = cache[chave];
        const duracao = this.config.cacheDuration[tipo];
        const agora = new Date().getTime();
        
        return (agora - cacheData.timestamp) < duracao;
    },

    _obterDoCache(tipo, chave) {
        return this.state.cache[tipo][chave].dados;
    },

    _salvarNoCache(tipo, chave, dados) {
        if (!this.state.cache[tipo]) {
            this.state.cache[tipo] = {};
        }
        
        this.state.cache[tipo][chave] = {
            dados,
            timestamp: new Date().getTime()
        };
        
        // Limpar cache antigo
        this._limparCacheAntigo(tipo);
    },

    _limparCacheAntigo(tipo) {
        const cache = this.state.cache[tipo];
        const duracao = this.config.cacheDuration[tipo];
        const agora = new Date().getTime();
        
        for (const chave in cache) {
            if (agora - cache[chave].timestamp > duracao * 2) { // Cache com o dobro da duração
                delete cache[chave];
            }
        }
    },

    // ============ INICIALIZAÇÃO ============
    init() {
        if (this.config.debug) {
            console.log('🌊 PescApp APIs inicializadas');
            console.log('📡 APIs disponíveis: mares, probabilidade');
        }
        
        // Monitorar conexão
        window.addEventListener('online', () => {
            this.state.isOnline = true;
            if (this.config.debug) console.log('✅ Conexão restaurada');
        });
        
        window.addEventListener('offline', () => {
            this.state.isOnline = false;
            if (this.config.debug) console.warn('⚠️ Sem conexão - usando dados locais');
        });
        
        return this;
    }
};

// Inicializar automaticamente
pescappAPI.init();

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = pescappAPI;
} else {
    window.pescappAPI = pescappAPI;
}

console.log('📡 Módulo de APIs carregado - pescappAPI disponível');