const partition = require('./index');

test('Particao de numeros pequenos', () => {
  expect(partition(1)).toBe('Alcance: 0 Media: 1.00 Mediana: 1.00');
  expect(partition(2)).toBe('Alcance: 1 Media: 1.50 Mediana: 1.50');
  expect(partition(3)).toBe('Alcance: 2 Media: 2.00 Mediana: 2.00');
  expect(partition(4)).toBe('Alcance: 3 Media: 2.50 Mediana: 2.50');
  expect(partition(5)).toBe('Alcance: 5 Media: 3.50 Mediana: 3.50');

  // Testes adicionais pessoais
  expect(partition(6)).toBe('Alcance: 8 Media: 4.75 Mediana: 4.50');
  expect(partition(7)).toBe('Alcance: 11 Media: 6.09 Mediana: 6.00');
  expect(partition(8)).toBe('Alcance: 17 Media: 8.29 Mediana: 7.50');
  expect(partition(9)).toBe('Alcance: 26 Media: 11.17 Mediana: 9.50');
});
