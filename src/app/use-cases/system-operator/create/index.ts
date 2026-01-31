import { CreateSystemOperatorInput } from "./input";
import { CreateSystemOperatorUseCaseError } from "./error";
import { IHashService } from "../../../../contracts/services/hash";
import { ISystemOperatorDto } from "../../../../contracts/dtos/system-operator";
import { IAccountRepository } from "../../../../contracts/repositories/account";
import { SystemOperatorMapper } from "../../../../contracts/mappers/system-operator";
import { SystemOperatorRole } from "../../../../domain/entities/system-operator/enum";
import { SystemOperator } from "../../../../domain/entities/system-operator/system-operator";
import { ISystemOperatorRepository } from "../../../../contracts/repositories/system-operator";

export class CreateSystemOperatorUseCase {
  constructor(
    private readonly systemOperatorRepo: ISystemOperatorRepository,
    private readonly accountRepo: IAccountRepository,
    private readonly hashService: IHashService,
  ) { }

  async execute(props: CreateSystemOperatorInput): Promise<ISystemOperatorDto | CreateSystemOperatorUseCaseError> {
    try {
      const emailExist = await this.accountRepo.findByEmail(props.email);
      if (emailExist) return new CreateSystemOperatorUseCaseError("Email already exists");

      const hashedPassword = await this.hashService.hash(props.password);

      const entity = new SystemOperator({
        name: props.name,
        email: props.email,
        password: hashedPassword,
        role: props.role as SystemOperatorRole,
        is_active: true
      });

      await this.systemOperatorRepo.create(entity);
      return SystemOperatorMapper.toDto(entity);
    } catch {
      return new CreateSystemOperatorUseCaseError("Error occurred while creating system operator");
    }
  }
}
