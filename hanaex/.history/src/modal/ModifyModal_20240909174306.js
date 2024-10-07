// // import React, { useState } from "react";
// // import {
// //   Text,
// //   ModalContent,
// //   ModalFooter,
// //   ModalCloseButton,
// //   Button,
// //   Input,
// // } from "@chakra-ui/react";

// // const ModifyModal = ({ onClose, transaction, onUpdate }) => {
// //   const [updatedValue, setUpdatedValue] = useState(transaction.withdrawal_amount);
// //   const [updatedExchangeValue, setUpdatedExchangeValue] = useState(transaction.deposit_amount);

// //   const handleUpdate = () => {
// //     onUpdate(updatedValue, updatedExchangeValue);
// //   };

// //   return (
// //     <ModalContent className="px-6">
// //       <Text className="py-4 font-semibold text-lg">거래 내역 수정</Text>
// //       <Input
// //         value={updatedValue}
// //         onChange={(e) => setUpdatedValue(e.target.value)}
// //         placeholder="거래 금액 수정"
// //       />
// //       <Input
// //         value={updatedExchangeValue}
// //         onChange={(e) => setUpdatedExchangeValue(e.target.value)}
// //         placeholder="환율 수정"
// //         mt={4}
// //       />
// //       <ModalCloseButton />
// //       <ModalFooter>
// //         <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
// //           수정
// //         </Button>
// //         <Button onClick={onClose}>취소</Button>
// //       </ModalFooter>
// //     </ModalContent>
// //   );
// // };

// // export default ModifyModal;

// import React, { useState } from "react";
// import {
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   Input,
//   Text,
// } from "@chakra-ui/react";

// const ModifyModal = ({ transaction, onClose, onUpdate }) => {
//   // 수정할 값을 state로 관리
//   const [withdrawalAmount, setWithdrawalAmount] = useState(
//     transaction.withdrawal_amount
//   );
//   const [depositAmount, setDepositAmount] = useState(
//     transaction.deposit_amount
//   );

//   // 값이 변경될 때 호출되는 핸들러
//   const handleWithdrawalChange = (e) => {
//     setWithdrawalAmount(e.target.value);
//   };

//   const handleDepositChange = (e) => {
//     setDepositAmount(e.target.value);
//   };

//   // 수정된 값을 서버로 전송하는 함수
//   const handleUpdateClick = () => {
//     // 수정된 값을 부모 컴포넌트에 전달
//     onUpdate(withdrawalAmount, depositAmount);
//   };

//   return (
//     <ModalContent>
//       <ModalHeader>거래 수정</ModalHeader>
//       <ModalBody>
//         <div className="flex flex-col gap-4">
//           <Text>출금 금액</Text>
//           <Input
//             type="number"
//             value={withdrawalAmount}
//             onChange={handleWithdrawalChange}
//           />
//           <Text>입금 금액</Text>
//           <Input
//             type="number"
//             value={depositAmount}
//             onChange={handleDepositChange}
//           />
//         </div>
//       </ModalBody>
//       <ModalFooter>
//         <Button colorScheme="blue" onClick={handleUpdateClick}>
//           수정
//         </Button>
//         <Button variant="ghost" onClick={onClose}>
//           닫기
//         </Button>
//       </ModalFooter>
//     </ModalContent>
//   );
// };

// export default ModifyModal;
// import React, { useState } from "react";
// import {
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   Input,
//   Text,
// } from "@chakra-ui/react";

// const ModifyModal = ({ transaction, onClose, onUpdate }) => {
//   const [withdrawalAmount, setWithdrawalAmount] = useState(
//     transaction.withdrawal_amount
//   );
//   const [depositAmount, setDepositAmount] = useState(
//     transaction.deposit_amount
//   );

//   const handleWithdrawalChange = (e) => {
//     setWithdrawalAmount(e.target.value);
//   };

//   const handleDepositChange = (e) => {
//     setDepositAmount(e.target.value);
//   };

//   const handleUpdateClick = () => {
//     onUpdate(withdrawalAmount, depositAmount);
//   };

//   return (
//     <ModalContent>
//       <ModalHeader>거래 수정</ModalHeader>
//       <ModalBody>
//         <div className="flex flex-col gap-4">
//           <Text>출금 금액</Text>
//           <Input
//             type="number"
//             value={withdrawalAmount}
//             onChange={handleWithdrawalChange}
//           />
//           <Text>입금 금액</Text>
//           <Input
//             type="number"
//             value={depositAmount}
//             onChange={handleDepositChange}
//           />
//         </div>
//       </ModalBody>
//       <ModalFooter>
//         <Button colorScheme="blue" onClick={handleUpdateClick}>
//           수정
//         </Button>
//         <Button variant="ghost" onClick={onClose}>
//           닫기
//         </Button>
//       </ModalFooter>
//     </ModalContent>
//   );
// };

// export default ModifyModal;

import React, { useState } from "react";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";

const ModifyModal = ({ transaction, onClose, onUpdate }) => {
  const [withdrawalAmount, setWithdrawalAmount] = useState(
    transaction.withdrawal_amount  // 초기값을 숫자로 가져옴
  );
  const [depositAmount, setDepositAmount] = useState(
    transaction.deposit_amount  // 초기값을 숫자로 가져옴
  );

  // 출금 금액 변경 핸들러
  const handleWithdrawalChange = (e) => {
    setWithdrawalAmount(parseFloat(e.target.value));  // 숫자로 변환하여 상태에 저장
  };

  // 입금 금액 변경 핸들러
  const handleDepositChange = (e) => {
    setDepositAmount(parseFloat(e.target.value));  // 숫자로 변환하여 상태에 저장
  };

  // 수정 버튼 클릭 시 호출되는 함수
  const handleUpdateClick = () => {
    if (!isNaN(withdrawalAmount) && !isNaN(depositAmount)) {
      onUpdate(withdrawalAmount, depositAmount);  // 부모 컴포넌트로 수정된 값 전달
    } else {
      alert("입력값이 유효하지 않습니다.");
    }
  };

  return (
    <ModalContent>
      <ModalHeader>거래 수정</ModalHeader>
      <ModalBody>
        <div className="flex flex-col gap-4">
          <Text>출금 금액</Text>
          <Input
            type="number"
            value={withdrawalAmount}
            onChange={handleWithdrawalChange}  // 출금 금액 변경 핸들러
          />
          <Text>입금 금액</Text>
          <Input
            type="number"
            value={depositAmount}
            onChange={handleDepositChange}  // 입금 금액 변경 핸들러
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" onClick={handleUpdateClick}>
          수정
        </Button>
        <Button variant="ghost" onClick={onClose}>
          닫기
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default ModifyModal;
