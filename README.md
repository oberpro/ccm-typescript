# CCM TypeScript Support #
If you want to create a CCM Component with Typescript, just clone this repo and do the following:  
- create a file called ccm.<your-component-name>.ts
- run `npm install`
- extend the CcmComponent 
- implement all needed methods
- create a constructor and call the super method
- run `tsc` and take a look at your dist folder :)
##Example##
```ts
export class HelloWorld extends CcmComponent {

    constructor() {
        super("hello-world", "https://ccmjs.github.io/ccm/versions/ccm-16.6.1.js", {}); // name:'hello-world', ccm version: 16.6.1, config: {}
        super.setVersion([1, 0, 0]); // set the version to 1.0.0
    }

    start(callback: () => void): void {  // this is called if the component started
        this.getElement().innerHTML = `
        Hello, World!
        `;
        callback();
    }
    init(callback: () => void): void { // this is called if the component was initialized
        callback();
    }
    ready(callback: () => void): void { // this is called if the component is ready
        callback();
    }

}

new HelloWorld();
```