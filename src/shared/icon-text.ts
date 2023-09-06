import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement("mushroom-icon-text")
export class IconText extends LitElement {
    @property() public text: string = "";

    protected render(): TemplateResult {
        return html`
            <div class="icon-text-container">
                <span class="icon-text">
                    ${this.text}
                </span>
            </div>
        `;
    }

    static get styles(): CSSResultGroup {
        return css`
            :host {
                --icon-color: var(--primary-text-color);
                --icon-color-disabled: rgb(var(--rgb-disabled));
                --shape-color: rgba(var(--rgb-primary-text-color), 0.05);
                --shape-color-disabled: rgba(var(--rgb-disabled), 0.2);
            }
            .icon-text-container {
                position: relative;
                width: var(--icon-size);
                height: var(--icon-size);
                border-radius: var(--icon-border-radius);
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--shape-color);
                transition-property: background-color, box-shadow;
                transition-duration: 280ms;
                transition-timing-function: ease-out;
                animation: var(--shape-animation);
                box-shadow: 0 0 0 1px var(--shape-outline-color);
                overflow: hidden;
            }
            .icon-text {
                color: var(--icon-color);
                font-weight: bold;
            }
        `;
    }
}
