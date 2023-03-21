import { UpdateResult } from "mongodb";
import mongoose, { HydratedDocument, Model } from "mongoose";
import { EventDocument } from "../models/documents/EventDocument";
import { ICreateEventDTO } from "../models/dto/event/ICreateEventDTO";
import { IUpdateEventDTO } from "../models/dto/event/IUpdateEventDTO";
import { DatePrecision } from "../models/types/DatePrecision";
import { IEventQueryParams } from "../models/util/IEventQueryParams";
import { DateHelper } from "../utils/helpers/Date.helper";
import Event from "../models/schemas/EventSchema";

const createNewEvent = async (newEvent: ICreateEventDTO) => {
  const createdEvent = await Event.create(newEvent);
  return createdEvent;
};

const getAllEvents = async () => {
  // const findArgs: IEventQueryParams =
  //   isArchived != undefined && isArchived != null
  //     ? {
  //         createdBy: userId,
  //         isArchived: isArchived,
  //       }
  //     : {
  //         createdBy: userId,
  //       };

  const allEvents = await Event.find();
  return allEvents;
};

const getAllEventsByDate = async () => {
  // let findArgs: IEventQueryParams = {
  //   createdBy: userId,
  //   startDate: {
  //     $gte: DateHelper.calculateStartOfPeriod(date, datePrecision),
  //     $lte: DateHelper.calculateEndOfPeriod(date, datePrecision),
  //   },
  // };

  const allEvents = await Event.find();
  return allEvents;
};

const getEventById = async (id: string) => {
  const event = await Event.findById(id);
  return event;
};

const updateOneEvent = async (id: string, updatedEvent: IUpdateEventDTO) => {
  const event = await Event.findByIdAndUpdate(id, updatedEvent);
  return event;
};

const archiveEvents = async (): Promise<UpdateResult> => {
  const events: UpdateResult = await Event.updateMany(
    { startDate: { $lt: new Date() } },
    { isArchived: true }
  );
  return events;
};

const deleteOneEvent = async (id: string) => {
  const deletedEvent = await Event.findByIdAndDelete(id);
  return deletedEvent;
};

const eventService = {
  getAllEvents,
  getAllEventsByDate,
  getEventById,
  createNewEvent,
  updateOneEvent,
  archiveEvents,
  deleteOneEvent,
};

export = eventService;
