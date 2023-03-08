import { IsNotEmpty } from 'class-validator';
import {
  MemberOption,
  StringOption,
} from 'necord/dist/commands/slash-commands/options';

export class CreateTaskDTO {
  @IsNotEmpty()
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
    required: false,
  })
  status: 'not_assigned' | 'pending' | 'completed' | 'stuck' | 'on_hold';

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

  @StringOption({
    name: 'goal',
    description: 'The goal id of the task',
    required: false,
  })
  goalId: string;
}
