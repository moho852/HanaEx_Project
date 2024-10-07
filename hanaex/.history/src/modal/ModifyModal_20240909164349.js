// import React, { useState } from 'react';
// import {
//   Text,
//   ModalContent,
//   ModalFooter,
//   ModalCloseButton,
//   Button,
//   Input
// } from "@chakra-ui/react";

// const ModifyModal = ({ onClose, transaction, onUpdate }) => {
//   const [updatedValue, setUpdatedValue] = useState(transaction.value);
//   const [updatedExchangeValue, setUpdatedExchangeValue] = useState(transaction.exchangeValue);

//   const handleUpdate = () => {
//     onUpdate(updatedValue, updatedExchangeValue);
//   };
//   return (
//     <ModalContent className="px-6">
//       <Text className="py-4 font-semibold text-lg">거래 내역 수정</Text>
//       <Input
//         value={updatedValue}
//         onChange={(e) => setUpdatedValue(e.target.value)}
//         placeholder="거래 금액 수정"
//       />
//       <Input
//         value={updatedExchangeValue}
//         onChange={(e) => setUpdatedExchangeValue(e.target.value)}
//         placeholder="환율 수정"
//         mt={4}
//       />
//       <ModalCloseButton />
//       <ModalFooter>
//         <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
//           수정
//         </Button>
//         <Button onClick={onClose}>취소</Button>
//       </ModalFooter>
//     </ModalContent>
//   );
// }

// export default ModifyModal
import React, { useState } from "react";
import {
  Text,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";

const ModifyModal = ({ onClose, transaction, onUpdate }) => {
  const [updatedValue, setUpdatedValue] = useState(transaction.withdrawal_amount);
  const [updatedExchangeValue, setUpdatedExchangeValue] = useState(transaction.deposit_amount);

  const handleUpdate = () => {
    onUpdate(updatedValue, updatedExchangeValue);
  };

  return (
    <ModalContent className="px-6">
      <Text className="py-4 font-semibold text-lg">거래 내역 수정</Text>
      <Input
        value={updatedValue}
        onChange={(e) => setUpdatedValue(e.target.value)}
        placeholder="거래 금액 수정"
      />
      <Input
        value={updatedExchangeValue}
        onChange={(e) => setUpdatedExchangeValue(e.target.value)}
        placeholder="환율 수정"
        mt={4}
      />
      <ModalCloseButton />
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
          수정
        </Button>
        <Button onClick={onClose}>취소</Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default ModifyModal;
