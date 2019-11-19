import {
  pop,
  popToRoot,
  popTo,
  dismissAllModals,
  dismissModal,
  dismissOverlay,
  mergeOptions
} from './commonActions';

export const onNavigationEvent = (buttonId, componentId) => {
  switch (buttonId) {
    case 'back':
      pop(componentId);
      break;
    case 'backToRoot':
      popToRoot(componentId);
      break;
    case 'backToScreen':
      popTo(componentId);
      break;
    case 'closeModal':
      dismissModal(componentId);
      break;
    case 'closeAllModals':
      dismissAllModals();
      break;
    case 'closeOverlay':
      dismissOverlay();
      break;
    case 'sideMenu':
      mergeOptions(componentId, {
        sideMenu: {
          left: {
            visible: true
          }
        }
      });
      break;
    default:
      break;
  }
};
