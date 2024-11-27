from dataclasses import dataclass
from pydantic import BaseModel
import string
import random

def generate_random_token():
    return "".join(random.choices(string.digits + string.ascii_letters + "_-", k=32))

@dataclass
class User:
    user_id: int
    login: str
    password: str

class LoginBody(BaseModel):
    login: str
    password: str

class Auth:
    def __init__(self):
        self.students = [
            User(user_id=2211234, login="admin", password="admin"),
            User(user_id=2211235, login="user", password="user"),
            User(user_id=2211236, login="test", password="test"),
        ]
        self.spsos = []
        self.student_tokens: dict[str, int] = {}
        self.spso_tokens: dict[str, int] = {}

    def login(self, login: str, password: str) -> tuple[User | None, str | None]:
        for user in self.students:
            if user.login == login and user.password == password:
                token = generate_random_token()
                self.student_tokens[token] = user.user_id
                return user, token
        for user in self.spsos:
            if user.login == login and user.password == password:
                token = generate_random_token()
                self.spso_tokens[token] = user.user_id
                return user, token
        return None, None

    def is_authorised(self, token: str) -> int | None:
        return self.student_tokens.get(token, None) or self.spso_tokens.get(token, None)

    def role(self, user_id: int) -> str | None:
        if user_id in self.student_tokens.values():
            return "student"
        if user_id in self.spso_tokens.values():
            return "spso"
        return None
