export const scrollControl = (value: boolean) => {
  if (value) {
    document.documentElement.style.overflow = 'hidden';
  } else {
    document.documentElement.style.overflow = 'auto';
  }
};
