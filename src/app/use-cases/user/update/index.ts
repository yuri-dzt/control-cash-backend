import { UpdateUserInput } from "./input";
import { UpdateUserUseCaseError } from "./error";
import { IUserDto } from "../../../../contracts/dtos/user";
import { UserMapper } from "../../../../contracts/mappers/user";
import { UserRole } from "../../../../domain/entities/user/enum";
import { IHashService } from "../../../../contracts/services/hash";
import { IUserRepository } from "../../../../contracts/repositories/user";

export class UpdateUserUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly hashService: IHashService,
  ) { }

  async execute(props: UpdateUserInput): Promise<IUserDto | UpdateUserUseCaseError> {
    try {
      const userExist = await this.userRepo.findById(props.user_id);
      if (!userExist) {
        return new UpdateUserUseCaseError("User not found!");
      }

      if (props.name) {
        userExist.updateName(props.name);
      }

      if (props.email) {
        const emailExist = await this.userRepo.findByEmail(props.email);
        if (emailExist) {
          return new UpdateUserUseCaseError("Already exists an user with this email!");
        }

        userExist.updateEmail(props.email);
      }

      if (props.password) {
        const hashedPassword = await this.hashService.hash(props.password);
        userExist.updatePassword(hashedPassword);
      }

      if (props.role) {
        userExist.updateRole(props.role as UserRole);
      }

      await this.userRepo.update(userExist);
      return UserMapper.toDto(userExist);

    } catch {
      return new UpdateUserUseCaseError("Error occurred while updating user");
    }
  }
}
