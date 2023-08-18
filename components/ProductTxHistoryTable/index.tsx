"use client";
import { TableContainer, Table, Td, Tbody, Tr } from "@chakra-ui/react";
import { FC } from "react";

import { Transaction } from "@/types";

interface Props {
  productId: number;
}

const ProductTxHistoryTable: FC<Props> = ({ productId }) => {
  const transactionArray: Transaction[] = [
    {
      transaction: "⇔Transfer",
      amount: 200,
      from: "from",
      to: "to",
      date: "date",
    }
  ];

  const TableContents: FC<{ transactions: Transaction[] }> = ({ transactions }) => {
    return (
      <>
        {transactions.map((transaction, index) => (
          <Tr key={index}>
            <Td>{transaction.transaction}</Td>
            <Td>{transaction.amount}henkaku</Td>
            <Td>{transaction.from}</Td>
            <Td>{transaction.to}</Td>
            <Td>{transaction.date}</Td>
          </Tr>
        ))}
      </>
    );
  }

  return (
    <TableContainer>
      <Table variant='unstyled'>
        <Tbody>
          <TableContents transactions={transactionArray} />
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ProductTxHistoryTable;