import { PersonQualifier } from "../enums/person-qualifier.enum";
import { PersonType } from "../enums/person-type.enum";
import { Cnpj } from "../utils/cnpj.model";
import { AddressResponse } from "./address.response";
import { DepartmentResponse } from "./department.response";

export interface LegalPersonResponse
{
    id: number;
    addressId: number;
    address: AddressResponse;
    qualifier: PersonQualifier;
    cnpj: Cnpj;
    corporateName: string;
    fantasyName: string | undefined;
    type: PersonType;
    departments: DepartmentResponse[] | [];
}