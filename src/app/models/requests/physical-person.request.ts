import { PersonQualifier } from "../enums/person-qualifier.enum";
import { AddressRequest } from "./address.request";

export interface PhysicalPersonRequestDto
{
    Id: number | undefined;
    Address: AddressRequest;
    Qualifier: PersonQualifier;
    Cpf: string;
    Name: string;
    NickName: string | undefined;
}