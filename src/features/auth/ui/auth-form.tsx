import { FC, useState } from 'react';
import { Button, Flex, Form, FormProps, Input, Modal, Typography } from 'antd';
import { UserSignUpDto } from '@/src/features/auth/model/types/user-sign-up.dto';
import { useUserSignIn, useUserSignUp } from '@/src/features/auth';
import { validatePassword } from '@/src/features/auth/model/validators';
import { token } from '@/src/shared/token';
import { useAuth } from '@/src/app/providers/with-loggen-in.provider';

type FormType = 'signIn' | 'signUp';

export const AuthForm: FC = () => {
  const { mutateAsync: signUp, isPending: signUpPending } = useUserSignUp();
  const { mutateAsync: signIn, isPending: signInPending } = useUserSignIn();
  const [formType, setFormType] = useState<FormType>('signUp');
  const [form] = Form.useForm();
  const { login } = useAuth();

  const onSubmit: FormProps<UserSignUpDto>['onFinish'] = async (values) => {
    if (formType === 'signUp') {
      await signUp(values);
      form.resetFields();
      setFormType('signIn');
      return;
    }
    const { accessToken } = await signIn(values);
    token.set(accessToken);
    login?.(true);
  };

  const renderTitle = () => {
    return (
      <Flex vertical align={'center'}>
        <div>{formType === 'signUp' ? 'Sign up' : 'Sign in'}</div>
        <Typography.Text>or</Typography.Text>
        <div>
          {formType === 'signUp' ? (
            <Button type={'link'} onClick={() => setFormType('signIn')}>
              Sign in
            </Button>
          ) : (
            <Button type={'link'} onClick={() => setFormType('signUp')}>
              Sign up
            </Button>
          )}
        </div>
      </Flex>
    );
  };

  return (
    <Modal
      open
      centered
      closable={false}
      title={renderTitle()}
      footer={[
        <Button
          loading={signUpPending || signInPending}
          htmlType={'submit'}
          form={'authForm'}
          key={'signUpButton'}
        >
          Submit
        </Button>,
      ]}
    >
      <Form form={form} id={'authForm'} layout={'vertical'} onFinish={onSubmit}>
        {formType === 'signUp' ? (
          <Form.Item
            label={'Email'}
            name={'email'}
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email', message: 'The input is not valid email!' },
            ]}
          >
            <Input size={'large'} allowClear />
          </Form.Item>
        ) : (
          <Form.Item
            label={'Username (email)'}
            name={'username'}
            rules={[{ required: true, message: 'Please input email!' }]}
          >
            <Input size={'large'} allowClear />
          </Form.Item>
        )}
        <Form.Item
          label={'Password'}
          name={'password'}
          rules={[
            { required: true, message: '' },
            { validator: validatePassword },
          ]}
        >
          <Input size={'large'} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};
// badcoderspaik@gmail.com
// Spaik*87055091802
