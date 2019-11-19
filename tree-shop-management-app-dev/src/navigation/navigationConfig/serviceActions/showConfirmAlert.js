import { showOverlay } from './index';

export const showConfirmAlert = (title, message, actions) => {
  showOverlay('overlay.confirmAlert', {
    title,
    message,
    actions
  });
};
