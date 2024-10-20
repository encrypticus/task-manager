import dayjs, { Dayjs } from 'dayjs';
import { ValidatorRule } from 'rc-field-form/es/interface';

export const validateDate: ValidatorRule['validator'] = (_, value?: Dayjs) => {
  if (value && value.isBefore(dayjs(), 'day')) {
    return Promise.reject('The selected date is in the past!');
  }
  return Promise.resolve();
};
