import { GetUsersUseCaseError } from "./error";
import { IUserDto } from "../../../../contracts/dtos/user";
import { UserMapper } from "../../../../contracts/mappers/user";
import { IUserRepository } from "../../../../contracts/repositories/user";

export class GetUsersUseCase {
  constructor(
    private readonly userRepo: IUserRepository
  ) { }

  async execute(): Promise<IUserDto[] | GetUsersUseCaseError> {
    try {
      const users = await this.userRepo.getAll();

      if (users.length === 0) {
        return []
      }

      return users.map((user) => UserMapper.toDto(user));
    } catch {
      return new GetUsersUseCaseError("Error occurred while getting users");
    }
  }
}
