import { PersonQualifier } from "../enums/person-qualifier.enum";
import { AddressRequest } from "./address.request";

export interface LegalPersonRequest
{
    Id: number | undefined;
    Address: AddressRequest;
    Qualifier: PersonQualifier;
    Cnpj: string;
    CorporateName: string;
    FantasyName: string | undefined;
}