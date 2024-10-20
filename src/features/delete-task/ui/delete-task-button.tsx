import { FC } from 'react';
import { Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteTask } from '@/src/features/delete-task/api/use-delete-task';

type DeleteTaskButtonProps = {
  taskId: string;
};

export const DeleteTaskButton: FC<DeleteTaskButtonProps> = ({ taskId }) => {
  const { mutateAsync, isPending } = useDeleteTask();
  const onButtonClick = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete the task?',
      onOk: async () => await mutateAsync(taskId),
    });
  };

  return (
    <Button
      loading={isPending}
      icon={<DeleteOutlined />}
      onClick={onButtonClick}
    />
  );
};
