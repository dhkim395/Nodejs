import { deleteUser, getUsers, updateUserEmail } from "./userRepository.mjs";
import { db } from "./db.mjs";
import { createUser } from "./userRepository.mjs";
async function main() {
  //   select
  //   const users = await getUsers();
  //   console.log("사용자 목록:", users);

  //   insert
  /* const newUserId = await createUser(
    "dong",
    "1011",
    "동현",
    "010-8488-7794",
    "dong@naver.com",
    "남자",
    "000000",
    "0000000",
    "12345",
    "서울 강동구 명일동",
    "11-11",
    "10층"
  );
  console.log("새 사용자 ID: ", newUserId);


  //   update
  const updateCount = await updateUserEmail(1, "apple@naver.com");
  console.log("수정된 사용자 수:", updateCount);
  await db.end(); // 풀 종료하기(보통 사용하지 않음)
  */
  //  delete
  const deletedCount = await deleteUser(7);
  console.log("삭제된 사용자 수:", deletedCount);
  await db.end(); // 풀 종료하기(보통 사용하지 않음)
}
main();
