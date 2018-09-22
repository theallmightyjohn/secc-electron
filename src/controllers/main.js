import Template from '../models/services/template'
export default class main {
    constructor(...args) {
      const tmp = new Template();
      tmp.registerMain('../views/main');
      tmp.addPartial('body', 'body', () => {

        tmp.registerPartials(() => {

          tmp.compile('doc');
        });
      });
    }

    test(str) {
      console.log(str);
    }
}
