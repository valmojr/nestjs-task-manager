import { MemberOption } from 'necord';

export class RegisterUserDTO {
  @MemberOption({
    name: 'user',
    description: 'The user to register',
    required: true,
  })
  public userId: string;
}
