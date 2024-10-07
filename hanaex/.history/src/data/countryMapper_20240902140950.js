export const imageMapper = [
  {
    name: "USD",
    image: "/image/usd_flag.png"
  },
  {
    name: "JPY",
    image: "/image/jpy_flag.png",
  },
  {
    name: "EU",
    image: "/image/eu_flag.png",
  }
];

export const countryMapperFunction = (state) => {
  if(state === "USD") {
    return imageMapper[0];
  } else if (state === "JPY") {
    return imageMapper[1];
  } else if (state === "EU") {
    return imageMapper[2];
  }
}