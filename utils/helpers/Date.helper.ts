const dayjs = require("dayjs");
import { DatePrecision } from "../../models/types/DatePrecision";

export class DateHelper {
  /**
   * Returns the first date of a specified period which could be week/month/year
   * @param date Date
   * @param precision DatePrecision
   * @returns Date
   */
  static calculateStartOfPeriod(date: Date, precision: DatePrecision): Date {
    return dayjs(date).startOf(precision).toDate();
  }

  /**
   * Returns the last date before the end of a specified period which could be week/month/year
   * @param date Date
   * @param precision DatePrecision
   * @returns Date
   */
  static calculateEndOfPeriod(date: Date, precision: DatePrecision): Date {
    return dayjs(date).endOf(precision).toDate();
  }

  /**
   * Runs a check to see if the date from the parameter is a valid js Date object
   * @param date Date
   * @returns Date
   */
  static checkIfValidDateObject(date: Date): Boolean {
    return date instanceof Date && !!date.getDate();
  }
}
