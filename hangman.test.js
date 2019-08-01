const hangman = require('./hangman');
const { print } = require('./lib');

describe('playHangman', () => {
  console.log = jest.fn();
  const hangmanSpy = jest.spyOn(hangman, 'playHangman');
  // beforEach()
  // beforeAll()
  // afterAll
  afterEach(() => {
    console.log.mockClear();
    hangmanSpy.mockClear();
  });
  it('should print sucess message and end when a completed word has been passed.', () => {
    const targetWord = 'abc';
    const guessedWord = 'abc'.split('');
    hangman.playHangman(targetWord, guessedWord);
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith(`You win! The word was ${targetWord}`);
    expect(hangmanSpy).toBeCalledTimes(1);
  });
  it('should print a failure message and end when you have ran out of strikes', () => {
    const targetWord = 'abc';
    const guessedWord = 'a_c'.split('');
    const maxStrikes = 5;
    hangman.playHangman(targetWord, guessedWord, maxStrikes, maxStrikes);
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith(`You lose! The word was ${targetWord}`);
  });
  it.todo('should continue play if there was no win or loss', () => {});
});
