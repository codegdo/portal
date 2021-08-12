import { UseInterceptor, InterceptorInterface, Action } from "routing-controllers";

export class SerializeInterceptor implements InterceptorInterface {

  intercept(_action: Action, content: any): any {
    console.log('I AM INTERCEPTER', content);
    console.log(this.dto);
    return content;
  }
}