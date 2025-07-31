const inquirer = require('inquirer');

const config = {
  types: [
    { value: 'feat', name: 'feat:      Adicionar nova funcionalidade' },
    { value: 'fix', name: 'fix:       Correção de bug' },
    { value: 'docs', name: 'docs:      Alterações na documentação' },
    { value: 'style', name: 'style:     Estilização (formatação, espaços, ponto e vírgula etc)' },
    { value: 'refactor', name: 'refactor:  Refatoração de código (sem mudança de comportamento)' },
    { value: 'perf', name: 'perf:      Melhoria de performance' },
    { value: 'test', name: 'test:      Adição ou correção de testes' },
    { value: 'chore', name: 'chore:     Tarefas de manutenção ou build que não afetam src/test' },
    { value: 'build', name: 'build:     Mudanças no sistema de build ou dependências' },
    { value: 'ci', name: 'ci:        Alterações na configuração de CI (scripts, pipelines)' },
    { value: 'revert', name: 'revert:    Reverte um commit anterior (ex: revert: feat(foo): …)' },
  ],
  messages: {
    type: "Selecione o tipo de alteração:",
    customScope: "Defina o escopo personalizado:",
    subject: "Escreva uma descrição breve e imperativa da alteração:\n",
    body: 'Descrição mais longa da alteração (opcional). Use "|" para quebra de linha:\n',
    breaking: 'Alguma alteração quebrando o código? (opcional):\n',
    coauthors: 'Co-Author do commit (opcional):\n',
    confirmCommit: 'Você deseja prosseguir com o commit acima?'
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  subjectLimit: 150,
};

function prompter(cz, commit) {
  return cz.prompt([
    {
      type: 'list',
      name: 'type',
      message: config.messages.type,
      choices: config.types
    },
    {
      type: 'input',
      name: 'subject',
      message: config.messages.subject,
      validate: (input) => {
        if (!input || input.trim() === '') {
          return 'A descrição não pode estar vazia';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'body',
      message: config.messages.body
    },
    {
      type: 'input',
      name: 'breaking',
      message: config.messages.breaking
    },
    {
      type: 'input',
      name: 'coauthors',
      message: 'Co-autores (nome <email>, nome <email>...) (opcional):'
    }
  ]).then(answers => {
    const scope = answers.scope ? `(${answers.scope})` : '';
    const breaking = answers.breaking ? `\n\nBREAKING CHANGE: ${answers.breaking}` : '';

    let coauthorLines = '';
    if (answers.coauthors) {
      const coauthors = answers.coauthors
        .split(',')
        .map((author) => author.trim())
        .filter(Boolean)
        .map((author) => `Co-authored-by: ${author}`)
        .join('\n');
      coauthorLines = `\n\n${coauthors}`;
    }

    commit(`${answers.type}${scope}: ${answers.subject}${breaking}${coauthorLines}`);
  });
}

module.exports = {
  prompter
}; 