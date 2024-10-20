import { FC } from 'react';
import { useFetchTaskList } from '@/src/entities/tasks/api/use-fetch-task-list';
import { Col, Flex, List, Row, Typography } from 'antd';

import { format } from 'date-fns';
import { ToggleTaskButton } from '@/src/features/toggle-task';
import { AddTask } from '@/src/features/add-task';
import { DeleteTaskButton } from '@/src/features/delete-task';
import { EditTask } from '@/src/features/edit-task/ui/edit-task';
import { TaskEntity } from '@/src/shared/types';
export const TaskList: FC = () => {
  const { data, isFetching } = useFetchTaskList();

  const renderTitle = (task: TaskEntity) => {
    return (
      <Row>
        <Col span={24}>{task.title}</Col>
        <Col span={24}>
          <Row>
            <Col span={24}>
              <Typography.Text type={'secondary'}>
                Created at: {format(task.updatedAt, 'MMMM dd, yyyy')}
              </Typography.Text>
            </Col>
            {task.dueDate && (
              <Col span={24}>
                <Typography.Text type={'secondary'}>
                  Due date: {format(task.dueDate, 'MMMM dd, yyyy')}
                </Typography.Text>
              </Col>
            )}
            <Col></Col>
          </Row>
        </Col>
      </Row>
    );
  };

  return (
    <Row>
      <Col span={24}>
        <Flex justify={'center'}>
          <Typography.Title>Task list</Typography.Title>
        </Flex>
      </Col>
      <Col span={24}>
        <AddTask />
      </Col>
      <Col span={24}>
        <List
          dataSource={data}
          loading={isFetching}
          renderItem={(item) => {
            return (
              <List.Item
                actions={[
                  <EditTask task={item} />,
                  <DeleteTaskButton key={'delete-task'} taskId={item.id} />,
                  <ToggleTaskButton
                    key={'toggle-task'}
                    taskId={item.id}
                    isTaskCompleted={item.isCompleted}
                  />,
                ]}
              >
                <List.Item.Meta
                  title={renderTitle(item)}
                  description={item.description}
                />
              </List.Item>
            );
          }}
        />
      </Col>
    </Row>
  );
};
