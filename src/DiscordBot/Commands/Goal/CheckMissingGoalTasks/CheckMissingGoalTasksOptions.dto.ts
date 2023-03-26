import { StringOption } from 'necord';

export class CheckMissingGoalTasksDTO {
  @StringOption({
    name: 'goalid',
    description: 'The id of the goal',
    required: true,
  })
  goalId: string;
}
