# Denna kod säger till docker-compose hur app.py ska byggas

FROM python:3.8
WORKDIR /root
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt
COPY . .
COPY resources/ .config/gspread/
CMD ["python", "app_data.py"]
