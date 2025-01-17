import { dispatch } from "../../store";
import {
  setCurrencyList,
  setUserIp,
  setLoading,
  setCountryDetails,
  setDefaultCurrency,
  setCurrencyData,
  setCurrencyRates,
  setNews,
  setNavLoading,
} from "./servicesReducer";
import axios from "axios";
import RateService from "../Utils/Axios/apis";
import { countries } from "../../../utils/data";

export const GetUserIp = () => async () => {
  try {
    const res = await axios.get("https://api.ipify.org");
    sessionStorage.setItem("ip", res.data);
    dispatch(GetDefaultCurrency(res.data));
    dispatch(setUserIp(res.data));
  } catch (err) {
    dispatch(setNavLoading(false));
    console.log(err);
  }
};
export const GetDefaultCurrency = (ip) => async () => {
  try {
    const res = await RateService.GetCurrencyByIP(ip);
    const country = res.data.data.currency.country;
    const defaultCurrency = countries.find((x) => x.label === country);
    sessionStorage.setItem("localCurrency", JSON.stringify(defaultCurrency));
    dispatch(setDefaultCurrency(defaultCurrency));
    dispatch(setNavLoading(false));
  } catch (err) {
    dispatch(setNavLoading(false));
    console.log(err);
  }
};
export const GetCurrencies = () => async () => {
  try {
    const res = await RateService.GetCurrencies();
    let currencies = res.data.currencies;
    const countryDetails = currencies.map((ele) => {
      let country = countries.find((x) => x.label === ele.country);
      return country;
    });
    dispatch(setCurrencyList(currencies));
    dispatch(setCountryDetails(countryDetails));
    dispatch(setLoading(false));
  } catch (err) {
    dispatch(setLoading(false));
    console.log(err);
  }
};
export const GetCurrencyData = (isocode) => async () => {
  try {
    const res = await RateService.GetCurrencyData(isocode);
    dispatch(setCurrencyData(res.data.data));
    dispatch(setLoading(false));
  } catch (err) {
    dispatch(setLoading(false));
    console.log(err);
  }
};
export const GetCurrencyRates = (currencies) => async () => {
  try {
    let currencyRates = currencies.map(async (ele) => {
      const res = await RateService.GetCurrencyData(ele.isocode);
      return res.data.data;
    });
    Promise.all(currencyRates).then((values) =>
      dispatch(setCurrencyRates(values))
    );

    dispatch(setLoading(false));
  } catch (err) {
    console.log(err);
    dispatch(setLoading(false));
  }
};

export const GetNews = (ip) => async () => {
  try {
    const res = await axios.get(
      `https://my-second-app-dot-wise-philosophy-348109.oa.r.appspot.com/api/news/${ip}`
    );
    dispatch(setNews(res.data.results));

    dispatch(setLoading(false));
  } catch (err) {
    console.log(err);
    dispatch(setLoading(false));
  }
};
