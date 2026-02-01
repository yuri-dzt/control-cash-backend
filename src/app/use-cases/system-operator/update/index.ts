import { UpdateSystemOperatorUseCaseInput } from "./input";
import { UpdateSystemOperatorUseCaseError } from "./error";
import { IHashService } from "../../../../contracts/services/hash";
import { ISystemOperatorDto } from "../../../../contracts/dtos/system-operator";
import { IAccountRepository } from "../../../../contracts/repositories/account";
import { SystemOperatorMapper } from "../../../../contracts/mappers/system-operator";
import { SystemOperatorRole } from "../../../../domain/entities/system-operator/enum";
import { ISystemOperatorRepository } from "../../../../contracts/repositories/system-operator";

export class UpdateSystemOperatorUseCase {
  constructor(
    private readonly systemOperatorRepo: ISystemOperatorRepository,
    private readonly accountRepo: IAccountRepository,
    private readonly hashService: IHashService,
  ) { }

  async execute(props: UpdateSystemOperatorUseCaseInput): Promise<ISystemOperatorDto | UpdateSystemOperatorUseCaseError> {
    try {
      const entityExist = await this.systemOperatorRepo.findById(props.id);
      if (!entityExist) return new UpdateSystemOperatorUseCaseError("System operator not found");

      if (props.email) {
        const emailExist = await this.accountRepo.findByEmail(props.email);
        if (emailExist) return new UpdateSystemOperatorUseCaseError("Email already used");

        entityExist.update({ email: props.email });
      }

      if (props.name) {
        entityExist.update({ name: props.name });
      }

      if (props.role) {
        entityExist.update({ role: props.role as SystemOperatorRole });
      }

      if (props.password) {
        const hashedPassword = await this.hashService.hash(props.password);
        entityExist.update({ password: hashedPassword });
      }

      if (props.is_active !== undefined) {
        entityExist.update({ is_active: props.is_active });
      }

      await this.systemOperatorRepo.update(entityExist);
      return SystemOperatorMapper.toDto(entityExist);
    } catch {
      return new UpdateSystemOperatorUseCaseError("Error occurred while updating system operator");
    }
  }
}
