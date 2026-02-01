import { CreateFirstSystemOperatorUseCaseError } from "./error";
import { CreateFirstSystemOperatorUseCaseInput } from "./input";
import { IHashService } from "../../../../contracts/services/hash";
import { ISystemOperatorDto } from "../../../../contracts/dtos/system-operator";
import { SystemOperatorMapper } from "../../../../contracts/mappers/system-operator";
import { SystemOperatorRole } from "../../../../domain/entities/system-operator/enum";
import { SystemOperator } from "../../../../domain/entities/system-operator/system-operator";
import { ISystemOperatorRepository } from "../../../../contracts/repositories/system-operator";

export class CreateFirstSystemOperatorUseCase {
  constructor(
    private readonly systemOperatorRepo: ISystemOperatorRepository,
    private readonly hashService: IHashService,
  ) { }

  async execute(props: CreateFirstSystemOperatorUseCaseInput): Promise<ISystemOperatorDto | CreateFirstSystemOperatorUseCaseError> {
    try {
      const alreadyExists = await this.systemOperatorRepo.getAll({});
      if (alreadyExists.length > 0) {
        return new CreateFirstSystemOperatorUseCaseError("System operator already exists");
      }

      const havePermission = props.secret_key === process.env.SECRET_KEY;
      if (!havePermission) {
        return new CreateFirstSystemOperatorUseCaseError("You don't have permission to create an account");
      }

      const hashedPassword = await this.hashService.hash(props.password);

      const entity = new SystemOperator({
        name: props.name,
        email: props.email,
        password: hashedPassword,
        role: SystemOperatorRole.SUPER_ADMIN,
        is_active: true
      });

      await this.systemOperatorRepo.create(entity);
      return SystemOperatorMapper.toDto(entity);
    } catch {
      return new CreateFirstSystemOperatorUseCaseError("Error occurred while creating first system operator");
    }
  }
}
