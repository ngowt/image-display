export const getScrollTop = () => {
  return !!window.pageYOffset
    ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
};

export const getDocumentHeight = () => {
  const { body, documentElement: html } = document;
  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
};

export const getDocumentWidth = () => {
  const { body, documentElement: html } = document;
  return Math.max(
    body.clientWidth,
    body.offsetWidth,
    body.scrollWidth,
    html.clientWidth,
    html.offsetWidth,
    html.scrollWidth
  );
}