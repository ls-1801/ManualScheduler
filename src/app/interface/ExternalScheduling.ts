/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.35.1025 on 2022-03-24 02:38:32.

export interface ExternalScheduling {
  name: string;
  state: SchedulingState;
  jobStatus: ExternalBatchJobSchedulingStatus[];
  testBed: string;
  queue: string[] | null;
  slots: ExternalSlotScheduling | null;
}

export interface ExternalTestbed {
  name: string;
  state: SlotsStatusState;
  slotsByNode: { [index: string]: SlotOccupationStatus[] };
}

export interface ExternalBatchJob {
  name: string;
  state: BatchJobState;
  externalScheduler: { [index: string]: { [index: string]: string }[] };
  scheduledEvents: ScheduledEvents[];
}


export type JobsByName = { [index: string]: ExternalBatchJob };

export interface ExternalResourceModification<T> {
  action: Action;
  resource: T;
}

export interface ExternalSlotScheduling {
  mode: string;
  jobs: ExternalSlotSchedulingItems[];
}

export interface SlotOccupationStatus {
  reservedFor: string;
  state: SlotState;
  podName: string;
  nodeName: string;
  nodeId: number;
  slotPositionOnNode: number;
  podUId: string;
  position: number;
}

export interface ScheduledEvents {
  start: string;
  stop: string;
  successful: boolean;
  scheduling: NamespacedName;
}

export interface ExternalBatchJobSchedulingStatus {
  name: string;
  state: SchedulingJobStateEnum;
}

export interface ExternalSlotSchedulingItems {
  slots: number[];
  name: string;
}

export interface NamespacedName {
  namespace: string;
  name: string;
}

export type SchedulingState = "FailedState" | "InitialState" | "AcquireState" | "CompletedState" | "ConfirmationState" | "FinishedState" | "SubmissionState" | "AwaitingCompletionState" | "Error";

export type SlotsStatusState = "IN_PROGRESS" | "SUCCESS" | "ERROR" | "RUNNING" | "INITIAL";

export type BatchJobState = "ReadyState" | "InQueueState" | "SubmittedState" | "ScheduledState" | "RunningState" | "CompletedState" | "FailedState" | "FailedSubmissionState" | "UnknownState";

export type Action = "ADDED" | "MODIFIED" | "DELETED" | "ERROR" | "BOOKMARK";

export type SlotState = "FREE" | "OCCUPIED" | "ERROR" | "RESERVED";

export type SchedulingJobStateEnum = "InQueue" | "Acquiring" | "Submitted" | "Scheduled" | "Completed";
