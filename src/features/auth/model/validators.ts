import { ValidatorRule } from 'rc-field-form/es/interface';

const reject = (message: string) => Promise.reject(new Error(message));

export const validatePassword: ValidatorRule['validator'] = (_, value) => {
  if (!value) return reject('Please input password!');

  if (value.length < 8)
    return reject('Password must be at least 8 characters long.');

  if (!/[A-Z]/.test(value))
    return reject('Password must have at least one uppercase letter.');

  if (!/[0-9]/.test(value))
    return reject('Password must have at least one digit.');

  if (!/[^a-zA-Z0-9]/.test(value))
    return reject(
      'Password must have at least one non-alphanumeric character.',
    );

  return Promise.resolve();
};
