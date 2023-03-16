const dayjs = require("dayjs");
export class PrecisionHelper {
  /**
   * Check wether a value is of type Date Precision
   * @param value any
   * @returns Boolean
   */
  static checkIfValueIsOfTypeDatePrecision(value: any): boolean {
    const precisionTypes = ["week", "month", "year"] as const;
    return precisionTypes.indexOf(value) !== -1;
  }
}
