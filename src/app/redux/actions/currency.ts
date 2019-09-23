import { Action } from '@ngrx/store'
import { Currency } from '../../models/currency'

export const CURRENCIESUPDATE = '[Currency] UpdateAll'
export const CURRENCIESUPDATED = '[Currency] UpdatedAll'

export class CurrenciesUpdateAction implements Action {
  type = CURRENCIESUPDATE
}

export class CurrenciesUpdatedAction implements Action {
  type = CURRENCIESUPDATED

  constructor(public payload: Currency[]) {}
}
