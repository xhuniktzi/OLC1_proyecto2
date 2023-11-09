import { ISemanticResult } from "../abstract/ISemanticResult";
import { Datatype } from "../enums/EnumDatatype";
import { SemanticErrorEx } from "../exceptions/SemanticErrorEx";

const fnSemanticModule = (
  left_type: Datatype,
  right_type: Datatype,
  left_value: string | number | boolean,
  right_value: string | number | boolean,
  line: number,
  column: number
): ISemanticResult => {
  const semanticTable = {
    [Datatype.INT]: {
      [Datatype.INT]: Datatype.INT,
      [Datatype.DOUBLE]: Datatype.DOUBLE,
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: null,
      [Datatype.STRING]: null,
    },
    [Datatype.DOUBLE]: {
      [Datatype.INT]: Datatype.DOUBLE,
      [Datatype.DOUBLE]: Datatype.DOUBLE,
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: null,
      [Datatype.STRING]: null,
    },
    [Datatype.BOOLEAN]: {
      [Datatype.INT]: null,
      [Datatype.DOUBLE]: null,
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: null,
      [Datatype.STRING]: null,
    },
    [Datatype.CHAR]: {
      [Datatype.INT]: null,
      [Datatype.DOUBLE]: null,
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: null,
      [Datatype.STRING]: null,
    },
    [Datatype.STRING]: {
      [Datatype.INT]: null,
      [Datatype.DOUBLE]: null,
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: null,
      [Datatype.STRING]: null,
    },
  };

  const type: Datatype = semanticTable[left_type][right_type]!;
  if (type === null) {
    throw new SemanticErrorEx(
      `Cannot operate ${left_type} with ${right_type}.`,
      line,
      column
    );
  }

  const semanticResult = {
    [Datatype.INT]: {
      [Datatype.INT]: Number(left_value) % Number(right_value),
      [Datatype.DOUBLE]: Number(left_value) % Number(right_value),
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: null,
      [Datatype.STRING]: null,
    },
    [Datatype.DOUBLE]: {
      [Datatype.INT]: Number(left_value) % Number(right_value),
      [Datatype.DOUBLE]: Number(left_value) % Number(right_value),
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: null,
      [Datatype.STRING]: null,
    },
    [Datatype.BOOLEAN]: {
      [Datatype.INT]: null,
      [Datatype.DOUBLE]: null,
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: null,
      [Datatype.STRING]: null,
    },
    [Datatype.CHAR]: {
      [Datatype.INT]: null,
      [Datatype.DOUBLE]: null,
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: null,
      [Datatype.STRING]: null,
    },
    [Datatype.STRING]: {
      [Datatype.INT]: null,
      [Datatype.DOUBLE]: null,
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: null,
      [Datatype.STRING]: null,
    },
  };

  const value = semanticResult[left_type][right_type]!;

  return { value, type };
};

export default fnSemanticModule;
