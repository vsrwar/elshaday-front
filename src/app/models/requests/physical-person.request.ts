import { PersonQualifier } from "../enums/person-qualifier.enum";
import { AddressRequest } from "./address.request";

export interface PhysicalPersonRequest
{
    id: number | undefined;
    address: AddressRequest;
    qualifier: PersonQualifier;
    cpf: string;
    name: string;
    nickName: string | undefined;
}