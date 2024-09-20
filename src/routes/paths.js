// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  signUp: path(ROOTS_AUTH, "/signup"),
};

export const PATH_SITE = {
  home: "/home",
  products: "/products",
  productDetails: "/product-details",
  contact: "/contact-us",
  about: "/about-us",
  cart: "/cart",
  customDesign: "/custom-design",
};
