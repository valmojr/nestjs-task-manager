import { STATUS } from '@prisma/client';
import { MemberOption, StringOption } from 'necord';
export class CreateTaskDTO {
  @StringOption({
    name: 'title',
    description: 'The title of the task',
    required: true,
  })
  title: string;

  @StringOption({
    name: 'description',
    description: 'The description of the task',
    required: false,
  })
  description: string;

  @MemberOption({
    name: 'assignee',
    description: 'The assignee of the task',
    required: false,
  })
  userId: string;

  @StringOption({
    name: 'status',
    description: 'The status of the task',
    autocomplete: true,
    required: false,
  })
  status: STATUS;

  @StringOption({
    name: 'due-date',
    description: 'The due date of the task, use any format',
    required: false,
  })
  dueDate: Date;

  @StringOption({
    name: 'image',
    description: 'A image URL of the task',
    required: false,
  })
  image: string;
}
