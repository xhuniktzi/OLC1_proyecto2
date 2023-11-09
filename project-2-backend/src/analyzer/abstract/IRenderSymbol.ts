import { Datatype } from "../enums/EnumDatatype";

export interface IRenderSymbol {
  id: string;
  datatype: Datatype;
  line: number;
  column: number;
  env: string;
  value: string | number | boolean;
}
