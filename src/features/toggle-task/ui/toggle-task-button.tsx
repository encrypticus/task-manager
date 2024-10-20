import { FC } from 'react';
import { Button } from 'antd';
import { CheckOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useTaskToggle } from '@/src/features/toggle-task/api/use-task-toggle';

type ToggleTaskButtonProps = {
  taskId: string;
  isTaskCompleted: boolean;
};

export const ToggleTaskButton: FC<ToggleTaskButtonProps> = ({
  taskId,
  isTaskCompleted,
}) => {
  const { mutateAsync, isPending } = useTaskToggle();
  return (
    <Button
      icon={isTaskCompleted ? <CheckOutlined /> : <ClockCircleOutlined />}
      onClick={() => mutateAsync(taskId)}
      loading={isPending}
    />
  );
};
