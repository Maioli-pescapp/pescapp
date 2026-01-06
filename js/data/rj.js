// dados-rj.js - Dados do Rio de Janeiro
const dadosRJ = {
    nome: "Rio de Janeiro",
    sigla: "RJ",
    regiao: "Sudeste",
    kmCosta: 635,
    infoGeral: "Estado com praias mundialmente famosas, de Copacabana a Búzios. Diversidade de pesca: urbana, costão, oceânica e esportiva.",
    
    cidades: {
        // 1. RIO DE JANEIRO (capital)
        "Rio de Janeiro": {
            infoGeral: "Cidade maravilhosa com praias urbanas famosas e costões rochosos.",
            tipoPredominante: "Praias urbanas e costões",
            especiesComuns: "Corvina, Robalo, Garoupa, Pescada",
            melhoresMeses: "Setembro a Abril",
            
            praias: {
                "Praia de Copacabana": {
                    dadosVerificados: true,
                    descricao: "Uma das praias mais famosas do mundo, com 4km de extensão. Excelente pesca noturna de corvina e robalo, especialmente no quebra-mar.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia" },
                        { icon: "fa-fish", title: "Espécies Principais", value: "Corvina, Robalo, Pescada, Garoupa" },
                        { icon: "fa-anchor", title: "Melhor Época", value: "Setembro a Abril" },
                        { icon: "fa-temperature-high", title: "Temp. Água", value: "22°C - 26°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "8-20 metros" },
                        { icon: "fa-users", title: "Movimento", value: "Muito alto (evitar dias de sol)" },
                        { icon: "fa-calendar", title: "Horário Ideal", value: "22h às 5h" }
                    ],
                    recomendacoes: [
                        "Pesca noturna é a mais produtiva (após 22h)",
                        "Iscas vivas de camarão ou sardinha",
                        "Melhores pontos: quebra-mar e extremidades",
                        "Equipamento médio (linha 0.30-0.40)",
                        "Evitar fins de semana no verão"
                    ],
                    pontosPesca: ["Quebra-mar", "Posto 6", "Próximo ao Forte"]
                },
                
                "Praia de Ipanema": {
                    dadosVerificados: true,
                    descricao: "Famosa praia com o Morro Dois Irmãos ao fundo. Boa pesca de robalo na arrebentação e corvina à noite.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia" },
                        { icon: "fa-fish", title: "Espécies Principais", value: "Robalo, Corvina, Anchova, Pescada" },
                        { icon: "fa-anchor", title: "Melhor Época", value: "Outubro a Março" },
                        { icon: "fa-temperature-high", title: "Temp. Água", value: "23°C - 27°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "7-18 metros" },
                        { icon: "fa-wind", title: "Ventos", value: "Forte (fins de tarde)" },
                        { icon: "fa-mountain", title: "Referência", value: "Morro Dois Irmãos" }
                    ],
                    recomendacoes: [
                        "Pescar no Posto 9 (mais tranquilo)",
                        "Iscas artificiais tipo surface poppers para robalo",
                        "Iscas naturais para corvina à noite",
                        "Melhor no amanhecer (antes dos banhistas)",
                        "Cuidado com ventos fortes da tarde"
                    ],
                    pontosPesca: ["Posto 9", "Arpoador", "Canal do Jardim de Alá"]
                },
                
                "Praia da Barra da Tijuca": {
                    dadosVerificados: true,
                    descricao: "Maior praia do Rio (18km). Excelente para pesca de arremesso de robalo e corvina. Áreas menos movimentadas no Recreio.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia extensa" },
                        { icon: "fa-fish", title: "Espécies Principais", value: "Robalo, Corvina, Cavala, Anchova" },
                        { icon: "fa-anchor", title: "Melhor Época", value: "Setembro a Abril" },
                        { icon: "fa-temperature-high", title: "Temp. Água", value: "21°C - 25°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "6-18 metros" },
                        { icon: "fa-water", title: "Ondas", value: "Fortes (boa para surf)" },
                        { icon: "fa-ruler", title: "Extensão", value: "18km" }
                    ],
                    recomendacoes: [
                        "Pesca de arremesso com varas longas (4m+)",
                        "Iscas artificiais tipo shads ou colheres",
                        "Áreas menos movimentadas: Recreio ou extremidades",
                        "Equipamento médio a pesado para longos arremessos",
                        "Melhor nas primeiras horas da manhã"
                    ],
                    pontosPesca: ["Recreio", "Quebra-mar da Barra", "Pontal"]
                },
                
                "Praia do Leblon": {
                    dadosVerificados: false,
                    descricao: "Praia mais familiar e tranquila que Ipanema. Boa pesca noturna.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia" },
                        { icon: "fa-fish", title: "Espécies", value: "Corvina, Pescada, Robalo" },
                        { icon: "fa-anchor", title: "Época", value: "Setembro a Março" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "22°C - 26°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "6-16 metros" },
                        { icon: "fa-users", title: "Público", value: "Familiar" }
                    ],
                    recomendacoes: [
                        "Pesca noturna no canal",
                        "Iscas naturais de camarão",
                        "Mais tranquila que Ipanema",
                        "Equipamento médio"
                    ]
                },
                
                "Praia do Leme": {
                    dadosVerificados: false,
                    descricao: "Extensão de Copacabana, ao pé do Morro do Leme. Boa pesca no costão.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Costão rochoso" },
                        { icon: "fa-fish", title: "Espécies", value: "Garoupa, Badejo, Pargo" },
                        { icon: "fa-anchor", title: "Época", value: "Ano todo" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "22°C - 27°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "10-30 metros" }
                    ],
                    recomendacoes: [
                        "Pesca de fundo no costão",
                        "Iscas naturais de caranguejo",
                        "Cuidado com as pedras",
                        "Equipamento pesado"
                    ]
                }
            }
        },
        
        // 2. NITERÓI (cidade vizinha)
        "Niterói": {
            infoGeral: "Cidade com vista para a Baía de Guanabara e praias oceânicas.",
            tipoPredominante: "Baía e praias oceânicas",
            especiesComuns: "Corvina, Pescada, Robalo, Garoupa",
            melhoresMeses: "Ano todo",
            
            praias: {
                "Praia de Icaraí": {
                    dadosVerificados: true,
                    descricao: "Praia urbana com vista espetacular para o Pão de Açúcar. Boa pesca noturna de corvina e pescada na baía.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Baía de Guanabara" },
                        { icon: "fa-fish", title: "Espécies Principais", value: "Corvina, Pescada, Robalo, Bagre" },
                        { icon: "fa-anchor", title: "Melhor Época", value: "Ano todo" },
                        { icon: "fa-temperature-high", title: "Temp. Água", value: "22°C - 27°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "5-15 metros" },
                        { icon: "fa-eye", title: "Vista", value: "Panorâmica (Pão de Açúcar)" },
                        { icon: "fa-calendar", title: "Maré", value: "Melhor na enchente" }
                    ],
                    recomendacoes: [
                        "Pesca noturna no calçadão (após 20h)",
                        "Iscas naturais de camarão ou minhoca do mar",
                        "Evitar dias de maré baixa (água mais suja)",
                        "Equipamento leve a médio",
                        "Pescar no canto esquerdo da praia"
                    ],
                    pontosPesca: ["Calçadão", "Próximo à estátua", "Canto esquerdo"]
                },
                
                "Praia de São Francisco": {
                    dadosVerificados: false,
                    descricao: "Praia vizinha a Icaraí, mais tranquila.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Baía" },
                        { icon: "fa-fish", title: "Espécies", value: "Corvina, Pescada" },
                        { icon: "fa-anchor", title: "Época", value: "Setembro a Março" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "23°C - 28°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "4-12 metros" }
                    ],
                    recomendacoes: [
                        "Pesca familiar",
                        "Iscas simples",
                        "Área menos movimentada",
                        "Equipamento leve"
                    ]
                },
                
                "Praia de Itacoatiara": {
                    dadosVerificados: true,
                    descricao: "Praia oceânica com ondas fortes, famosa pelo surf. Excelente pesca de robalo na arrebentação.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Mar aberto" },
                        { icon: "fa-fish", title: "Espécies Principais", value: "Robalo, Anchova, Cavala, Dourado" },
                        { icon: "fa-anchor", title: "Melhor Época", value: "Outubro a Abril" },
                        { icon: "fa-temperature-high", title: "Temp. Água", value: "22°C - 26°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "8-25 metros" },
                        { icon: "fa-water", title: "Ondas", value: "Muito fortes" },
                        { icon: "fa-exclamation-triangle", title: "Perigo", value: "Correnteza forte" }
                    ],
                    recomendacoes: [
                        "Pesca de arremesso na arrebentação",
                        "Iscas artificiais tipo poppers ou colheres",
                        "EXTREMO CUIDADO com correnteza",
                        "Só para pescadores experientes",
                        "Equipamento pesado"
                    ],
                    pontosPesca: ["Canto direito", "Pedras do costão"]
                }
            }
        },
        
        // 3. ANGRA DOS REIS (costa verde)
        "Angra dos Reis": {
            infoGeral: "Município com 365 ilhas na Costa Verde. Paraíso para pesca esportiva e oceânica.",
            tipoPredominante: "Ilhas e costões rochosos",
            especiesComuns: "Robalo, Garoupa, Atum, Cavala, Bonito",
            melhoresMeses: "Outubro a Março",
            
            praias: {
                "Praia do Dentista": {
                    dadosVerificados: true,
                    descricao: "Praia em ilha com águas cristalinas. Excelente pesca de robalo, anchova e cavala. Acesso apenas por barco.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Ilha" },
                        { icon: "fa-fish", title: "Espécies Principais", value: "Robalo, Anchova, Cavala, Garoupa" },
                        { icon: "fa-anchor", title: "Melhor Época", value: "Outubro a Março" },
                        { icon: "fa-temperature-high", title: "Temp. Água", value: "22°C - 28°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "8-20 metros" },
                        { icon: "fa-ship", title: "Acesso", value: "Barco necessário" },
                        { icon: "fa-eye", title: "Visibilidade", value: "Alta (águas claras)" }
                    ],
                    recomendacoes: [
                        "Acesso por barco ou escuna (aluguel)",
                        "Iscas vivas de sardinha ou lula",
                        "Pescar na maré enchente",
                        "Equipamento médio a pesado",
                        "Levar snorkel (água cristalina)"
                    ],
                    pontosPesca: ["Lado leste da ilha", "Entre as pedras", "Profundidades"]
                },
                
                "Praia do Japonês": {
                    dadosVerificados: true,
                    descricao: "Praia com fundo rochoso, ideal para pesca de garoupa e badejo. Uma das melhores do município.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Costão rochoso" },
                        { icon: "fa-fish", title: "Espécies Principais", value: "Garoupa, Badejo, Pargo, Cioba" },
                        { icon: "fa-anchor", title: "Melhor Época", value: "Ano todo" },
                        { icon: "fa-temperature-high", title: "Temp. Água", value: "20°C - 26°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "12-30 metros" },
                        { icon: "fa-mountain", title: "Fundo", value: "Rochoso com fendas" },
                        { icon: "fa-ship", title: "Acesso", value: "Barco" }
                    ],
                    recomendacoes: [
                        "Pesca de fundo com caranguejo ou siri vivo",
                        "Equipamento pesado (linha 0.50+)",
                        "Cuidado para não enroscar nas pedras",
                        "Melhor na maré baixa",
                        "Guia local recomendado"
                    ],
                    pontosPesca: ["Fendas rochosas", "Área profunda", "Costão"]
                },
                
                "Praia da Ribeira": {
                    dadosVerificados: false,
                    descricao: "Praia no continente, mais acessível.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Baía" },
                        { icon: "fa-fish", title: "Espécies", value: "Robalo, Corvina, Pescada" },
                        { icon: "fa-anchor", title: "Época", value: "Setembro a Abril" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "23°C - 29°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "5-18 metros" }
                    ],
                    recomendacoes: [
                        "Pesca de barco ou da praia",
                        "Iscas naturais",
                        "Boa infraestrutura",
                        "Equipamento médio"
                    ]
                }
            }
        },
        
        // 4. BÚZIOS (península famosa)
        "Búzios": {
            infoGeral: "Península com 23 praias, famosa pelo turismo e pesca esportiva.",
            tipoPredominante: "Enseadas e mar aberto",
            especiesComuns: "Robalo, Anchova, Dourado, Garoupa",
            melhoresMeses: "Novembro a Abril",
            
            praias: {
                "Praia de Geribá": {
                    dadosVerificados: true,
                    descricao: "Praia com ondas fortes, famosa pelo surf. Boa pesca esportiva de robalo e anchova.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Mar aberto" },
                        { icon: "fa-fish", title: "Espécies Principais", value: "Robalo, Anchova, Dourado, Cavala" },
                        { icon: "fa-anchor", title: "Melhor Época", value: "Novembro a Abril" },
                        { icon: "fa-temperature-high", title: "Temp. Água", value: "23°C - 27°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "10-25 metros" },
                        { icon: "fa-water", title: "Ondas", value: "Forte (cuidado)" },
                        { icon: "fa-users", title: "Turismo", value: "Alto no verão" }
                    ],
                    recomendacoes: [
                        "Pesca com barcos de aluguel (melhores pontos)",
                        "Iscas artificiais tipo poppers ou stickbaits",
                        "Atenção aos surfistas",
                        "Equipamento para peixes de corrida",
                        "Melhor nas primeiras horas"
                    ],
                    pontosPesca: ["Lado esquerdo", "Fora da arrebentação", "Pedras"]
                },
                
                "Praia da Ferradura": {
                    dadosVerificados: false,
                    descricao: "Praia em formato de ferradura, águas calmas.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Enseada" },
                        { icon: "fa-fish", title: "Espécies", value: "Robalo, Corvina, Pescada" },
                        { icon: "fa-anchor", title: "Época", value: "Outubro a Março" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "24°C - 28°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "6-20 metros" }
                    ],
                    recomendacoes: [
                        "Pesca familiar",
                        "Iscas artificiais leves",
                        "Área protegida do vento",
                        "Equipamento leve a médio"
                    ]
                },
                
                "Praia de João Fernandes": {
                    dadosVerificados: false,
                    descricao: "Uma das praias mais famosas de Búzios, águas calmas.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Enseada" },
                        { icon: "fa-fish", title: "Espécies", value: "Garoupa, Badejo, Pargo" },
                        { icon: "fa-anchor", title: "Época", value: "Ano todo" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "22°C - 26°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "10-30 metros" }
                    ],
                    recomendacoes: [
                        "Pesca de fundo nas pedras",
                        "Iscas naturais de caranguejo",
                        "Evitar horário de pico de turistas",
                        "Equipamento médio a pesado"
                    ]
                }
            }
        },
        
        // 5. OUTRAS CIDADES IMPORTANTES (versão resumida)
        "Macaé": {
            infoGeral: "Capital nacional do petróleo, com praias extensas.",
            tipoPredominante: "Praias extensas de areia",
            especiesComuns: "Robalo, Corvina, Cavala",
            melhoresMeses: "Setembro a Março",
            
            praias: {
                "Praia dos Cavaleiros": {
                    dadosVerificados: false,
                    descricao: "Praia principal de Macaé.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia" },
                        { icon: "fa-fish", title: "Espécies", value: "Robalo, Corvina" },
                        { icon: "fa-anchor", title: "Época", value: "Setembro a Março" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "23°C - 28°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "7-22 metros" }
                    ],
                    recomendacoes: [
                        "Pesca de arremesso",
                        "Iscas artificiais",
                        "Equipamento médio"
                    ]
                }
            }
        },
        
        "Cabo Frio": {
            infoGeral: "Cidade com praias famosas como Forte e Peró.",
            tipoPredominante: "Praias de areia branca",
            especiesComuns: "Robalo, Corvina, Cavala",
            melhoresMeses: "Outubro a Abril",
            
            praias: {
                "Praia do Forte": {
                    dadosVerificados: false,
                    descricao: "Praia com forte histórico, águas verdes.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia" },
                        { icon: "fa-fish", title: "Espécies", value: "Robalo, Corvina, Cavala" },
                        { icon: "fa-anchor", title: "Época", value: "Outubro a Abril" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "24°C - 29°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "8-25 metros" }
                    ],
                    recomendacoes: [
                        "Pesca de arremesso",
                        "Iscas artificiais",
                        "Evitar área dos banhistas",
                        "Equipamento médio"
                    ]
                }
            }
        }
        // Mais cidades podem ser adicionadas depois
    }
};

// Exportar os dados
if (typeof module !== 'undefined' && module.exports) {
    module.exports = dadosRJ;
}