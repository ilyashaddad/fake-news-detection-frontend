import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Apollo, gql } from 'apollo-angular';
// rest api
const apiUrl = environment.BACK_END_API;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient, private apollo: Apollo) { }

  public getNews(): any {
    const query = '{ allnews{id,thematic,description,title,resume,image,date}}';
    return this.http.get(`${apiUrl}/graphql?query=${query}`);
  }
  public getNews_by_ID(id: any): any {
    const query = `{ new(newId:${id}){id,thematic,description,title,resume,image,date}}`;
    return this.http.get(`${apiUrl}/graphql?query=${query}`);
  }
  public check(title: string): any {
    const mutation: any =
      gql`mutation   createMutation($title:String!){
        newsDetection(title: $title){
          resultCheck{
            result
          }
        }
      }`;
    return this.apollo.mutate({
      mutation: mutation,
      variables: {
        title
      }

    });
  }
  public Nlp(title: string, method: string): any {
    const mutation: any =
      gql`mutation createMutation($title:String!,$method:String!){
        nlpMutation(title:$title,method:$method){
          nlpProcess{
            result
          }
        }
      }
      `;

    return this.apollo.mutate({
      mutation: mutation,
      variables: {
        title,
        method
      }

    });
  }
}
