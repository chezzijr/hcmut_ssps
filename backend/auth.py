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
            User(user_id=2211234, login="temp", password="temp"),
            User(user_id=2211235, login="user", password="user"),
            User(user_id=2211236, login="test", password="test"),
        ]
        self.spsos = [
            User(user_id=1, login="admin", password="admin"),
        ]
        self.student_tokens: dict[str, int] = {}
        self.spso_tokens: dict[str, int] = {}

    def _get_user_by_credentials(self, login: str, password: str) -> User | None:
        for user in self.students + self.spsos:
            if user.login == login and user.password == password:
                return user
        return None

    def login(self, login: str, password: str) -> tuple[User | None, str | None]:
        user = self._get_user_by_credentials(login, password)
        if user is None:
            return None, None
        if self.role(user.user_id) == "student":
            token = generate_random_token()
            self.student_tokens = {token: user_id for token, user_id in self.student_tokens.items() if user_id != user.user_id}
            self.student_tokens[token] = user.user_id
            return user, token
        else:
            token = generate_random_token()
            self.spso_tokens = {token: user_id for token, user_id in self.spso_tokens.items() if user_id != user.user_id}
            self.spso_tokens[token] = user.user_id
            return user, token

    def is_authorised(self, token: str) -> int | None:
        return self.student_tokens.get(token, None) or self.spso_tokens.get(token, None)

    def role(self, user_id: int) -> str | None:
        for user in self.students:
            if user_id == user.user_id:
                return "student"
        for user in self.spsos:
            if user_id == user.user_id:
                return "spso"
        return None
