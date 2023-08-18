import { PersonQualifier } from "../enums/person-qualifier.enum";
import { PersonType } from "../enums/person-type.enum";
import { Cpf } from "../utils/cpf.model";
import { AddressResponse } from "./address.response";
import { DepartmentResponse } from "./department.response";

export interface PhysicalPersonResponse
{
    id: number;
    addressId: number;
    address: AddressResponse;
    qualifier: PersonQualifier;
    cpf: Cpf;
    name: string;
    nickName: string | undefined;
    type: PersonType;
    departments: DepartmentResponse[] | [];
}