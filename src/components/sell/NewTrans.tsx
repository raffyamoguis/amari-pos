import React, { useState, useEffect } from "react";
import { shallow } from "zustand/shallow";
import { useQuery, useQueryClient } from "react-query";
import {
  Text,
  TextInput,
  NumberInput,
  Table,
  ActionIcon,
  Group,
  Divider,
  Button,
  Paper,
  ScrollArea,
  Tooltip,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconSearch, IconTrash, IconTrashX, IconX } from "@tabler/icons-react";
import { TransactionTypes } from "../../types";
import { amountShorthand } from "../../lib/transactions/data";
import "./searchStyle.css";
import BadgeStock from "../BadgeStock";

import { searchMedicine } from "../../api/medicine";
import {
  createPayment,
  createTransactions,
  updateStocks,
} from "../../api/stocks";
import { MedicineType } from "../../types";
import { useTransactionStore } from "../../store/useTransactionStore";

const NewTrans: React.FC = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState<string>("");
  const [, setQuantity] = useState<number | "">(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [
    totalAmount,
    safeToProceed,
    setSafe,
    amount,
    setAmount,
    change,
    setChange,
    trans,
    updateTotal,
    addTrans,
    deleteTrans,
    updateQuantity,
    reset,
  ] = useTransactionStore(
    (state) => [
      state.totalAmount,
      state.safeToProceed,
      state.setSafe,
      state.amount,
      state.setAmount,
      state.change,
      state.setChange,
      state.trans,
      state.updateTotal,
      state.addTrans,
      state.deleteTrans,
      state.updateQuantity,
      state.reset,
    ],
    shallow
  );

  const { data: searchResult } = useQuery<MedicineType[], Error>(
    ["search", search],
    () => searchMedicine(search)
  );

  useEffect(() => {
    // Calculate and update the total value
    const totalValue = trans.reduce(
      (total, transaction) => total + transaction.total,
      0
    );
    const tempChange = amount - totalValue;
    setSafe(tempChange < 0);
    updateTotal(totalValue);

    if (trans.length === 0) {
      setSafe(true);
      setChange(0);
      setAmount(0);
    }
  }, [trans]);

  function handleAmountChange(amount: number | "") {
    if (amount !== "" && totalAmount !== 0) {
      setAmount(amount);
      const checkChange = amount - totalAmount;
      if (checkChange >= 0) {
        setChange(checkChange);
        setSafe(false);
      } else {
        setSafe(true);
        setChange(0);
        notifications.show({
          message: "Amount should be greater than total.",
          color: "red",
        });
      }
    }
  }

  async function handleProceed() {
    setLoading(true);
    const date = new Date();
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currdate =
      date.getFullYear() +
      "-" +
      month[date.getMonth()] +
      "-" +
      date.getDate() +
      " " +
      date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });

    const isUpdateStockSuccessful = await updateStocks(trans);

    if (isUpdateStockSuccessful) {
      const isCreatePaymentSuccessful = await createPayment({
        overalltotal: totalAmount,
        amount: amount,
        change: change,
        currdate: currdate,
      });

      if (isCreatePaymentSuccessful) {
        // Invalidate and refetch the 'data' query
        await queryClient.invalidateQueries("payments");

        const isCreateTransactionSuccessful = await createTransactions(
          trans,
          currdate
        );

        if (isCreateTransactionSuccessful) {
          setLoading(false);
          notifications.show({
            message: "Transaction created successfully.",
            color: "green",
          });
          reset();
        }
      }
    }
  }

  return (
    <>
      <Text mb={10}>New Transactions</Text>

      <div className="search-container">
        <TextInput
          mb={4}
          w={300}
          placeholder="Enter product name"
          icon={<IconSearch size="0.8rem" />}
          rightSection={
            search !== "" && (
              <IconX size="0.8rem" onClick={() => setSearch("")} />
            )
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <Paper
            shadow="xs"
            className="search-results"
            sx={(theme) => ({
              padding: theme.spacing.sm,
            })}
          >
            <ScrollArea h={250}>
              {searchResult?.length !== 0 ? (
                searchResult?.map((product: any) => (
                  <Group
                    key={product.id}
                    position="apart"
                    px="lg"
                    py="xs"
                    align="center"
                    sx={(theme) => ({
                      "&:hover": {
                        backgroundColor:
                          theme.colorScheme === "dark"
                            ? theme.colors.gray[8]
                            : theme.colors.gray[0],
                        cursor:
                          product.quantity > 0 ? "pointer" : "not-allowed",
                      },
                    })}
                    onClick={() => addTrans(product)}
                  >
                    <Text fz="sm">{product.stockfor}</Text>
                    <BadgeStock value={product.quantity} />
                  </Group>
                ))
              ) : (
                <Text color="gray" size="sm">
                  No results found.
                </Text>
              )}
            </ScrollArea>
          </Paper>
        )}
      </div>
      {trans.length !== 0 && (
        <>
          <Table fontSize="xs">
            <thead>
              <tr>
                <th>Product</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {trans.map((transaction: TransactionTypes) => (
                <tr key={transaction.id}>
                  <td>{transaction.product}</td>
                  <td>{transaction.stock}</td>
                  <td>{transaction.price}</td>
                  <td>
                    <NumberInput
                      sx={{ width: "70px" }}
                      value={transaction.quantity}
                      onChange={(newValue) => {
                        setQuantity(newValue); // Update quantity state
                        updateQuantity(
                          transaction.id,
                          newValue,
                          transaction.stock
                        );
                      }}
                      max={transaction.stock}
                      min={1}
                    />
                  </td>
                  <td>{transaction.total}</td>
                  <td>
                    <ActionIcon
                      color="red"
                      size="sm"
                      onClick={() => deleteTrans(transaction.id)}
                    >
                      <IconTrash size="0.875rem" />
                    </ActionIcon>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={5}></td>
                <td>
                  <Tooltip label="Remove all queued items">
                    <ActionIcon color="red" size="sm" onClick={reset}>
                      <IconTrashX size="0.875rem" />
                    </ActionIcon>
                  </Tooltip>
                </td>
              </tr>
            </tbody>
          </Table>
          <Divider />
        </>
      )}

      <Group mt={20} position="right" align="end">
        <NumberInput
          label="Total"
          value={totalAmount}
          maw={70}
          hideControls
          disabled
        />
        <NumberInput
          label="Change"
          value={change}
          maw={70}
          hideControls
          disabled
        />
        <NumberInput
          label="Amount"
          value={amount}
          onChange={(value) => handleAmountChange(value)}
          maw={80}
          min={0}
        />
        <Button
          onClick={handleProceed}
          disabled={safeToProceed}
          loading={loading}
        >
          Proceed
        </Button>
      </Group>
      <Group mt={15} position="right" align="center" spacing="xs">
        {amountShorthand.map((amount, key) => (
          <Button
            key={key}
            variant="light"
            color="gray"
            size="xs"
            onClick={() => handleAmountChange(amount)}
          >
            {amount}
          </Button>
        ))}
      </Group>
    </>
  );
};

export default NewTrans;
