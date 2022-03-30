import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RxStompService} from "../rx-stomp.service";
import {map, Observable, ReplaySubject, Subject} from "rxjs";
import {
  ExternalBatchJob,
  ExternalResourceModification,
  ExternalScheduling,
  ExternalTestbed,
  JobsByName
} from "./ExternalScheduling";


const URL: string = "http://localhost:8082/external/";

@Injectable({
  providedIn: 'root'
})
export class ExternalSchedulerInterfaceService {


  private jobs: { [index: string]: Subject<ExternalBatchJob> } = {};
  private schedulings: { [index: string]: Subject<ExternalScheduling> } = {};
  private testbeds: { [index: string]: Subject<ExternalTestbed> } = {};

  constructor(private http: HttpClient, private stompService: RxStompService) {
  }

  listJobs(): Observable<JobsByName> {
    return this.http.get<JobsByName>(URL + "jobs");
  }

  updateJob(job: ExternalBatchJob): Observable<ExternalBatchJob> {
    return this.http.put<ExternalBatchJob>(URL + "jobs", job);
  }


  listTestbeds(): Observable<Array<ExternalTestbed>> {
    return this.http.get<Array<ExternalTestbed>>(URL + "testbeds");
  }

  listSchedulings(): Observable<Array<ExternalScheduling>> {
    return this.http.get<Array<ExternalScheduling>>(URL + "schedulings");
  }

  createScheduling(scheduling: ExternalScheduling): Observable<ExternalScheduling> {
    return this.http.post<ExternalScheduling>(URL + "schedulings", scheduling);
  }

  deleteScheduling(name: String): Observable<void> {
    return this.http.delete<void>(URL + "schedulings/" + name);
  }

  listenForJobs(): Observable<ExternalResourceModification<string>> {
    return this.stompService.watch(`/topic/jobs`)
      .pipe(map((message) => {
        let modification: ExternalResourceModification<string> = JSON.parse(message.body);
        return modification;
      }));
  }

  getJob(name: string): Observable<ExternalBatchJob> {
    if (this.jobs[name]) {
      return this.jobs[name].asObservable();
    }

    this.jobs[name] = new ReplaySubject(1);

    this.http.get<ExternalBatchJob>(URL + "jobs/" + name)
      .subscribe(response => this.jobs[name].next(response));

    let subscription = this.stompService.watch(`/topic/jobs/${name}`).subscribe((message) => {
      console.log("Got a Job", name)
      let modification: ExternalResourceModification<ExternalBatchJob> = JSON.parse(message.body);

      if (modification.action === "DELETED") {
        this.jobs[name].complete();
        delete this.schedulings[name]
        subscription.unsubscribe();
        return;
      }

      this.jobs[name].next(modification.resource)
    });

    return this.jobs[name].asObservable();
  }

  listenForSchedulings(): Observable<ExternalResourceModification<string>> {
    return this.stompService.watch(`/topic/schedulings`)
      .pipe(map((message) => {
        let modification: ExternalResourceModification<string> = JSON.parse(message.body);
        return modification;
      }));
  }

  getScheduling(name: string): Observable<ExternalScheduling> {
    if (this.schedulings[name]) {
      return this.schedulings[name].asObservable();
    }

    this.schedulings[name] = new ReplaySubject(1);

    this.http.get<ExternalScheduling>(URL + "schedulings/" + name)
      .subscribe(response => this.schedulings[name].next(response));

    let subscription = this.stompService.watch(`/topic/schedulings/${name}`).subscribe((message) => {
      let modification: ExternalResourceModification<ExternalScheduling> = JSON.parse(message.body);

      if (modification.action === "DELETED") {
        this.schedulings[name].complete();
        delete this.schedulings[name]
        subscription.unsubscribe();
        return;
      }

      this.schedulings[name].next(modification.resource)
    });

    return this.schedulings[name].asObservable();
  }

  listenForTestbeds(): Observable<ExternalResourceModification<string>> {
    return this.stompService.watch(`/topic/testbeds`)
      .pipe(map((message) => {
      let modification: ExternalResourceModification<string> = JSON.parse(message.body);
      return modification;
    }));
  }

  getTestbed(name: string): Observable<ExternalTestbed> {
    if (this.testbeds[name]) {
      return this.testbeds[name].asObservable();
    }

    this.testbeds[name] = new ReplaySubject(1);

    this.http.get<ExternalTestbed>(URL + "testbeds/" + name)
      .subscribe(response => this.testbeds[name].next(response));

    let subscription = this.stompService.watch(`/topic/testbeds/${name}`).subscribe((message) => {
      let modification: ExternalResourceModification<ExternalTestbed> = JSON.parse(message.body);

      if (modification.action === "DELETED") {
        this.testbeds[name].complete();
        delete this.testbeds[name]
        subscription.unsubscribe();
        return;
      }

      this.testbeds[name].next(modification.resource)
    });

    return this.testbeds[name].asObservable();
  }


}
