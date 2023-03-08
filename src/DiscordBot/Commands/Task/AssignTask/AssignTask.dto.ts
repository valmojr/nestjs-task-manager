import { MemberOption, StringOption } from 'necord';

export class AssignTaskDTO {
  @StringOption({
    name: 'task id',
    description: 'The id of the task',
    required: true,
  })
  taskId: string;

  @MemberOption({
    name: 'assignee',
    description: 'The assignee of the task',
    required: true,
  })
  userId: string;
}
