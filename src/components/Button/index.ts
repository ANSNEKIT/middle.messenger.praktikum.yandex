import "./button.pcss";

export default `<button id="{{id}}" class="button button--primary {{class}}" type="button" 
{{#if disabled}}
  disabled
{{/if}}
>{{text}}</button>`;
