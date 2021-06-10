FROM python:3.8
WORKDIR /root
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt
COPY . .
COPY resources/ .config/gspread/
#CMD ["python3", "app.py"]
#CMD ["pytest", "-v"]
CMD ["sleep", "3600"]
