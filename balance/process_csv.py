import pandas as pd

data = pd.read_csv('StarlingStatement_2023-02-18_2024-02-18.csv', encoding='ISO-8859-1')

reduced_df = data[['Date','Balance (GBP)']].rename(columns = {
    'Date':'date',
    'Balance (GBP)':'balance'
})



reduced_df['date'] = pd.to_datetime(reduced_df['date'])

last_balance_per_day = reduced_df.groupby(['date']).last().reset_index()
last_balance_per_day.to_csv('bank_balance.csv', index= False)