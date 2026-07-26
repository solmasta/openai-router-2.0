FROM python:3.12-slim

WORKDIR /app

COPY . .

RUN pip install --upgrade pip

CMD ["python","-m","agents.api.main"]
