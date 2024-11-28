from time import sleep
import requests
from models import Document, PrintJob, PageSize

URL = "http://localhost:8000/"

def student_login() -> str:
    resp = requests.post(URL + "login", json={"login": "temp", "password": "temp"})
    assert resp.status_code == 200
    return resp.json()["token"]

def spso_login() -> str:
    resp = requests.post(URL + "login", json={"login": "admin", "password": "admin"})
    assert resp.status_code == 200
    return resp.json()["token"]


def printer_test():
    token = spso_login()

    resp = requests.get(URL + "printer", headers={"Authorization": token})
    assert resp.status_code == 200 and len(resp.json()) == 4

    resp = requests.post(URL + "printer/add", json={"brand": "HP", "model": "LaserJet", "description": "A printer", "status": 1}, headers={"Authorization": token})
    assert resp.status_code == 200 and "id" in resp.json()

    resp = requests.get(URL + "printer", headers={"Authorization": token})
    assert resp.status_code == 200 and len(resp.json()) == 5

    resp = requests.post(URL + "printer/update", json={"id": 5, "brand": "HP", "model": "LaserJet", "description": "A printer", "status": 0}, headers={"Authorization": token})
    assert resp.status_code == 200 and "id" in resp.json()

    resp = requests.delete(URL + "printer/delete/5", headers={"Authorization": token})
    assert resp.status_code == 200 and "id" in resp.json()

    resp = requests.get(URL + "printer", headers={"Authorization": token})
    assert resp.status_code == 200 and len(resp.json()) == 4

def document_test():
    token = student_login()

    with open("test.pdf", "rb") as f:
        resp = requests.post(URL + "upload", files={"file": f}, headers={"Authorization": token})
        assert resp.status_code == 200
        document = Document(**resp.json())
        
    print_job = PrintJob(document=document, copies=1, page_size=PageSize.A4, double_sided=False)
    resp = requests.post(URL + "printer/print", json=print_job.model_dump(), headers={"Authorization": token})
    assert resp.status_code == 200 and "printer_id" in resp.json() and "print_job_id" in resp.json()
    print(resp.json())


printer_test()
document_test()
print("All tests passed!")
