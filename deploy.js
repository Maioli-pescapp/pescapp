// deploy.js - Sistema de deploy automático do PescApp
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('='.repeat(50));
console.log('🚀 DEPLOY AUTOMÁTICO - PESCAPP');
console.log('='.repeat(50));

// 1. VERIFICAR GIT
try {
    execSync('git --version', { stdio: 'pipe' });
    console.log('✅ Git disponível');
} catch (error) {
    console.error('❌ Git não encontrado! Instale o Git primeiro.');
    console.error('📥 Baixe em: https://git-scm.com/downloads');
    process.exit(1);
}

// 2. OBTER INFORMAÇÕES DO COMMIT
const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
const commitDate = execSync('git log -1 --format=%cd --date=format:"%Y%m%d-%H%M%S"')
    .toString().trim();

console.log(`📌 Commit atual: ${commitHash}`);
console.log(`📅 Data do commit: ${commitDate}`);

// 3. CRIAR VERSÃO ÚNICA
const versao = `${commitHash}-${commitDate}`;
console.log(`🔢 Versão gerada: ${versao}`);

// 4. ATUALIZAR APP.JS
const appJsPath = path.join(__dirname, 'js', 'app.js');
console.log(`\n📝 Atualizando: ${appJsPath}`);

if (!fs.existsSync(appJsPath)) {
    console.error(`❌ Arquivo não encontrado: ${appJsPath}`);
    process.exit(1);
}

let appJsContent = fs.readFileSync(appJsPath, 'utf8');

// Procurar e substituir a linha da versão
const versaoRegex = /const\s+ULTIMO_COMMIT\s*=\s*['"][^'"]*['"]/;
if (versaoRegex.test(appJsContent)) {
    appJsContent = appJsContent.replace(
        versaoRegex,
        `const ULTIMO_COMMIT = '${versao}'`
    );
    console.log('✅ app.js atualizado com nova versão');
} else {
    console.warn('⚠️  Linha da versão não encontrada em app.js');
    console.warn('   Adicionando manualmente no início do arquivo...');
    
    // Adicionar no início do arquivo
    appJsContent = `// ============ VERSÃO DO DEPLOY ============\n` +
                   `const ULTIMO_COMMIT = '${versao}';\n` +
                   `// =========================================\n\n` +
                   appJsContent;
}

fs.writeFileSync(appJsPath, appJsContent, 'utf8');

// 5. ATUALIZAR MANIFEST.JSON
const manifestPath = path.join(__dirname, 'manifest.json');
console.log(`\n📝 Atualizando: ${manifestPath}`);

if (!fs.existsSync(manifestPath)) {
    console.error(`❌ Arquivo não encontrado: ${manifestPath}`);
    process.exit(1);
}

try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.version = versao;
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
    console.log('✅ manifest.json atualizado');
} catch (error) {
    console.error('❌ Erro ao atualizar manifest.json:', error.message);
}

// 6. MENSAGEM DO COMMIT
const mensagemArg = process.argv.slice(2).join(' ') || 'Deploy automático';
const mensagemCompleta = `${mensagemArg} - ${versao}`;

console.log(`\n💾 Mensagem do commit: "${mensagemCompleta}"`);

// 7. EXECUTAR GIT
console.log('\n🔄 Executando Git...');
try {
    execSync('git add .', { stdio: 'inherit' });
    execSync(`git commit -m "${mensagemCompleta}"`, { stdio: 'inherit' });
    execSync('git push origin main', { stdio: 'inherit' });
    console.log('\n✅ Git concluído com sucesso!');
} catch (error) {
    console.error('\n❌ Erro no Git:', error.message);
    console.log('💡 Dica: Talvez não há alterações para commit.');
}

// 8. INFORMAÇÕES FINAIS
console.log('\n' + '='.repeat(50));
console.log('🎉 DEPLOY CONCLUÍDO!');
console.log('='.repeat(50));
console.log(`🔗 URL: https://maioli-pescapp.github.io/pescapp/`);
console.log(`🆔 Versão: ${versao}`);
console.log(`⏰ Aguarde 1-2 minutos para o GitHub Pages atualizar`);
console.log('='.repeat(50));

// 9. DICA PARA MOBILE
console.log('\n📱 Para forçar atualização no celular:');
console.log('   1. Feche completamente o PescApp');
console.log('   2. Abra novamente após 2 minutos');
console.log('   3. A atualização será automática!');