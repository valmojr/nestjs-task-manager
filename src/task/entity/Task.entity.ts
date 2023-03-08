export type TaskInput = {
  id?: string;
  title: string;
  description?: string;
  image?: string;
  goalId?: string;
  status?: 'not_assigned' | 'pending' | 'completed' | 'stuck' | 'on_hold';
  dueDate?: Date;
  userId?: string;
};
