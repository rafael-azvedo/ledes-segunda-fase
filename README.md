## Requisitos

Python instalado.

## Instalação

### Linux

Crie um ambiente virtual do python.
```bash
python3 -m venv .venv
```
Ative o ambiente virtual.
```bash
source .venv/bin/activate.
```
Instale as dependências .
```bash
pip install -r requirements.txt   
```
Realize as migrations.
```bash
python3 manage.py migrate
```
Por fim, rode a aplicação.
```bash
python3 manage.py runserver
```