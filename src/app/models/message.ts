export enum messageType {
  primary = 1,
  secondary,
  success,
  danger,
  warning,
  info,
  dark
}


export class Message {
  message: string;
  type:    messageType;
 }
