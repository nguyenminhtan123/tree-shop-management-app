import { Navigation } from 'react-native-navigation';

export const pop = componentId => Navigation.pop(componentId);

export const popToRoot = componentId => Navigation.popToRoot(componentId);

export const popTo = componentId => Navigation.popTo(componentId);

export const dismissModal = componentId => Navigation.dismissModal(componentId);

export const dismissAllModals = () => Navigation.dismissAllModals();

export const dismissOverlay = componentId =>
  Navigation.dismissOverlay(componentId);

export const mergeOptions = (componentId, options) => {
  Navigation.mergeOptions(componentId, options);
};
