FROM mongo:4.4.5

# Kopierar över mock data filerna från "mock_data"-mappen in i containern som kör MongoDB
COPY ./mongod.conf.orig /etc/
WORKDIR /usr/src/db/
COPY ./mock_data /usr/src/db/