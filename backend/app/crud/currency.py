from typing import Optional, List

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.currency import Currency
# from app.schemas.currency import Currency as currency_schema
from app.schemas.currency import CurrencyCreate, CurrencyUpdate


class CRUDCurrency(CRUDBase[Currency, CurrencyCreate, CurrencyUpdate]):
    # Declare model specific CRUD operation methods.
    pass


currency = CRUDCurrency(Currency)
