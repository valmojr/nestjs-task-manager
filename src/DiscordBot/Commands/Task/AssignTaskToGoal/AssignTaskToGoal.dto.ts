import { StringOption } from 'necord';

export class AssignTaskToGoalDTO {
  @StringOption({
    name: 'taskid',
    description: 'The id of the task',
    required: true,
  })
  taskId: string;

  @StringOption({
    name: 'goalid',
    description: 'The id of the goal',
    required: true,
  })
  goalId: string;
}
