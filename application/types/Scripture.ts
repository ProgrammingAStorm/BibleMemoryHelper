import { RecordModel } from "pocketbase";

export default interface ScriptureModel extends RecordModel {
  Book: string;
  Chapter: number;
  Verse: number;
  Passage: string;
}
