import DailyIframe from '@daily-co/daily-js';

export function createDailyCallFrame(container, url) {
  const callFrame = DailyIframe.createFrame(container, {
    showLeaveButton: true,
  });

  callFrame.join({ url });

  return callFrame;
}
