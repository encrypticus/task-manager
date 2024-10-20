import { FC, useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  Modal,
  Switch,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { TaskEntity } from '@/src/shared/types';
import dayjs, { Dayjs } from 'dayjs';
import { useEditTask } from '@/src/features/edit-task/api/use-edit-task';
import { validateDate } from '@/src/shared/validators';

type EditTaskProps = {
  task: TaskEntity;
};

export const EditTask: FC<EditTaskProps> = ({ task }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { mutateAsync, isPending } = useEditTask();

  const closeModal = () => {
    setOpen(false);
    form.resetFields();
  };

  const openModal = () => {
    form.setFieldsValue({
      ...task,
      dueDate: task.dueDate ? dayjs(task.dueDate) : null,
    });
    setOpen(true);
  };

  const onSubmit: FormProps<
    Partial<TaskEntity & { dueDate: Dayjs }>
  >['onFinish'] = async (values) => {
    await mutateAsync({
      id: task.id,
      task: {
        ...values,
        dueDate: values.dueDate?.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      },
    });
    closeModal();
  };

  return (
    <>
      <Button icon={<EditOutlined />} onClick={openModal} />
      <Modal
        destroyOnClose
        title={'Edit task'}
        open={open}
        onCancel={closeModal}
        footer={[
          <Button
            loading={isPending}
            key={'show-modal'}
            form={'edit-task-form'}
            type={'primary'}
            htmlType={'submit'}
          >
            Ok
          </Button>,
          <Button key={'hide-modal'} onClick={closeModal}>
            Cancel
          </Button>,
        ]}
      >
        <Form
          form={form}
          id={'edit-task-form'}
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
          <Form.Item
            name={'isCompleted'}
            label={'Task status'}
            valuePropName={'checked'}
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
