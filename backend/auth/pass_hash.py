from pwdlib import PasswordHash

pass_hash = PasswordHash.recommended()

def hash_pass(password: str):
    return pass_hash.hash(password)

def verify_pass(password: str, hashed_password: str):
    return pass_hash.verify(password, hashed_password)

