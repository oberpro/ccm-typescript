
interface IfCcmComponent {
    name: string;
    version?: number[];
    ccm: string | { url: string, integrity?: string, crossorigin?: string };
    config: any;
    Instance: () => void;
}

type CCMModule = string | { url: string, integrity?: string, crossorigin?: string };

export abstract class CcmComponent {
    private component: IfCcmComponent;
    private instance: any;
    constructor(private name: string, private ccm: CCMModule, private config: any) {
        let _this = this;
        this.component = {
            name: name,
            ccm: ccm,
            config: config,
            Instance: function () {
                this.start = (c) => _this.start(c);
                this.init = (c) => _this.init(c);
                this.ready = (c) => _this.ready(c);
                _this.instance = this;
                return this;
            }
        };
        this.loadCCM();
    }

    protected getElement(): HTMLElement | undefined {
        return this.instance.element;
    }

    protected setVersion(version: number[]) {
        this.component.version = version;
    }

    abstract start(callback: () => void): void;
    abstract init(callback: () => void): void;
    abstract ready(callback: () => void): void;

    private loadCCM(): void {
        var f = "ccm." + this.component.name + (this.component.version ? "-" + this.component.version.join(".") : "") + ".js";
        if ((<any>window).ccm && null === (<any>window).ccm.files[f]) (<any>window).ccm.files[f] = this.component;
        else {
            var n = (<any>window).ccm && (<any>window).ccm.components[this.component.name];
            n && n.ccm && (this.component.ccm = n.ccm), "string" == typeof this.component.ccm && (this.component.ccm = {
                url: this.component.ccm
            });
            // NEW VERSION
            (function l(obj) {
                var resolve = function () {
                    (<any>window).ccm_loader.resolve(obj);
                }
                if (!(<any>window).ccm_loader) {
                    var e = document.createElement("script");
                    document.head.appendChild(e);
                    e.onload = function () {
                        resolve();
                    };
                    e.src = "https://oberpro.github.io/ccm_loader/ccm_loader.js";
                } else {
                    resolve();
                }
            })(this.component);
        }
    }
}