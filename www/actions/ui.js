export const MENU_OPEN = 'MENU_OPEN';
export const MENU_CLOSE = 'MENU_CLOSE';

export const menuShow = (isVisible) => ({
  type: isVisible ? MENU_OPEN : MENU_CLOSE,
});