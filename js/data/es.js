// dados-es.js - Dados completos do Espírito Santo
const dadosES = {
    nome: "Espírito Santo",
    sigla: "ES",
    regiao: "Sudeste",
    kmCosta: 400,
    infoGeral: "Estado com diversidade de praias: urbanas, selvagens, de costão e de areia. Pesca variada de robalo, corvina, garoupa e espécies oceânicas.",
    
    cidades: {
        // 1. VITÓRIA - Capital
        "Vitória": {
            infoGeral: "Capital do estado, situada em uma ilha. Mistura de praias urbanas e áreas preservadas.",
            tipoPredominante: "Praias urbanas e costões",
            especiesComuns: "Robalo, Corvina, Pescada, Garoupa",
            melhoresMeses: "Setembro a Março",
            
            praias: {
                "Praia de Camburi": {
                    dadosVerificados: true,
                    descricao: "Única praia oceânica da capital, extensa faixa de areia com calçadão. Boa pesca noturna.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia" },
                        { icon: "fa-fish", title: "Espécies Principais", value: "Robalo, Corvina, Pescada" },
                        { icon: "fa-anchor", title: "Melhor Época", value: "Setembro a Março" },
                        { icon: "fa-wind", title: "Ventos", value: "Nordeste (verão)" },
                        { icon: "fa-temperature-high", title: "Temp. Água", value: "23°C - 27°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "6-18 metros" },
                        { icon: "fa-calendar", title: "Maré Ideal", value: "Vazante para enchente" }
                    ],
                    recomendacoes: [
                        "Pesca noturna é mais produtiva",
                        "Iscas vivas de camarão ou sardinha",
                        "Evitar áreas com banhistas",
                        "Equipamento médio (linha 0.30-0.40)"
                    ]
                },
                
                "Praia do Canto": {
                    dadosVerificados: false,
                    descricao: "Praia urbana na baía, águas mais calmas. Pesca tradicional local.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Baía protegida" },
                        { icon: "fa-fish", title: "Espécies", value: "Corvina, Pescada, Robalo" },
                        { icon: "fa-anchor", title: "Época", value: "Ano todo" },
                        { icon: "fa-water", title: "Correnteza", value: "Fraca a moderada" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "22°C - 26°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "4-12 metros" }
                    ],
                    recomendacoes: [
                        "Pesca de fundo com iscas naturais",
                        "Melhor na maré enchente",
                        "Atenção ao tráfego de barcos",
                        "Equipamento leve a médio"
                    ]
                },
                
                "Praia da Curva da Jurema": {
                    dadosVerificados: false,
                    descricao: "Praia em formato de curva, ponto tradicional de pesca.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia" },
                        { icon: "fa-fish", title: "Espécies", value: "Robalo, Corvina" },
                        { icon: "fa-anchor", title: "Época", value: "Outubro a Abril" },
                        { icon: "fa-wind", title: "Ventos", value: "Leste" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "23°C - 28°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "5-15 metros" }
                    ],
                    recomendacoes: [
                        "Pesca de arremesso",
                        "Iscas artificiais tipo minnows",
                        "Melhor no nascer do sol",
                        "Equipamento médio"
                    ]
                }
            }
        },
        
        // 2. VILA VELHA - Maior população litorânea
        "Vila Velha": {
            infoGeral: "Município mais populoso do litoral capixaba. Praias variadas: urbanas, de costão e oceânicas.",
            tipoPredominante: "Costões rochosos e praias de areia",
            especiesComuns: "Garoupa, Badejo, Robalo, Corvina",
            melhoresMeses: "Outubro a Abril",
            
            praias: {
                "Praia da Costa": {
                    dadosVerificados: true,
                    descricao: "Praia mais famosa e movimentada, extenso calçadão. Boa pesca de robalo e corvina.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia" },
                        { icon: "fa-fish", title: "Espécies Principais", value: "Robalo, Corvina, Pescada" },
                        { icon: "fa-anchor", title: "Melhor Época", value: "Outubro a Abril" },
                        { icon: "fa-wind", title: "Ventos", value: "Leste constante" },
                        { icon: "fa-temperature-high", title: "Temp. Água", value: "22°C - 26°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "7-20 metros" },
                        { icon: "fa-calendar", title: "Maré Ideal", value: "Baixa para subindo" }
                    ],
                    recomendacoes: [
                        "Pescar cedo da manhã (antes dos banhistas)",
                        "Iscas artificiais tipo shads ou colheres",
                        "Evitar fins de semana no verão",
                        "Equipamento leve a médio"
                    ]
                },
                
                "Praia de Itaparica": {
                    dadosVerificados: true,
                    descricao: "Praia com costão rochoso famoso, excelente para pesca de fundo de garoupa e badejo.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Costão rochoso" },
                        { icon: "fa-fish", title: "Espécies Principais", value: "Garoupa, Badejo, Pargo" },
                        { icon: "fa-anchor", title: "Melhor Época", value: "Ano todo" },
                        { icon: "fa-wind", title: "Ventos", value: "Sudeste (inverno)" },
                        { icon: "fa-temperature-high", title: "Temp. Água", value: "21°C - 25°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "15-40 metros" },
                        { icon: "fa-mountain", title: "Fundo", value: "Rochoso com fendas" }
                    ],
                    recomendacoes: [
                        "Pesca de fundo com caranguejo ou siri vivo",
                        "Equipamento pesado (linha 0.50+)",
                        "Cuidado com as pedras escorregadias",
                        "Melhor na maré baixa para acessar pedras"
                    ]
                },
                
                "Praia de Itapoã": {
                    dadosVerificados: false,
                    descricao: "Praia entre a Praia da Costa e Itaparica, menos movimentada.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Transição areia/rocha" },
                        { icon: "fa-fish", title: "Espécies", value: "Robalo, Corvina, Garoupa" },
                        { icon: "fa-anchor", title: "Época", value: "Setembro a Março" },
                        { icon: "fa-wind", title: "Ventos", value: "Leste" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "22°C - 27°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "8-25 metros" }
                    ],
                    recomendacoes: [
                        "Pesca mista (arremesso e fundo)",
                        "Iscas naturais versáteis",
                        "Boa opção quando outras estão cheias",
                        "Equipamento médio"
                    ]
                },
                
                "Praia da Barra do Jucu": {
                    dadosVerificados: false,
                    descricao: "Foz do Rio Jucu, pesca mista de água doce e salgada.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Estuário (água mista)" },
                        { icon: "fa-fish", title: "Espécies", value: "Robalo, Tainha, Camarão" },
                        { icon: "fa-anchor", title: "Época", value: "Setembro a Março" },
                        { icon: "fa-water", title: "Correnteza", value: "Forte na maré" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "23°C - 28°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "4-15 metros" }
                    ],
                    recomendacoes: [
                        "Pescar na 'boca' do rio na maré enchente",
                        "Iscas vivas de tainha pequena",
                        "Cuidado com a correnteza",
                        "Equipamento médio resistente"
                    ]
                }
            }
        },
        
        // 3. SERRA - Maior extensão de praias
        "Serra": {
            infoGeral: "Maior extensão de praias do estado (cerca de 40km). Praias variadas: urbanizadas a selvagens.",
            tipoPredominante: "Praias extensas de areia",
            especiesComuns: "Robalo, Corvina, Pescada, Cavala",
            melhoresMeses: "Novembro a Abril",
            
            praias: {
                "Praia de Jacaraípe": {
                    dadosVerificados: true,
                    descricao: "Praia extensa famosa pelo artesanato de barro e boas ondas. Excelente pesca de robalo na arrebentação.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia com arrebentação" },
                        { icon: "fa-fish", title: "Espécies Principais", value: "Robalo, Corvina, Cavala" },
                        { icon: "fa-anchor", title: "Melhor Época", value: "Novembro a Abril" },
                        { icon: "fa-wind", title: "Ventos", value: "Nordeste (verão)" },
                        { icon: "fa-temperature-high", title: "Temp. Água", value: "24°C - 28°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "8-25 metros" },
                        { icon: "fa-water", title: "Ondas", value: "Médias a fortes" }
                    ],
                    recomendacoes: [
                        "Pesca de arremesso na arrebentação",
                        "Iscas artificiais tipo surface poppers",
                        "Melhor no amanhecer e entardecer",
                        "Equipamento médio a pesado para longos arremessos"
                    ]
                },
                
                "Praia de Carapebus": {
                    dadosVerificados: true,
                    descricao: "Uma das mais extensas praias do ES, parte preservada com restinga. Pesca esportiva de qualidade.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia selvagem extensa" },
                        { icon: "fa-fish", title: "Espécies Principais", value: "Robalo, Corvina, Pescada, Dourado" },
                        { icon: "fa-anchor", title: "Melhor Época", value: "Outubro a Março" },
                        { icon: "fa-wind", title: "Ventos", value: "Leste constante" },
                        { icon: "fa-temperature-high", title: "Temp. Água", value: "23°C - 27°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "10-30 metros" },
                        { icon: "fa-tree", title: "Ambiente", value: "Restinga preservada" }
                    ],
                    recomendacoes: [
                        "Acesso por trilhas (4x4 recomendado)",
                        "Iscas artificiais coloridas (água mais clara)",
                        "Levar água e comida (área remota)",
                        "Equipamento para peixes de corrida"
                    ]
                },
                
                "Praia de Nova Almeida": {
                    dadosVerificados: false,
                    descricao: "Praia histórica (antiga aldeia jesuíta), mais calma que Jacaraípe.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia" },
                        { icon: "fa-fish", title: "Espécies", value: "Robalo, Corvina, Pescada" },
                        { icon: "fa-anchor", title: "Época", value: "Setembro a Março" },
                        { icon: "fa-wind", title: "Ventos", value: "Leste" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "23°C - 28°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "6-20 metros" }
                    ],
                    recomendacoes: [
                        "Pesca tradicional local",
                        "Iscas naturais de camarão ou minhoca",
                        "Boa para famílias (infraestrutura)",
                        "Equipamento médio"
                    ]
                },
                
                "Praia das Gaivotas": {
                    dadosVerificados: false,
                    descricao: "Praia próxima à Mãe-Bá, menos movimentada.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia" },
                        { icon: "fa-fish", title: "Espécies", value: "Corvina, Pescada" },
                        { icon: "fa-anchor", title: "Época", value: "Ano todo" },
                        { icon: "fa-wind", title: "Ventos", value: "Leste moderado" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "22°C - 27°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "5-18 metros" }
                    ],
                    recomendacoes: [
                        "Pesca de fundo com iscas naturais",
                        "Boa para iniciantes",
                        "Área mais tranquila",
                        "Equipamento leve a médio"
                    ]
                },
                
                "Praia de Manguinhos": {
                    dadosVerificados: false,
                    descricao: "Praia próxima ao centro da Serra, fácil acesso.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia urbana" },
                        { icon: "fa-fish", title: "Espécies", value: "Robalo, Corvina" },
                        { icon: "fa-anchor", title: "Época", value: "Outubro a Abril" },
                        { icon: "fa-wind", title: "Ventos", value: "Nordeste" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "24°C - 29°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "7-22 metros" }
                    ],
                    recomendacoes: [
                        "Pesca noturna evita banhistas",
                        "Iscas vivas de sardinha",
                        "Acesso fácil (próximo à cidade)",
                        "Equipamento médio"
                    ]
                },
                
                "Praia do Canto do Atlântico": {
                    dadosVerificados: false,
                    descricao: "Praia em condomínio fechado, acesso restrito.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia privada" },
                        { icon: "fa-fish", title: "Espécies", value: "Robalo, Corvina" },
                        { icon: "fa-anchor", title: "Época", value: "Novembro a Março" },
                        { icon: "fa-wind", title: "Ventos", value: "Leste" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "23°C - 28°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "8-24 metros" }
                    ],
                    recomendacoes: [
                        "Verificar acesso com segurança",
                        "Pesca mais tranquila (menos pessoas)",
                        "Respeitar regras do condomínio",
                        "Equipamento médio"
                    ]
                },
                
                "Praia de Barcelona": {
                    dadosVerificados: false,
                    descricao: "Praia no extremo norte da Serra, próxima a Fundão.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia" },
                        { icon: "fa-fish", title: "Espécies", value: "Robalo, Pescada" },
                        { icon: "fa-anchor", title: "Época", value: "Setembro a Março" },
                        { icon: "fa-wind", title: "Ventos", value: "Nordeste" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "22°C - 27°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "6-19 metros" }
                    ],
                    recomendacoes: [
                        "Pesca de arremesso",
                        "Iscas artificiais tipo shads",
                        "Área menos explorada",
                        "Equipamento médio"
                    ]
                }
            }
        },
        
        // 4. GUARAPARI - Cidade Saúde (resumido para exemplo)
        "Guarapari": {
            infoGeral: "Famosa pelas areias monazíticas.",
            tipoPredominante: "Praias de areia e costões",
            especiesComuns: "Robalo, Anchova, Xaréu, Garoupa",
            melhoresMeses: "Novembro a Abril",
            
            praias: {
                "Praia do Morro": {
                    dadosVerificados: true,
                    descricao: "Praia mais famosa, entre dois morros, águas cristalinas.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Entre morros" },
                        { icon: "fa-fish", title: "Espécies", value: "Robalo, Anchova, Xaréu" },
                        { icon: "fa-anchor", title: "Época", value: "Novembro a Abril" },
                        { icon: "fa-wind", title: "Ventos", value: "Nordeste" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "24°C - 28°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "8-25 metros" }
                    ],
                    recomendacoes: [
                        "Pesca com barcos de aluguel",
                        "Iscas artificiais coloridas",
                        "Fios finos (água transparente)",
                        "Melhor na maré vazante"
                    ]
                },
                
                "Praia das Castanheiras": {
                    dadosVerificados: true,
                    descricao: "Praia com areias monazíticas.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Areias monazíticas" },
                        { icon: "fa-fish", title: "Espécies", value: "Robalo, Corvina, Pescada" },
                        { icon: "fa-anchor", title: "Época", value: "Setembro a Março" },
                        { icon: "fa-wind", title: "Ventos", value: "Leste" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "23°C - 27°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "5-15 metros" }
                    ],
                    recomendacoes: [
                        "Pesca de arremesso",
                        "Iscas naturais",
                        "Cuidado com areia radioativa",
                        "Equipamento médio"
                    ]
                }
            }
        },
        
        // 5. Outros municípios (resumidos)
        "Anchieta": {
            infoGeral: "Município histórico.",
            tipoPredominante: "Praias de areia",
            especiesComuns: "Robalo, Corvina, Garoupa",
            melhoresMeses: "Outubro a Março",
            
            praias: {
                "Praia de Anchieta (Central)": {
                    dadosVerificados: false,
                    descricao: "Praia principal.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada" },
                        { icon: "fa-fish", title: "Espécies", value: "Robalo, Corvina" },
                        { icon: "fa-anchor", title: "Época", value: "Outubro a Março" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "23°C - 27°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "7-22 metros" }
                    ],
                    recomendacoes: [
                        "Pesca tradicional",
                        "Iscas naturais",
                        "Equipamento médio"
                    ]
                }
            }
        }
        // Nota: Outros municípios em versão resumida para teste
    }
};

// Exportar os dados
if (typeof module !== 'undefined' && module.exports) {
    module.exports = dadosES;
}