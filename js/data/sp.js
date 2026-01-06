// dados-sp.js - Dados de São Paulo (Litoral)
const dadosSP = {
    nome: "São Paulo",
    sigla: "SP",
    regiao: "Sudeste",
    kmCosta: 622,
    infoGeral: "Maior litoral do Sudeste com 622km de costa. Praias variadas: urbanas, selvagens, de surf e pesca esportiva. Destaca-se Ubatuba como capital da pesca esportiva.",
    
    cidades: {
        // 1. SANTOS (maior porto da América Latina)
        "Santos": {
            infoGeral: "Cidade com o maior porto da América Latina e famoso jardim da orla. Mistura de pesca urbana e embarcada.",
            tipoPredominante: "Praias urbanas e canal do porto",
            especiesComuns: "Corvina, Pescada, Robalo, Bagre",
            melhoresMeses: "Setembro a Março",
            
            praias: {
                "Praia do Gonzaga": {
                    dadosVerificados: true,
                    descricao: "Praia urbana com famoso jardim da orla (maior do mundo). Pesca tradicional de corvina e pescada, especialmente à noite.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia" },
                        { icon: "fa-fish", title: "Espécies Principais", value: "Corvina, Pescada, Robalo, Bagre" },
                        { icon: "fa-anchor", title: "Melhor Época", value: "Setembro a Março" },
                        { icon: "fa-temperature-high", title: "Temp. Água", value: "20°C - 24°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "5-15 metros" },
                        { icon: "fa-tree", title: "Orla", value: "Jardim extenso (5,3km)" },
                        { icon: "fa-calendar", title: "Horário", value: "Noite e madrugada" }
                    ],
                    recomendacoes: [
                        "Pesca noturna é mais produtiva",
                        "Iscas naturais de camarão ou minhoca do mar",
                        "Evitar áreas próximas ao emissário",
                        "Equipamento médio (linha 0.30-0.35)",
                        "Pescar nos canais de drenagem"
                    ],
                    pontosPesca: ["Canal 3", "Próximo ao Aquário", "Altura do Morro"]
                },
                
                "Praia do José Menino": {
                    dadosVerificados: false,
                    descricao: "Praia no início da orla, menos movimentada que Gonzaga. Boa pesca de corvina.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia" },
                        { icon: "fa-fish", title: "Espécies", value: "Corvina, Pescada, Robalo" },
                        { icon: "fa-anchor", title: "Época", value: "Outubro a Março" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "21°C - 25°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "6-16 metros" },
                        { icon: "fa-users", title: "Movimento", value: "Moderado" }
                    ],
                    recomendacoes: [
                        "Pesca mais tranquila que Gonzaga",
                        "Iscas naturais de camarão",
                        "Boa para iniciantes",
                        "Equipamento médio",
                        "Melhor no nascer do sol"
                    ]
                },
                
                "Praia do Embaré": {
                    dadosVerificados: false,
                    descricao: "Praia residencial, boa pesca noturna.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia" },
                        { icon: "fa-fish", title: "Espécies", value: "Corvina, Pescada" },
                        { icon: "fa-anchor", title: "Época", value: "Setembro a Abril" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "20°C - 25°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "5-14 metros" }
                    ],
                    recomendacoes: [
                        "Pesca noturna",
                        "Iscas vivas de camarão",
                        "Área residencial tranquila",
                        "Equipamento leve a médio"
                    ]
                }
            }
        },
        
        // 2. GUARUJÁ (Peró do litoral paulista)
        "Guarujá": {
            infoGeral: "Conhecida como 'Pérola do Atlântico'. Praias famosas como Enseada e Pitangueiras.",
            tipoPredominante: "Praias urbanas e costões",
            especiesComuns: "Robalo, Corvina, Garoupa, Pescada",
            melhoresMeses: "Outubro a Abril",
            
            praias: {
                "Praia da Enseada": {
                    dadosVerificados: true,
                    descricao: "Uma das praias mais famosas do Guarujá, extensa (5,5km) com boa infraestrutura. Excelente pesca de robalo e corvina.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia" },
                        { icon: "fa-fish", title: "Espécies Principais", value: "Robalo, Corvina, Pescada, Anchova" },
                        { icon: "fa-anchor", title: "Melhor Época", value: "Outubro a Abril" },
                        { icon: "fa-temperature-high", title: "Temp. Água", value: "21°C - 25°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "7-22 metros" },
                        { icon: "fa-umbrella-beach", title: "Infra", value: "Quiosques, restaurantes" },
                        { icon: "fa-ruler", title: "Extensão", value: "5,5km" }
                    ],
                    recomendacoes: [
                        "Pescar cedo da manhã (antes dos banhistas)",
                        "Iscas artificiais tipo minnows ou shads",
                        "Evitar fins de semana no verão",
                        "Equipamento médio",
                        "Melhores pontos: extremidades da praia"
                    ],
                    pontosPesca: ["Ponta da Enseada", "Próximo ao costão", "Extremidade sul"]
                },
                
                "Praia do Tombo": {
                    dadosVerificados: true,
                    descricao: "Praia com ondas fortes, famosa pelo surf e pela bandeira azul. Boa pesca esportiva.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Mar aberto" },
                        { icon: "fa-fish", title: "Espécies Principais", value: "Robalo, Anchova, Cavala" },
                        { icon: "fa-anchor", title: "Melhor Época", value: "Novembro a Março" },
                        { icon: "fa-temperature-high", title: "Temp. Água", value: "22°C - 26°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "8-25 metros" },
                        { icon: "fa-water", title: "Ondas", value: "Fortes (cuidado)" },
                        { icon: "fa-flag", title: "Certificação", value: "Bandeira Azul" }
                    ],
                    recomendacoes: [
                        "Pesca de arremesso na arrebentação",
                        "Iscas artificiais tipo surface poppers",
                        "Atenção aos surfistas",
                        "Equipamento médio a pesado",
                        "Melhor no amanhecer"
                    ],
                    pontosPesca: ["Fora da arrebentação", "Pedras do costão"]
                },
                
                "Praia de Pitangueiras": {
                    dadosVerificados: false,
                    descricao: "Praia urbana mais central, boa pesca noturna.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia" },
                        { icon: "fa-fish", title: "Espécies", value: "Corvina, Pescada, Robalo" },
                        { icon: "fa-anchor", title: "Época", value: "Setembro a Março" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "21°C - 26°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "6-18 metros" }
                    ],
                    recomendacoes: [
                        "Pesca noturna no calçadão",
                        "Iscas vivas de camarão",
                        "Evitar horário de pico",
                        "Equipamento médio"
                    ]
                }
            }
        },
        
        // 3. UBATUBA (Capital da pesca esportiva)
        "Ubatuba": {
            infoGeral: "Conhecida como 'Capital da Pesca Esportiva'. Mais de 100 praias e ilhas. Paraíso para pescadores.",
            tipoPredominante: "Costões rochosos, praias e ilhas",
            especiesComuns: "Garoupa, Cioba, Sororoca, Bonito, Atum",
            melhoresMeses: "Ano todo",
            
            praias: {
                "Praia Grande (Ubatuba)": {
                    dadosVerificados: true,
                    descricao: "Uma das melhores praias para pesca esportiva do Brasil. Costão rochoso excelente para garoupas e ciobas.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Costão rochoso" },
                        { icon: "fa-fish", title: "Espécies Principais", value: "Garoupa, Cioba, Sororoca, Badejo" },
                        { icon: "fa-anchor", title: "Melhor Época", value: "Ano todo" },
                        { icon: "fa-temperature-high", title: "Temp. Água", value: "20°C - 26°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "10-50 metros" },
                        { icon: "fa-anchor", title: "Famosa por", value: "Pesca esportiva" },
                        { icon: "fa-trophy", title: "Competições", value: "Campeonatos frequentes" }
                    ],
                    recomendacoes: [
                        "Iscas artificiais tipo jigs funcionam bem",
                        "Pesca de fundo para garoupas e ciobas",
                        "Evitar ventos acima de 15 nós",
                        "Equipamento médio a pesado",
                        "Guia local recomendado para melhores pontos"
                    ],
                    pontosPesca: ["Costão central", "Pedras da Ponta", "Fendas rochosas"]
                },
                
                "Praia do Lázaro": {
                    dadosVerificados: true,
                    descricao: "Praia com costão, excelente para pesca noturna de garoupa e badejo.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Costão rochoso" },
                        { icon: "fa-fish", title: "Espécies Principais", value: "Garoupa, Badejo, Pargo, Cioba" },
                        { icon: "fa-anchor", title: "Melhor Época", value: "Ano todo" },
                        { icon: "fa-temperature-high", title: "Temp. Água", value: "19°C - 25°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "15-40 metros" },
                        { icon: "fa-moon", title: "Melhor horário", value: "Noite" },
                        { icon: "fa-crab", title: "Isca ideal", value: "Caranguejo vivo" }
                    ],
                    recomendacoes: [
                        "Pesca noturna muito produtiva",
                        "Iscas naturais de caranguejo ou siri",
                        "Cuidado com as pedras escorregadias",
                        "Lanterna obrigatória",
                        "Equipamento pesado para peixes de fundo"
                    ],
                    pontosPesca: ["Costão direito", "Pedras grandes", "Área profunda"]
                },
                
                "Praia do Tenório": {
                    dadosVerificados: false,
                    descricao: "Praia de surfe, boa pesca de robalo na arrebentação.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia" },
                        { icon: "fa-fish", title: "Espécies", value: "Robalo, Corvina, Cavala" },
                        { icon: "fa-anchor", title: "Época", value: "Outubro a Abril" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "21°C - 27°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "8-25 metros" }
                    ],
                    recomendacoes: [
                        "Pesca de arremesso",
                        "Iscas artificiais tipo colheres",
                        "Atenção aos surfistas",
                        "Equipamento médio"
                    ]
                },
                
                "Praia do Itaguá": {
                    dadosVerificados: false,
                    descricao: "Praia central de Ubatuba, com feira de artesanato.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Baía" },
                        { icon: "fa-fish", title: "Espécies", value: "Corvina, Pescada, Robalo" },
                        { icon: "fa-anchor", title: "Época", value: "Setembro a Março" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "22°C - 28°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "5-18 metros" }
                    ],
                    recomendacoes: [
                        "Pesca familiar",
                        "Iscas naturais",
                        "Boa infraestrutura",
                        "Equipamento leve a médio"
                    ]
                }
            }
        },
        
        // 4. ILHABELA (Arquipélago)
        "Ilhabela": {
            infoGeral: "Arquipélago com 360 praias, muitas desertas. Excelente pesca oceânica e de costão.",
            tipoPredominante: "Ilhas, costões e mar aberto",
            especiesComuns: "Atum, Cavala, Bonito, Garoupa, Wahoo",
            melhoresMeses: "Dezembro a Abril",
            
            praias: {
                "Praia do Curral": {
                    dadosVerificados: true,
                    descricao: "Praia de mar aberto com boas condições para pesca oceânica. Local de pesca de atuns e cavalas.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Mar aberto" },
                        { icon: "fa-fish", title: "Espécies Principais", value: "Atum, Cavala, Bonito, Dourado" },
                        { icon: "fa-anchor", title: "Melhor Época", value: "Dezembro a Abril" },
                        { icon: "fa-temperature-high", title: "Temp. Água", value: "22°C - 28°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "20-100 metros" },
                        { icon: "fa-ship", title: "Recomendado", value: "Pesca embarcada" },
                        { icon: "fa-water", title: "Correnteza", value: "Forte" }
                    ],
                    recomendacoes: [
                        "Pesca embarcada recomendada",
                        "Iscas vivas de sardinha e lula",
                        "Plugs de meia água para atuns",
                        "Equipamento para peixes de corrida",
                        "Atenção às correntes fortes",
                        "Guia local obrigatório"
                    ],
                    pontosPesca: ["Canal", "Fora da ilha", "Áreas profundas"]
                },
                
                "Praia de Castelhanos": {
                    dadosVerificados: false,
                    descricao: "Praia selvagem, acesso apenas por trilha ou barco.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia selvagem" },
                        { icon: "fa-fish", title: "Espécies", value: "Robalo, Cavala, Dourado" },
                        { icon: "fa-anchor", title: "Época", value: "Novembro a Abril" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "23°C - 29°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "10-35 metros" }
                    ],
                    recomendacoes: [
                        "Acesso por barco ou trilha difícil",
                        "Iscas artificiais tipo poppers",
                        "Levar água e comida",
                        "Equipamento para peixes grandes"
                    ]
                }
            }
        },
        
        // 5. SÃO SEBASTIÃO (Costa Norte)
        "São Sebastião": {
            infoGeral: "Município extenso com praias famosas como Maresias e Boissucanga.",
            tipoPredominante: "Praias de surf e enseadas",
            especiesComuns: "Robalo, Corvina, Cavala, Garoupa",
            melhoresMeses: "Outubro a Abril",
            
            praias: {
                "Praia de Maresias": {
                    dadosVerificados: true,
                    descricao: "Famosa praia de surf, uma das melhores do Brasil para o esporte. Boa pesca esportiva de robalo e corvina.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia" },
                        { icon: "fa-fish", title: "Espécies Principais", value: "Robalo, Corvina, Cavala, Anchova" },
                        { icon: "fa-anchor", title: "Melhor Época", value: "Outubro a Abril" },
                        { icon: "fa-temperature-high", title: "Temp. Água", value: "22°C - 27°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "8-25 metros" },
                        { icon: "fa-water", title: "Ondas", value: "Excelentes para surf" },
                        { icon: "fa-users", title: "Movimento", value: "Alto no verão" }
                    ],
                    recomendacoes: [
                        "Pesca de arremesso longe dos surfistas",
                        "Iscas artificiais tipo shads ou colheres",
                        "Atenção aos surfistas (respeitar áreas)",
                        "Equipamento médio",
                        "Melhor cedo da manhã"
                    ],
                    pontosPesca: ["Extremidades da praia", "Fora da arrebentação"]
                },
                
                "Praia de Boissucanga": {
                    dadosVerificados: false,
                    descricao: "Enseada tranquila, boa para pesca familiar.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Enseada" },
                        { icon: "fa-fish", title: "Espécies", value: "Robalo, Corvina, Pescada" },
                        { icon: "fa-anchor", title: "Época", value: "Setembro a Março" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "21°C - 26°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "6-20 metros" }
                    ],
                    recomendacoes: [
                        "Pesca familiar (área protegida)",
                        "Iscas artificiais leves",
                        "Boa para iniciantes",
                        "Equipamento leve a médio"
                    ]
                },
                
                "Praia de Barequeçaba": {
                    dadosVerificados: false,
                    descricao: "Praia extensa e deserta, acesso por estrada de terra.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia deserta" },
                        { icon: "fa-fish", title: "Espécies", value: "Robalo, Corvina, Cavala" },
                        { icon: "fa-anchor", title: "Época", value: "Outubro a Março" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "20°C - 25°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "10-30 metros" }
                    ],
                    recomendacoes: [
                        "Veículo alto recomendado",
                        "Iscas artificiais tipo poppers",
                        "Levar tudo que precisar",
                        "Equipamento para vento"
                    ]
                }
            }
        },
        
        // 6. CARAGUATATUBA (Costa Norte)
        "Caraguatatuba": {
            infoGeral: "Cidade com praias extensas como Martim de Sá e Cocanha.",
            tipoPredominante: "Praias extensas de areia",
            especiesComuns: "Robalo, Corvina, Pescada",
            melhoresMeses: "Setembro a Março",
            
            praias: {
                "Praia Martim de Sá": {
                    dadosVerificados: false,
                    descricao: "Praia central de Caraguá, extensa e com infraestrutura.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia" },
                        { icon: "fa-fish", title: "Espécies", value: "Robalo, Corvina, Pescada" },
                        { icon: "fa-anchor", title: "Época", value: "Setembro a Março" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "21°C - 26°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "7-22 metros" }
                    ],
                    recomendacoes: [
                        "Pesca de arremesso",
                        "Iscas naturais",
                        "Evitar área central",
                        "Equipamento médio"
                    ]
                },
                
                "Praia da Cocanha": {
                    dadosVerificados: false,
                    descricao: "Praia com costão, boa para pesca de fundo.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Costão rochoso" },
                        { icon: "fa-fish", title: "Espécies", value: "Garoupa, Badejo, Pargo" },
                        { icon: "fa-anchor", title: "Época", value: "Ano todo" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "20°C - 25°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "15-40 metros" }
                    ],
                    recomendacoes: [
                        "Pesca de fundo",
                        "Iscas naturais de caranguejo",
                        "Cuidado com as pedras",
                        "Equipamento pesado"
                    ]
                }
            }
        },
        
        // 7. PRAIA GRANDE (Cidade)
        "Praia Grande": {
            infoGeral: "Cidade com extensa orla (22,5km) e alta densidade populacional.",
            tipoPredominante: "Praias urbanas extensas",
            especiesComuns: "Corvina, Pescada, Robalo, Bagre",
            melhoresMeses: "Setembro a Março",
            
            praias: {
                "Praia do Canto do Forte": {
                    dadosVerificados: false,
                    descricao: "Praia central de Praia Grande, próximo ao forte.",
                    caracteristicas: [
                        { icon: "fa-water", title: "Tipo", value: "Salgada - Praia de areia" },
                        { icon: "fa-fish", title: "Espécies", value: "Corvina, Pescada, Robalo" },
                        { icon: "fa-anchor", title: "Época", value: "Setembro a Março" },
                        { icon: "fa-temperature-high", title: "Temp.", value: "20°C - 24°C" },
                        { icon: "fa-ruler", title: "Profundidade", value: "6-16 metros" }
                    ],
                    recomendacoes: [
                        "Pesca noturna",
                        "Iscas naturais",
                        "Evitar área dos banhistas",
                        "Equipamento médio"
                    ]
                }
            }
        }
        // Mais cidades podem ser adicionadas: Peruíbe, Itanhaém, Mongaguá, etc.
    }
};

// Exportar os dados
if (typeof module !== 'undefined' && module.exports) {
    module.exports = dadosSP;
}