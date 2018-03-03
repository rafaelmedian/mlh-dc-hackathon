const {
  isEmail,
  validTo,
  allTrue,
  validText,
  validFrom,
  errorIsEmpty,
  validSubject,
  fnReturnsTrue,
  createEmailObj,
  stringHasLength,
  isStrOrEmptyStr,
  validateEmailRequest,
} = require('./');

describe('mailer', () => {
  describe('isEmail', () => {
    it('should return true', () => {
      expect(isEmail('webdeveloperpr@gmail.com')).to.equal(true);
    });
    it('should return false', () => {
      const emails = [
        '',
        'asdfasdf@',
        '@gmail.com',
        '.com',
        'asdf@gmail.'
      ];
      const isInvalidEmail = x => isEmail(x) === false;
      expect(emails.every(isInvalidEmail)).to.equal(true)
    });
  });

  describe('stringHasLength', () => {
    it('should return false when string has no length', () => {
      const result = stringHasLength('');
      expect(result).to.equal(false);
    });
    it('should return true when string has length', () => {
      const result = stringHasLength('s');
      expect(result).to.equal(true);
    });
  });

  describe('fnReturnsTrue', () => {
    it('should return true when function returns true', () => {
      const result = fnReturnsTrue(('Hello'))(x => x === 'Hello');
      expect(result).to.equal(true);
    });
  });

  describe('allTrue', () => {
    const mockTrue = () => true;
    const mockFalse = () => false;
    it('should return true when function returns true', () => {
      const result = allTrue([mockTrue, mockTrue], true);
      expect(result).to.equal(true);
    });
    it('should return false when function returns false', () => {
      const mockTrue = () => true;
      const result = allTrue([mockTrue, mockFalse], true);
      expect(result).to.equal(false);
    });
  });

  describe('validFrom', () => {
    it('should return true when email is valid', () => {
      const result = validFrom('webdeveloperpr@gmail.com');
      expect(result).to.equal(true);
    });
    it('should return false when email is not valid', () => {
      const emails = [{}, [], true, ''];
      const invalid = x => validFrom(x) === false;
      const result = emails.every(invalid);
      expect(result).to.equal(true);
    });
  });

  describe('validTo', () => {
    it('should return true when email is valid', () => {
      const result = validTo('webdeveloperpr@gmail.com');
      expect(result).to.equal(true);
    });
    it('should return false when email is not valid', () => {
      const emails = [{}, [], true, ''];
      const invalid = x => validTo(x) === false;
      const result = emails.every(invalid);
      expect(result).to.equal(true);
    });
  });

  describe('validSubject', () => {
    it('should return true when subject is valid', () => {
      const result = validSubject('asdf');
      expect(result).to.equal(true);
    });
    it('should return false when subject is not valid', () => {
      const result = validSubject('');
      expect(result).to.equal(false);
    });
  });

  describe('validText', () => {
    it('should return true when subject is valid', () => {
      const result = validText('asdf');
      expect(result).to.equal(true);
    });
    it('should return false when subject is not valid', () => {
      const result = validText('');
      expect(result).to.equal(false);
    });
  });

  describe('isStrOrEmptyStr', () => {
    it('should return true whe na valid string is passed', () => {
      const result = isStrOrEmptyStr('sdf');
      expect(result).to.equal('sdf');
    });
  });

  describe('errorIsEmpty', () => {
    it('should return true if the key of an object is empty', () => {
      const result = errorIsEmpty({ to: '' })('to');
      expect(result).to.equal(true);
    });
    it('should return false if the key of an object is not empty', () => {
      const result = errorIsEmpty({ to: 'ss' })('to');
      expect(result).to.equal(false);
    });
  });

  describe('createEmailObj', () => {
    it('renders without crashing', () => {
      const validEmail = createEmailObj({
        from: 'webdeveloperpr@gmail.com',
        to: 'webdeveloperpr@gmail.com',
        subject: 'This is the subject',
        html: 'This is the message',
      });
      const { errors } = validateEmailRequest(validEmail);
      // expect(errors).to.equal(true);
    });
    it('renders without crashing', () => {
      const validEmail = createEmailObj({
        to: 'webdeveloperpr@gmail.com',
        subject: 'This is the subject',
        html: 'This is the message',
      });
      const { isValid } = validateEmailRequest(validEmail);
      expect(isValid).to.equal(false);
    });
  });
});