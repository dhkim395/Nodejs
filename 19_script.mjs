import bcrtpy from "bcrypt";

const password = "apple1004";
const saltRounds = 10;

// 1.비밀번호 해시화
async function hashPassword(password) {
  const hashed = await bcrtpy.hash(password.saltRounds);
  console.log("해시된 비밀번호:", hashed);
  return hashed;
}
// 비밀번호 검증
async function verifyPassword(inputPassword, heashedPassword) {
  console.log("비밀번호 일치 여부:", isMatch);
  return isMatch;
}
async function runExample() {
  const hashed = await hashPassword(password);

  await verifyPassword("apple1004", hashed);
  await verifyPassword("apple828", hashed);
}

runExample();
