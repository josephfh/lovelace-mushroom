import {
    css,
    CSSResultGroup,
    html,
    LitElement,
    PropertyValues,
    TemplateResult,
} from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import "hammerjs";

@customElement("mushroom-click-hijacker")
export class SliderItem extends LitElement {
    @property({ type: Boolean }) public disabled: boolean = false;

    @property({ type: Boolean }) public inactive: boolean = false;

    private _mc?: HammerManager;

    @state() active: boolean = false;

    protected firstUpdated(changedProperties: PropertyValues): void {
        super.firstUpdated(changedProperties);
        this.setupListeners();
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.setupListeners();
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.destroyListeners();
    }

    @query("#click-hijacker")
    private clickHijacker;

    setupListeners() {
        if (this.clickHijacker && !this._mc) {
            const press = new Hammer.Press({
                event: "press",
                time: 400
            })
            const tap = new Hammer.Tap({
                event: "tap"
            })

            this._mc = new Hammer.Manager(this.clickHijacker);

            this._mc.add([tap, press])

            this._mc.on("tap", () => {
                if (this.disabled) return;
                this.dispatchEvent(
                    new CustomEvent("hijack-tap")
                );
            });

            this._mc.on("press", () => {
                if (this.disabled) return;
                this.dispatchEvent(
                    new CustomEvent("hijack-press")
                );
            })
        }
    }

    destroyListeners() {
        if (this._mc) {
            this._mc.destroy();
            this._mc = undefined;
        }
    }

    protected render(): TemplateResult {
        return html`
            <div
                class=${classMap({
                    container: true,
                    inactive: this.inactive || this.disabled
                })}
            >
                <div
                    id="click-hijacker"
                    class="click-hijacker"
                ></div>
            </div>
        `;
    }

    static get styles(): CSSResultGroup {
        return css`
            :host {
                --main-color: rgba(var(--rgb-secondary-text-color), 1);
                --bg-gradient: none;
                --bg-color: rgba(var(--rgb-secondary-text-color), 0.2);
                --main-color-inactive: rgb(var(--rgb-disabled));
                --bg-color-inactive: rgba(var(--rgb-disabled), 0.2);
            }
            .container {
                display: flex;
                flex-direction: row;
            }
            .click-hijacker {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                border-radius: var(--control-border-radius);
                transform: translateZ(0);
                overflow: hidden;
                cursor: pointer;
            }
            .click-hijacker * {
                pointer-events: none;
            }
        `;
    }
}
