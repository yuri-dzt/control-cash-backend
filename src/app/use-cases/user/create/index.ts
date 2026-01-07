import { CreateUserInput } from "./input";
import { CreateUserUseCaseError } from "./error";
import { IUserDto } from "../../../../contracts/dtos/user";
import { User } from "../../../../domain/entities/user/index";
import { UserMapper } from "../../../../contracts/mappers/user";
import { UserRole } from "../../../../domain/entities/user/enum";
import { IHashService } from "../../../../contracts/services/hash";
import { IUserRepository } from "../../../../contracts/repositories/user";

export class CreateUserUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly hashService: IHashService,
  ) { }

  async execute(props: Omit<CreateUserInput, "role">): Promise<IUserDto | CreateUserUseCaseError> {
    try {
      const emailExist = await this.userRepo.findByEmail(props.email);
      if (emailExist) {
        return new CreateUserUseCaseError("Already exists an user with this email!");
      }

      const hashedPassword = await this.hashService.hash(props.password);

      const user = new User({
        name: props.name,
        email: props.email,
        password: hashedPassword,
        role: UserRole.USER,
      });

      await this.userRepo.create(user);
      return UserMapper.toDto(user);
    } catch {
      return new CreateUserUseCaseError("Error occurred while creating user");
    }
  }
}
