/**
 * Desafio:
 *
 * Na teoria dos números, partição de um inteiro positivo n é uma forma de decomposição de n como soma de inteiros positivos.
 * Duas somas são consideradas iguais se, e somente se, possuírem o mesmo número de parcelas e as mesmas parcelas, mesmo que em ordem diferente.
 * Por exemplo, 4 pode ser particionado em: `4, 3 + 1, 2 + 2, 2 + 1 + 1, 1 + 1 + 1 + 1`.
 *
 * Podemos considerar:
 * `particoes(4) -> [[4],[3,1],[2,2],[2,1,1],[1,1,1,1]]` e
 * `particoes(5) -> [[5],[4,1],[3,2],[3,1,1],[2,2,1],[2,1,1,1],[1,1,1,1,1]]`.
 *
 * O número de partes em uma partição cresce rapidamente. Para `n = 50` teremos 204.226 partes, para `n = 80` teremos 15.796.476 partes.
 * Por isso, é importante levar em consideração a performance da sua implementação.
 *
 * A sua tarefa será a seguinte:
 *
 * 1 - você receberá por parâmetro um número `n` (n sendo um inteiro, 1 <= n <= 50), deverá calcular as partições de `n`, devendo obter algo como:
 * `particoes(n) -> [[n],[n-1,1],[n-2,2],...,[1,1,...,1]]`. A ordem dos valores não importa, pois essa parte não é testada.
 *
 * 2 - Para cada sub-array de particoes(n), calcular o seu produto, removendo os valores duplicados.
 * Se `n = 5`, depois de remover os duplicados, teremos:
 * `prod(5) -> [1,2,3,4,5,6]` (esse resultado está ordenado, mas a ordenação não faz parte do teste)
 * Para `n = 8`, teremos:
 * `prod(8) -> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 16, 18]`
 *
 * 3 - Calcular o intervalo, a média e a mediana do produto `prod(n)` no formato abaixo:
 * `"Alcance: X Media: Y Mediana: Z"`
 *
 * Para `n = 5`, o resultado final será:
 * `"Alcance: 5 Media: 3.50 Mediana: 3.50"`
 *
 * Alcance (X) é um inteiro, Media (Y) e Mediana (Z) são números decimais arredondados na segunda casa decimal.
 *
 * Observações:
 * `Alcance` : diferença entre o maior e o menor valor.
 * `Media` : Para calcular a média, some todos os números e divida pela quantidade de números.
 * `Mediana` : A mediana é o numero que separa a metade superior da metade inferior da sequencia de valores. (https://pt.wikipedia.org/wiki/Mediana_(estat%C3%ADstica))
 *
 * Voce pode testar o seu codigo rodando o comando `npm run test` no terminal
 * e tambem pode alterar o arquivo `index.test.js` se desejar.
 * Apos enviado, seu codigo sera validado com outros cenarios de teste tambem.
 *
 * @example `partition(5)` retorna `"Alcance: 5 Media: 3.50 Mediana: 3.50"`
 * @param n valor inteiro (1 <= n <= 50) para usar como base do calculo
 * @returns string contendo Alcance, Media e Mediana calculado da sequencia de n
 */
function partition(n) {
  // implemente seu codigo aqui
  //
  let partitions = [];

  for (let i = 1; i <= n; i++) {
    const extra = [];
    partitions = partitions.map((p) => {
      if (p.at(-1) == 1) {
        const ones = p.filter((number) => number == 1);
        const notOnes = p.filter((number) => number != 1);

        // Adiciono um array extra com um outro número sendo
        // a soma de todos os números 1 contidos
        extra.push([...notOnes, ones.length + 1]);
      }

      // Adiciono mais um para cada partição
      p.push(1);
      return p;
    });

    //Adiciono o novo número que sozinho é o valor referência
    partitions.push([i]);

    // Adiciono as formas extras de representar as partições
    partitions = partitions.concat(extra);
  }

  // Lógica para calcular o produto de cada partição
  // (Utilizo o mesmo array para economizar memória consumida)
  partitions = partitions.map((p) => {
    return p.reduce((pV, cV) => pV * cV, 1);
  });

  // Aqui eu concateno todas as opções que são entre 1 e o número (sempre ocorrem)
  partitions = partitions.concat(Array.from({ length: n }, (_, i) => i + 1));

  // Transformo em um array de valores únicos e ordenados
  const unique = [...new Set(partitions)].sort((a, b) => a - b);

  // Por fim, calculo os valores para a resposta resumida de partições
  const alcance = unique.at(-1) - unique.at(0);
  const media = unique.reduce((pV, cV) => pV + cV, 0) / unique.length;
  const half = (unique.length - 1) / 2;
  const mediana =
    ((unique.at(Math.floor(half)) ?? 0) + (unique.at(Math.ceil(half)) ?? 0)) /
    2;

  return `Alcance: ${alcance} Media: ${media.toFixed(
    2
  )} Mediana: ${mediana.toFixed(2)}`;
}

module.exports = partition;
