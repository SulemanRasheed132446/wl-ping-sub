/* eslint-disable no-unused-vars */

export * from './Success';
export * from './Error';

export const NotificationEnum = {
  Success: "SUCCESS",
  Error: "ERROR",
}

export type NotificationProps = {
  type:  "SUCCESS" | "ERROR";
  title: string;
  content: string;
};
