import mongoose from "mongoose";

export interface IEventQueryParams {
  createdBy: mongoose.Types.ObjectId;
  isArchived?: boolean;
  startDate?: {
    $gte: Date;
    $lte: Date;
  };
}
