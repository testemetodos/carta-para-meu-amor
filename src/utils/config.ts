/**
 * Configuração personalizada para validação de respostas e nomes.
 * Edite facilmente esta lista para aceitar o nome específico da sua namorada,
 * apelidos carinhosos ou outras formas que ela possa responder!
 */
export const ROMANTIC_CONFIG = {
  // Lista de respostas aceitas para a pergunta final da Fase 4:
  // "Quem é a pessoa que eu quero escolher todos os dias da minha vida?"
  // As respostas são validadas desconsiderando maiúsculas/minúsculas, acentos e espaços extras.
  acceptedGirlfriendAnswers: [
    'eu',
    'eu mesma',
    'eu uai',
    'eu obvio',
    'voce e eu',
    'sua namorada',
    'a sua namorada',
    'minha princesa',
    'sua princesa',
    'a sua princesa',
    'sua garotinha',
    'sua enrolada',
    'sua mulher',
    'a sua mulher',
    'sua noiva',
    'sua esposa',
    'dona do seu coracao',
    'a dona do seu coracao',
    'o seu amor',
    'seu amor',
    'amor da sua vida',
    // Adicione o nome ou apelido dela aqui se desejar (ex: 'maria', 'ana', 'isabela', 'amor', etc.)
    'namorada',
    'princesa',
    'mor',
    'mo',
  ],

  // Resposta da dívida lendária da Fase 2 (Pergunta 3)
  acaiAnswers: ['acai', 'açaí', 'acai com banana', 'acai com leite em po', 'o acai', 'o açaí'],
};

/**
 * Normaliza uma string removendo acentos, caracteres especiais e espaços extras.
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[^a-z0-9\s]/g, '') // remove pontuações
    .trim()
    .replace(/\s+/g, ' '); // remove múltiplos espaços
}

/**
 * Verifica se a resposta do usuário corresponde a alguma das respostas esperadas
 */
export function matchesAnswer(userInput: string, acceptedList: string[]): boolean {
  const normalizedInput = normalizeText(userInput);
  if (!normalizedInput) return false;

  return acceptedList.some((accepted) => {
    const normalizedAccepted = normalizeText(accepted);
    return (
      normalizedInput === normalizedAccepted ||
      normalizedInput.includes(normalizedAccepted) ||
      normalizedAccepted.includes(normalizedInput)
    );
  });
}
