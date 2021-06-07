import gspread

gc = gspread.service_account()
sh = gc.open("user-info")

worksheet = sh.get_worksheet(0)
list_of_dicts = worksheet.get_all_records()


def get_user_data():
    return list_of_dicts
