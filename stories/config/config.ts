import { configure } from '@storybook/react';

const req = require.context('../', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(req);
}
configure(loadStories, module);
