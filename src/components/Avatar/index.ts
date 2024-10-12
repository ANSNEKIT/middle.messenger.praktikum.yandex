import './avatar.pcss';

export default `<div class="avatar">
  <div class="avatar__empty"></div>
  {{#if image}}
  <div class="avatar__image-wrap">
    <img class="avatar__image" width="34" height="34" src="" alt="avatar-image">
  </div>
  {{/if}}
</div>`;
