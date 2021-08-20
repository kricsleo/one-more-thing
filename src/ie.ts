/** ie/edge/other browser */
export enum ENUM_IE_VERSION {
  ie6 = 6,
  ie7 = 7,
  ie8 = 8,
  ie9 = 9,
  ie10 = 10,
  ie11 = 11,
  /** edge */
  edge = 12,
  /** other browser */
  not = 999
}

/**
 * check ie version
 * @param {userAgent} user agent string, will detect current environment when missing this param
 * @returns {ENUM_IE_VERSION}
 */
export function checkIEVersion(userAgent?: string): ENUM_IE_VERSION {
  const ua = userAgent || (typeof navigator === 'undefined' ? '' : navigator.userAgent);
  if (!ua) {
    return ENUM_IE_VERSION.not;
  }
  // ie < 11
  const isIE = ua.indexOf('compatible') > -1 && ua.indexOf('MSIE') > -1;
  // ie 11
  const isIE11 = ua.indexOf('Trident') > -1 && ua.indexOf('rv:11.0') > -1;
  // edge
  const isEdge = ua.indexOf('Edge') > -1 && !isIE;
  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(ua);
    const fIEVersion = parseInt(RegExp.$1, 10);
    return fIEVersion > ENUM_IE_VERSION.ie6 ? fIEVersion : ENUM_IE_VERSION.ie6;
  }
  return isIE11 ? ENUM_IE_VERSION.ie11 : isEdge ? ENUM_IE_VERSION.edge : ENUM_IE_VERSION.not;
}
