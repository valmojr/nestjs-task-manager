import { StringOption } from 'necord';

export class CreateGoalDTO {
  @StringOption({
    name: 'name',
    description: 'Name of the goal',
    required: true,
  })
  name: string;

  @StringOption({
    name: 'description',
    description: 'Description of the goal',
    required: false,
  })
  description: string;
}
