# Impacto Serviços — Site institucional

Primeira versão mobile-first do site da Impacto Serviços.

## Arquivos principais

- `index.html`: página inicial
- `styles.css`: identidade visual e responsividade
- `script.js`: menu, animações e formulário por e-mail
- `privacidade.html`: modelo inicial da política de privacidade
- `termos.html`: modelo inicial dos termos de uso
- `assets/images`: imagens otimizadas em WebP
- `vercel.json`: configuração para publicação na Vercel

## Teste local

Você pode abrir `index.html` diretamente no navegador. Para simular a publicação com URLs limpas, também pode executar um servidor local simples:

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Publicação rápida na Vercel

O projeto é um site estático. Na tela de configuração da Vercel:

- Framework Preset: `Other`
- Root Directory: `./`
- Build Command: deixar em branco
- Output Directory: deixar em branco

## Formulários

A solicitação de proposta abre o aplicativo de e-mail do visitante e envia para:

`mcoelho.adm@isimpacto.com.br`

Para receber formulários diretamente no site, sem abrir o e-mail do visitante, será necessário configurar posteriormente um serviço de formulário ou uma função de servidor.

## Antes da publicação definitiva

- revisar endereço e CEP;
- revisar os textos legais com apoio jurídico;
- conectar o domínio `isimpacto.com.br`;
- preservar os registros MX/TXT do Google Workspace;
- confirmar se deseja adicionar Google Analytics ou outra ferramenta de métricas.
