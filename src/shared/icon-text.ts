import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement("mushroom-icon-text")
export class IconText extends LitElement {
    @property() public text: string = "";

    protected render(): TemplateResult {
        return html`
            <div class="icon-text-container">
                <span class="icon-text-shape"></span>
                <span class="icon-text">
                    ${this.text}
                </span>
            </div>
        `;
    }

    static get styles(): CSSResultGroup {
        return css`
            .icon-text-container {
                align-items: center;
                border-radius: var(--icon-border-radius);
                display: flex;
                height: var(--icon-text-shape-size);
                justify-content: center;
                overflow: hidden;
                position: relative;
                width: var(--icon-text-shape-size);
            }
            .icon-text-shape {
                animation: var(--shape-animation);
                background-color: var(--icon-color);
                box-shadow: 0 0 0 1px var(--shape-outline-color);
                display: flex;
                filter: brightness(75%);
                height: var(--icon-text-shape-size);
                position: absolute;
                transition-duration: 280ms;
                transition-property: background-color, box-shadow;
                transition-timing-function: ease-out;
                width: var(--icon-text-shape-size);
            }
            .icon-text {
                color: rgb(var(--rgb-white));
                font-weight: bold;
                position: relative;
            }
        `;
    }
}
