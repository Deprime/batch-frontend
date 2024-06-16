const telegramService = {
  /**
   * Pre-config telegram app
   */
  preconfig: async (telegram: Telegram) => {
    telegram.WebApp.ready();
    telegram.WebApp.expand();
    const bgColor = '#000000';
    try {
      telegram.WebApp.setHeaderColor(bgColor);
      telegram.WebApp.setBackgroundColor(bgColor);
      telegram.WebApp.enableClosingConfirmation();
    } catch (_err) {
      console.log('Methods "setHeaderColor", "setBackgroundColor" are not available');
    }
  },
};

export default telegramService;
