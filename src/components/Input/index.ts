import './input.pcss';

export default `<div class="input">
  <label for="{{id}}" class="input__label">Лейбл</label>
  <input id="{{id}}" class="input__input" type="{{type}}" name="{{name}}" 
  {{#if required}}
  required
{{/if}}
{{#if disabled}}
  disabled
{{/if}}> 
  <div class="input__error">{{error}}</div>
</div>`;
