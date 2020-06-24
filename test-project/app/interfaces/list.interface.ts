import { Observable } from 'rxjs';

export type ListFetch = (query: string) => Observable<any>;
