import { Button, DatePicker, Form, FormProps, Input, Modal } from 'antd';
import { useState } from 'react';
import { AddTaskDto } from '@/src/features/add-task/model/types/add-task.dto';
import { Dayjs } from 'dayjs';
import { useAddTask } from '@/src/features/add-task/api/use-add-task';
import { validateDate } from '@/src/shared/validators';

export const AddTask = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { mutateAsync, isPending } = useAddTask();

  const onSubmit: FormProps<
    Omit<AddTaskDto, 'dueDate'> & { dueDate?: Dayjs }
  >['onFinish'] = async (values) => {
    const dateString = values.dueDate?.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const addTaskDto = {
      ...values,
      dueDate: dateString,
    };

    const res = await mutateAsync(addTaskDto);

    if (res !== undefined) {
      form.resetFields();
      setOpen(false);
    }
  };

  const onModalCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add new task</Button>
      <Modal
        title={'New task'}
        open={open}
        onCancel={onModalCancel}
        footer={[
          <Button
            key={'show-modal'}
            form={'add-task-form'}
            type={'primary'}
            htmlType={'submit'}
            loading={isPending}
          >
            Ok
          </Button>,
          <Button key={'hide-modal'} onClick={onModalCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Form
          form={form}
          id={'add-task-form'}
          layout={'vertical'}
          onFinish={onSubmit}
        >
          <Form.Item
            label={'Title'}
            name={'title'}
            rules={[
              { required: true, message: 'Please input title!' },
              { max: 200, message: 'Maximum length of 200' },
            ]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label={'Description'}
            name={'description'}
            rules={[{ max: 200, message: 'Maximum length of 200' }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label={'Due date'}
            name={'dueDate'}
            rules={[{ validator: validateDate }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
