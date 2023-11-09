import { ISemanticResult } from "../abstract/ISemanticResult";
import { Datatype } from "../enums/EnumDatatype";
import { SemanticErrorEx } from "../exceptions/SemanticErrorEx";
import fnBooleanToInt from "./fnBooleanToInt";
import fnCharToInt from "./fnCharToInt";

const fnSemanticAdd = (
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
      [Datatype.BOOLEAN]: Datatype.INT,
      [Datatype.CHAR]: Datatype.INT,
      [Datatype.STRING]: Datatype.STRING,
    },
    [Datatype.DOUBLE]: {
      [Datatype.INT]: Datatype.DOUBLE,
      [Datatype.DOUBLE]: Datatype.DOUBLE,
      [Datatype.BOOLEAN]: Datatype.DOUBLE,
      [Datatype.CHAR]: Datatype.DOUBLE,
      [Datatype.STRING]: Datatype.STRING,
    },
    [Datatype.BOOLEAN]: {
      [Datatype.INT]: Datatype.INT,
      [Datatype.DOUBLE]: Datatype.DOUBLE,
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: null,
      [Datatype.STRING]: Datatype.STRING,
    },
    [Datatype.CHAR]: {
      [Datatype.INT]: Datatype.INT,
      [Datatype.DOUBLE]: Datatype.DOUBLE,
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: Datatype.STRING,
      [Datatype.STRING]: Datatype.STRING,
    },
    [Datatype.STRING]: {
      [Datatype.INT]: Datatype.STRING,
      [Datatype.DOUBLE]: Datatype.STRING,
      [Datatype.BOOLEAN]: Datatype.STRING,
      [Datatype.CHAR]: Datatype.STRING,
      [Datatype.STRING]: Datatype.STRING,
    },
  };

  const type: Datatype = semanticTable[left_type][right_type]!;
  if (type === null) {
    throw new SemanticErrorEx(
      "Cannot add two booleans or two chars.",
      line,
      column
    );
  }

  const semanticResult = {
    [Datatype.INT]: {
      [Datatype.INT]: Number(left_value) + Number(right_value),
      [Datatype.DOUBLE]: Number(left_value) + Number(right_value),
      [Datatype.BOOLEAN]:
        Number(left_value) + fnBooleanToInt(Boolean(right_value)),
      [Datatype.CHAR]: Number(left_value) + fnCharToInt(right_value.toString()),
      [Datatype.STRING]: `${left_value}${right_value}`,
    },
    [Datatype.DOUBLE]: {
      [Datatype.INT]: Number(left_value) + Number(right_value),
      [Datatype.DOUBLE]: Number(left_value) + Number(right_value),
      [Datatype.BOOLEAN]:
        fnBooleanToInt(Boolean(left_value)) + Number(right_value),
      [Datatype.CHAR]: fnCharToInt(left_value.toString()) + Number(right_value),
      [Datatype.STRING]: `${left_value}${right_value}`,
    },
    [Datatype.BOOLEAN]: {
      [Datatype.INT]: fnBooleanToInt(Boolean(left_value)) + Number(right_value),
      [Datatype.DOUBLE]:
        fnBooleanToInt(Boolean(left_value)) + Number(right_value),
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]: null,
      [Datatype.STRING]: `${left_value}${right_value}`,
    },
    [Datatype.CHAR]: {
      [Datatype.INT]: fnCharToInt(left_value.toString()) + Number(right_value),
      [Datatype.DOUBLE]:
        fnCharToInt(left_value.toString()) + Number(right_value),
      [Datatype.BOOLEAN]: null,
      [Datatype.CHAR]:
        fnCharToInt(left_value.toString()) +
        fnCharToInt(right_value.toString()),
      [Datatype.STRING]: `${left_value}${right_value}`,
    },
    [Datatype.STRING]: {
      [Datatype.INT]: `${left_value}${right_value}`,
      [Datatype.DOUBLE]: `${left_value}${right_value}`,
      [Datatype.BOOLEAN]: `${left_value}${right_value}`,
      [Datatype.CHAR]: `${left_value}${right_value}`,
      [Datatype.STRING]: `${left_value}${right_value}`,
    },
  };

  const value = semanticResult[left_type][right_type]!;

  return { value, type };
};

export default fnSemanticAdd;
