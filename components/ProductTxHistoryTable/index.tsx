"use client";
import { TableContainer, Table, Td, Tbody, Tr } from "@chakra-ui/react";
import React, { FC } from "react";

import { Transaction } from "@/types";

interface Props {
  productId: number;
}

const ProductTxHistoryTable: FC<Props> = ({ productId }) => {
  const transactionArray: Transaction[] = [
    {
      transaction: "⇔ Transfer",
      amount: 200,
      from: "from",
      to: "to",
      date: "date",
    }
  ];

  const TableContents: FC<{ transactions: Transaction[] }> = ({ transactions }) => {

    const TdCustom = ({ children }: { children: React.ReactNode }) => {
      return (
        <Td pl="0">
          {children}
        </Td>
      );
    };

    return (
      <>
        {transactions.map((transaction, index) => (
          <Tr key={index}>
            <TdCustom>{transaction.transaction}</TdCustom>
            <TdCustom>{transaction.amount}henkaku</TdCustom>
            <TdCustom>{transaction.from}</TdCustom>
            <TdCustom>{transaction.to}</TdCustom>
            <TdCustom>{transaction.date}</TdCustom>
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