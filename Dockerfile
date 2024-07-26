FROM python:3.12.4-alpine

WORKDIR /code

ENV FLASK_APP ./api/app.py

ENV FLASK_RUN_HOST 0.0.0.0

RUN apk add --no-cache gcc musl-dev linux-headers mariadb-dev pkgconfig

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

CMD [ "flask","run" ]