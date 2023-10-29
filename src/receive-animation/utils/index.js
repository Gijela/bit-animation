export const pxBase375ToPxBaseViewPort = (val) => {
  const clientWidth = window.innerWidth || screen.availWidth
  return val * clientWidth / 375
}