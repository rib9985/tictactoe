const WinChecker = require('./testing');

test('Testing a Win condition', () => {
  expect(
    WinChecker.win().toBe('x'),
  );
});
