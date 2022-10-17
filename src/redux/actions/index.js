import currency from '../reducers/api';

export const ACT_EMAIL = 'ACT_EMAIL';
export const ACT_CURRENCIES = 'ACT_CURRENCIES';
export const ACT_EXPENSE = 'ACT_EXPENSE';
export const EX_DELETE = 'EX_DELETE';

export const actEmail = (payload) => ({ type: ACT_EMAIL, payload });
export const actCurrencies = (payload) => ({ type: ACT_CURRENCIES, payload });
export const actExpense = (payload) => ({ type: ACT_EXPENSE, payload });
export const exDelete = (deletar) => ({ type: EX_DELETE, payload: deletar });

export function fetchApi() {
  return async (dispatch) => {
    const currencys = await currency();
    //  const URL = await fetch('https://economia.awesomeapi.com.br/json/all');
    // const retorno = await URL.json();
    const resultado = Object.keys(currencys).filter((e) => e !== 'USDT');
    return dispatch(actCurrencies(resultado));
  };
}

export const fetchExpense = (state) => async (dispatch) => {
  const data = await fetch('https://economia.awesomeapi.com.br/json/all');
  const retorno = await data.json();
  delete retorno.USDT;
  dispatch(actExpense({ ...state, exchangeRates: retorno }));
};

// 1° - vamos criar uma action( com minha payload ); // vamos carregar meu caminhãozinho com um objeto

// 2° - chamo no component(dispatch (minha função(state que quero levar para reducer)); // vou carregar meu caminhãozinho (dispech) com o que eu preciso levar para reducer

// 3° - No reducer eu recebo o state do componnete // o caminhão tras as informações para eu atualizar na no reducer
