export type JwtPayloadProps = {
  account_id: string;
  account_type: string;
};

export interface IJwtService {
  sign(payload: JwtPayloadProps): string;
  verify(token: string): JwtPayloadProps;
}
