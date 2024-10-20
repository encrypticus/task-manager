export type TaskEntity = {
  id: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
};
