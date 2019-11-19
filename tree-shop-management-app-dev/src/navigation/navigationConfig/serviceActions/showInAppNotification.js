import { showOverlay } from './index';
import { Colors } from '../../../themes';

export const showInAppNotification = (
  title,
  content,
  type = 'info',
  isVibrate = Boolean(true)
) => {
  showOverlay(
    'overlay.inAppNotification',
    {
      title,
      content,
      type,
      isVibrate,
      onDisplay: id => {
        componentId = id;
      }
    },
    true,
    {
      layout: {
        backgroundColor: Colors.transparent,
        componentBackgroundColor: Colors.transparent
      }
    }
  );
};
