import { showOverlay } from './index';

export const showFeedback = (title, actions) => {
  showOverlay('overlay.feedback', {
    title,
    actions
  });
};
