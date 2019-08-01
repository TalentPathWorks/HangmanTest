const readLineSync = require('readline-sync');
const {
  stringify,
  createBlankWordArray,
  randomlySelectWord,
  isWordSolved,
  print,
  askForALetter,
  validateInput
} = require('./lib');

describe('stringify', () => {
  it('should convert an arbitrary string array to a string', () => {
    const stringArray = ['h', 'e', 'l', 'l', 'o'];
    const result = stringify(stringArray);
    expect(result).toBe('hello');
  });

  it('should maintain white-space', () => {
    const stringArray = 'Hello world'.split('');
    const result = stringify(stringArray);
    expect(result).toBe('Hello world');
  });

  it('should return empty string when given', () => {
    expect(stringify([])).toBe('');
  });
  it('should properly handle array entries with multiple characters', () => {
    const stringArray = ['h', 'el', 'l', 'o'];
    const result = stringify(stringArray);
    expect(result).toBe('hello');
  });
});

describe('createBlankWordArray', () => {
  it('should return an array of arbitrary length full of underscores', () => {
    const result = createBlankWordArray(10);
    // Test the length
    expect(result.length).toBe(10);
    expect(result.every(letter => letter === '_')).toBeTruthy();
  });
  it('should return an empty array when passed 0', () => {
    expect(createBlankWordArray(0)).toHaveLength(0);
  });
  it('should gracefully handle undefined input', () => {
    const result = createBlankWordArray();
    expect(result).toHaveLength(0);
  });
  it('should gracefully handle other option', () => {
    expect(createBlankWordArray('hello')).toHaveLength(0);
  });
});
describe('isWordSolved', () => {
  it('should return false if there are at least one underscore', () => {
    const input = 'a_b'.split('');
    const result = isWordSolved(input);
    expect(result).toBeFalsy();
  });
  it('should return true if there are no underscores', () => {
    const input = 'abc'.split('');
    const result = isWordSolved(input);
    expect(result).toBeTruthy();
  });
  it('should throw a TypeError if passed undefined input', () => {
    expect.assertions(1);
    expect(() => isWordSolved()).toThrow(TypeError);
  });
});

describe('print', () => {
  it('should log output to the console', () => {
    console.log = jest.fn();
    print('some input');
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith('some input');
    console.log.mockClear();
  });
  it('should output an empty string to the console', () => {
    print('');
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith('');
  });
});

describe('randomlySelectedWord', () => {
  // Math.random = jest.fn(() => 0.5);
  it('should return the middle word', () => {
    Math.random = jest.fn();
    Math.random
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.9);
    const firstResult = randomlySelectWord(['first', 'second', 'third']);
    const secondResult = randomlySelectWord(['first', 'second', 'third']);
    const thirdResult = randomlySelectWord(['first', 'second', 'third']);
    expect(firstResult).toBe('first');
    expect(secondResult).toBe('second');
    expect(thirdResult).toBe('third');
  });
});
jest.mock('readline-sync');
describe('askForALetter', () => {
  it('should return the letter ', () => {
    readLineSync.question.mockReturnValueOnce('a');
    const result = askForALetter();
    expect(result).toBe('a');
  });
});
describe('validateInput', () => {
  it('should only return a single letter when a single letter is passed', () => {
    const result = validateInput('a');
    expect(result).toBe('a');
  });
  it('should return the first character if it receives a string', () => {
    const result = validateInput('string');
    expect(result).toBe('s');
  });
  it('should throw an error with a message of "Invalid input" if it receives a number', () => {
    expect.assertions(2);
    try {
      validateInput(2);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('Invalid input');
    }
  });
  it('should throw an error if it receives an input of undefined.', () => {
    expect(validateInput).toThrow('Invalid input');
  });
  it('should throw an error', () => {
    expect(() => {
      validateInput('2');
    }).toThrow('Invalid input');
    expect(() => {
      validateInput('.');
    }).toThrow('Invalid input');
  });
});
