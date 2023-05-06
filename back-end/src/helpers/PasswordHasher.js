// Password Hasher
function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}
