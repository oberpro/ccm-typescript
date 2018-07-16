import { CcmComponent } from "./../ccm.component.js";

export class HelloWorld extends CcmComponent {

    constructor() {
        super("hello-world", "https://ccmjs.github.io/ccm/versions/ccm-16.6.1.js", {});
        super.setVersion([1, 0, 0]);
    }

    start(callback: () => void): void {
        this.getElement().innerHTML = `
        Hello, World!
        `;
        callback();
    }
    init(callback: () => void): void {
        callback();
    }
    ready(callback: () => void): void {
        callback();
    }

}

new HelloWorld();